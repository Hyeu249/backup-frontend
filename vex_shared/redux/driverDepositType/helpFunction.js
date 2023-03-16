export const convertTypeOfDriverDepositType = data => {
  return {
    name: String(data.name || ''),
    description: String(data.description || ''),
  };
};
