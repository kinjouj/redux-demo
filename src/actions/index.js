const ACTION_ECHO = "echo";

export function changeEcho(text) {
  return { type: ACTION_ECHO, text };
}
