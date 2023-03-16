import { cloneDeep } from 'lodash';

export const convertTypeOfServiceRequest = ({ rawValue, listId = true }) => {
  const value = cloneDeep(rawValue);
  const result = {
    driver_id: String(value.driver_id || ''),
    vehicle_id: String(value.vehicle_id || ''),
    equipment_service_request_id_list: Array(
      ...(value.equipment_service_request_id_list || [])
    ),
    tyre_service_request_id_list: Array(
      ...(value.tyre_service_request_id_list || [])
    ),
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
