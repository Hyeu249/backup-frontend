export const convertTypeOfFuel = fuel => {
  return {
    name: String(fuel.name || ''),
    description: String(fuel.description || ''),
  };
};
