export function generateUniqueId(): string {
  return new Date().getMilliseconds().toString();
}
