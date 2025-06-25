export const mapValuesOnly = (value: any) => {
  if (typeof value !== "object") {
    return [];
  }

  const keys = Object.keys(value);
  const resultingValues = Object.values(value).filter(
    (x) => !keys.find((key) => key === x)
  );

  return Object.entries(value).reduce(
    (mapping, [currentKey, currentValue], idx) => {
      if (resultingValues.includes(currentValue)) {
        mapping[currentKey] = currentValue;
      }

      return mapping;
    },
    {}
  );
};
