export const convertTypeOfServiceType = serviceType => {
  return {
    name: String(serviceType.name || ''),
    description: String(serviceType.description || ''),
  };
};
