import { cloneDeep } from 'lodash';

export const convertTypeOfFuelPriceQuote = ({ rawValue, listId = true }) => {
  const value = cloneDeep(rawValue);
  const result = {
    valid_from: String(value.valid_from || ''),
    valid_until: String(value.valid_until || ''),
    supplier_id: String(value.supplier_id || ''),
    fuel_id: String(value.fuel_id || ''),
    price: Number(value.price || ''),
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
