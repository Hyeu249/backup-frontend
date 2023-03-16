import { cloneDeep } from 'lodash';

export const convertTypeOfTyrePriceQuote = ({ rawValue, listId = true }) => {
  const value = cloneDeep(rawValue);
  const result = {
    supplier_id: String(value.supplier_id || ''),
    tyre_id: String(value.tyre_id || ''),
    valid_from: String(value.valid_from || ''),
    valid_until: String(value.valid_until || ''),
    tyre_price: Number(value.tyre_price || 0),
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
