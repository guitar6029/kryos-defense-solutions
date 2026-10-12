/** Return whether every supplied query parameter name is explicitly allowed. */
export function hasOnlyAllowedQueryParameters(
  query: Record<string, unknown>,
  allowedParameters: readonly string[],
): boolean {
  const allowed = new Set(allowedParameters);
  return Object.keys(query).every((parameter) => allowed.has(parameter));
}
