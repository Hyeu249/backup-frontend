import { cloneDeep } from 'lodash';

export const convertTypeOfFuelRequest___ = rawFuelRequest => {
  const fuelRequest = cloneDeep(rawFuelRequest);
  return {
    name: String(fuelRequest.name || ''),
    agent_name: String(fuelRequest.agent_name || ''),
    address: String(fuelRequest.address || ''),
    supply_type: String(fuelRequest.supply_type || ''),
    additional_option: String(fuelRequest.additional_option || ''),
    phone: String(fuelRequest.phone || ''),
    email: String(fuelRequest.email || ''),
  };
};

export const convertTypeOfFuelRequest = ({ rawValue, listId = true }) => {
  const value = cloneDeep(rawValue);
  const result = {
    fuel_price_quote_id: String(value.fuel_price_quote_id || ''),
    vehicle_id: String(value.vehicle_id || ''),
    vehicle_driver_id: String(value.vehicle_driver_id || ''),
    refuel_date: String(value.refuel_date || ''),
    volume_liter: Number(value.volume_liter || 0),
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
