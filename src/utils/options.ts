export const generatePriceOptions = (
  count: number,
  step: number = 10,
  startsFrom: number = 0
): string[] =>
  Array.from({ length: count }, (_, i) => (startsFrom + i * step).toString());
