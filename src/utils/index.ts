const isHave = (value: string | Array<string> | undefined) => {
  return value === undefined || value === null || value === 'null' || value === 'undefined';
};

export default {
  isHave
};
