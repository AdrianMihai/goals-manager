export const isEmptyString = (val) => !val || val.length === 0;

export const capitalize = (val: string) => {
  if (isEmptyString(val)) {
    return '';
  }

  return `${val[0].toUpperCase()}${val.slice(1, val.length)}`;
};
