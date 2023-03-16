export const convertTypeOfMaintenanceType = maintenanceType => {
  return {
    name: String(maintenanceType.name || ''),
    description: String(maintenanceType.description || ''),
  };
};
