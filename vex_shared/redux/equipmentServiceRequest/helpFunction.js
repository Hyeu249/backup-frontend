import { cloneDeep } from 'lodash';

export const convertTypeOfEquipmentServiceRequest = raw => {
  const equipmentServiceRequest = cloneDeep(raw);
  return {
    supplier_quote_id: String(equipmentServiceRequest.supplier_quote_id || ''),
    planned_service_time: String(
      equipmentServiceRequest.planned_service_time || ''
    ),
    actual_service_time: String(
      equipmentServiceRequest.actual_service_time || ''
    ),
  };
};
