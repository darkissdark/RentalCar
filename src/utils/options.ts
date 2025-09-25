export const generatePriceOptions = (
  count: number,
  step: number = 10
): string[] =>
  Array.from({ length: count }, (_, i) => ((i + 1) * step).toString());
