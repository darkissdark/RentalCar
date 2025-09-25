export type NumberSerapators = "," | " ";
export type AddressSerapators = "," | "|";

function parseAddress(address: string): { city: string; country: string } {
  const parts = address.split(",").map((p) => p.trim());
  return {
    city: parts[1] ?? "",
    country: parts[2] ?? "",
  };
}

export function formatThousandsSeparator(
  value: number,
  separator: NumberSerapators = " "
): string {
  return value.toLocaleString("en-US").replace(/,/g, separator);
}

export function formatCarLocation(
  address: string,
  separator: AddressSerapators = ","
): string {
  const { city, country } = parseAddress(address);
  return `${city}${separator !== "," ? " " : ""}${separator} ${country}`;
}
