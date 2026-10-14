import { EventEmitter } from "node:events";
import type { IncomingMessage, ServerResponse } from "node:http";
import { createEvent } from "h3";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  formatFleetEvent,
  publishDeviceUpdated,
  subscribeToFleetEvents,
} from "../server/utils/fleet-events";
import fleetEventsHandler from "../server/api/events/fleet.get";

const device = {
  unitId: "MK-1A",
  platform: "MK",
  status: "ONLINE",
  zone: "ALPHA",
  linkStatus: "STABLE",
  role: "SCOUT",
  powerPct: 82,
  signalQuality: 92,
  lastPingAt: "2026-10-10T12:00:00.000Z",
} as const;

function makeResponse() {
  const response = new EventEmitter() as EventEmitter & {
    headersSent: boolean;
    writableEnded: boolean;
    flushHeaders: ReturnType<typeof vi.fn>;
    write: ReturnType<typeof vi.fn>;
  };
  response.headersSent = false;
  response.writableEnded = false;
  response.flushHeaders = vi.fn(() => {
    response.headersSent = true;
  });
  response.write = vi.fn(() => true);
  return response;
}

function startStream(response = makeResponse()) {
  const headers: Record<string, string> = {};
  const event = createEvent(
    {
      url: "/api/events/fleet",
      method: "GET",
      headers: {},
    } as IncomingMessage,
    response as unknown as ServerResponse,
  );
  // Capture H3 response headers without coupling this test to Node's header state.
  event.node.res.setHeader = ((name: string, value: string | number | readonly string[]) => {
    headers[name.toLowerCase()] = String(value);
    return event.node.res;
  }) as ServerResponse["setHeader"];
  const completed = fleetEventsHandler(event);
  return { response, headers, completed };
}

afterEach(() => vi.useRealTimers());

describe("fleet SSE events", () => {
  it("formats an event with standard SSE fields and an explicit schema", () => {
    const event = publishDeviceUpdated({ ...device });
    expect(formatFleetEvent(event)).toBe(
      `id: ${event.id}\nevent: device.updated\ndata: ${JSON.stringify(event)}\n\n`,
    );
    expect(event).toMatchObject({
      type: "device.updated",
      timestamp: expect.any(String),
      payload: { unitId: "MK-1A" },
    });
  });

  it("opens a streaming response with the expected headers and delivers published events", async () => {
    const { response, headers } = startStream();
    expect(headers).toMatchObject({
      "content-type": "text/event-stream; charset=utf-8",
      "cache-control": "no-cache, no-transform",
      connection: "keep-alive",
      "x-accel-buffering": "no",
    });
    expect(response.write).toHaveBeenCalledWith(": connected\n\n");

    const event = publishDeviceUpdated({ ...device });
    expect(response.write).toHaveBeenLastCalledWith(formatFleetEvent(event));
    response.emit("close");
  });

  it("cleans up its subscription after the client disconnects", async () => {
    const { response, completed } = startStream();
    response.emit("close");
    await completed;
    response.write.mockClear();
    publishDeviceUpdated({ ...device });
    expect(response.write).not.toHaveBeenCalled();
  });

  it("stops the stream on transport errors without exposing error details", async () => {
    const response = makeResponse();
    const { completed } = startStream(response);
    response.emit("error", new Error("private transport detail"));
    await completed;
    expect(response.write).not.toHaveBeenCalledWith(
      expect.stringContaining("private transport detail"),
    );
  });

  it("sends heartbeat comments and removes the timer on disconnect", async () => {
    vi.useFakeTimers();
    const { response, completed } = startStream();
    await vi.advanceTimersByTimeAsync(25_000);
    expect(response.write).toHaveBeenLastCalledWith(": keepalive\n\n");
    response.emit("close");
    await completed;
    expect(vi.getTimerCount()).toBe(0);
  });

  it("allows listeners to unsubscribe", () => {
    const listener = vi.fn();
    const unsubscribe = subscribeToFleetEvents(listener);
    unsubscribe();
    publishDeviceUpdated({ ...device });
    expect(listener).not.toHaveBeenCalled();
  });
});
