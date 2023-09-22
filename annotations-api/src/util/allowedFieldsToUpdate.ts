export function filterAllowedFields<T extends object>(data: T, allowedFields: string[]): Partial<T> {
  const filteredData: Partial<T> = {};

  for (const key in data) {
    if (allowedFields.includes(key)) {
      filteredData[key] = data[key];
    }
  }

  return filteredData;
}
