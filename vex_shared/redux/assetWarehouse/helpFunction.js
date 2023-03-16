export const convertTypeOfAssetWarehouse = assetWarehouse => {
  return {
    name: String(assetWarehouse.name || ''),
    description: String(assetWarehouse.description || ''),
  };
};
