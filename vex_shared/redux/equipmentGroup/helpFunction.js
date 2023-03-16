export const convertTypeOfEquipmentGroup = equipmentGroup => {
  return {
    name: String(equipmentGroup.name || ''),
    description: String(equipmentGroup.description || ''),
  };
};
