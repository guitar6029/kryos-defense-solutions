import type { KryosNode } from "../../app/types/KryosNode";

export type FleetEvent = {
  id: string;
  type: "device.updated";
  timestamp: string;
  payload: KryosNode;
};

type Listener = (event: FleetEvent) => void;
const listeners = new Set<Listener>();
let sequence = 0;

/** Publish after a server-side device write; this bus exists only in this process. */
export function publishDeviceUpdated(payload: KryosNode): FleetEvent {
  const event: FleetEvent = {
    id: String(++sequence),
    type: "device.updated",
    timestamp: new Date().toISOString(),
    payload,
  };

  for (const listener of listeners) listener(event);
  return event;
}

export function subscribeToFleetEvents(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function formatFleetEvent(event: FleetEvent): string {
  return `id: ${event.id}\nevent: ${event.type}\ndata: ${JSON.stringify(event)}\n\n`;
}
