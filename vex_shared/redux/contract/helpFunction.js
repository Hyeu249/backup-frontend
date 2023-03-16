import { cloneDeep } from 'lodash';

export const convertTypeOfContract__ = rawContract => {
  const contract = cloneDeep(rawContract);
  return {
    name: String(contract.name || ''),
    valid_from: String(contract.valid_from || ''),
    valid_until: String(contract.valid_until || ''),
    grace_period: String(contract.grace_period || ''),
    type_of_purchase: String(contract.type_of_purchase || ''),
    note: String(contract.note || ''),
    is_in_hand: Boolean(contract.is_in_hand || false),
    supplier_id: String(contract.supplier_id || ''),
    approver_id_list: Array(contract.approver_id_list || ''),
  };
};

export const convertTypeOfContract = ({ rawContract, listId = true }) => {
  const contract = cloneDeep(rawContract);
  const value = {
    name: String(contract.name || ''),
    valid_from: String(contract.valid_from || ''),
    valid_until: String(contract.valid_until || ''),
    grace_period: String(contract.grace_period || ''),
    type_of_purchase: String(contract.type_of_purchase || ''),
    note: String(contract.note || ''),
    is_in_hand: Boolean(contract.is_in_hand || false),
    supplier_id: String(contract.supplier_id || ''),
  };
  if (listId === true) {
    return addApproverIdList(value, contract.approver_id_list);
  } else {
    return value;
  }
};

function addApproverIdList(rawValue, listId) {
  const value = cloneDeep(rawValue);
  value.approver_id_list = Array(...(listId || []));

  return value;
}
