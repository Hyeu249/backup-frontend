import { cloneDeep } from 'lodash';

export const convertTypeOfVehicleDocumentType = raw => {
  const vehicleDocumentType = cloneDeep(raw);
  return {
    name: String(vehicleDocumentType.name || ''),
    description: String(vehicleDocumentType.description || ''),
    is_required: Boolean(vehicleDocumentType.is_required || false),
  };
};
