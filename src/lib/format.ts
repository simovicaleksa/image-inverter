export function formatBytes(bytes: number) {
  const units = ["byte", "kilobyte", "megabyte", "gigabyte", "terabyte"];
  let i = 0;

  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024;
    i++;
  }

  return new Intl.NumberFormat("en", {
    style: "unit",
    unit: units[i],
    unitDisplay: "short",
    maximumFractionDigits: 2
  }).format(bytes);
}

export function formatFileType(type: string) {
  return type.split("/")[1] ?? "";
}
