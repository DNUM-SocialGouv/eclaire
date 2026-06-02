export function isValidDate(value: string): boolean {
  const isoRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!isoRegex.test(value)) return false;

  const date = new Date(value);
  if (isNaN(date.getTime())) return false;

  const [y, m, d] = value.split('-').map(Number);

  return (
    date.getUTCFullYear() === y &&
    date.getUTCMonth() + 1 === m &&
    date.getUTCDate() === d
  );
}