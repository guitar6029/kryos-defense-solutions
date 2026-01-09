export const SHUTDOWN_SEQUENCE_STEPS: string[] = [
  "[command input] .............. DISABLED",
  "[active processes] .......... TERMINATING",
  "[response queue] ............ FLUSHED",

  "[telemetry stream] .......... HALTED",
  "[status reporting] .......... STOPPED",

  "[control interface] ......... DISCONNECTED",
  "[external links] ............ CLOSED",

  "[session context] ........... SAVED",
  "[volatile memory] ........... CLEARED",

  "[filesystem] ............... SYNCED",
  "[write buffers] ............ COMMITTED",

  "[security context] .......... LOCKED",
  "[auth tokens] .............. INVALIDATED",

  "[subsystems] ............... STANDBY",
  "[power draw] ............... REDUCED",

  "[system clock] ............. PAUSED",
  "[core state] ............... SAFE",

  "[shutdown sequence] ........ COMPLETE",
];
