import { cloneDeep } from 'lodash';

export const convertTypeOfSupplierQuote = ({ rawValue, listId = true }) => {
  const value = cloneDeep(rawValue);
  const result = {
    valid_from: String(value.valid_from || ''),
    valid_until: String(value.valid_until || ''),
    supplier_id: String(value.supplier_id || ''),
    supplier_service_type_id: String(value.supplier_service_type_id || ''),
    equipment_id: String(value.equipment_id || ''),
    equipment_price: Number(value.equipment_price || 0),
    labor_cost: Number(value.labor_cost || 0),
  };
  if (listId === true) {
    return addApproverIdList(result, value.approver_id_list);
  } else {
    return result;
  }
};

function addApproverIdList(rawResult, listId) {
  const result = cloneDeep(rawResult);
  result.approver_id_list = Array(...(listId || []));

  return result;
}
