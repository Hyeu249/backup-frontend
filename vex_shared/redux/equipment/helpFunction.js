import { cloneDeep } from 'lodash';

export const convertTypeOfEquipment = rawEquipment => {
  const equipment = cloneDeep(rawEquipment);
  return {
    maintenance_type_id: String(equipment.maintenance_type_id || ''),
    equipment_group_id: String(equipment.equipment_group_id || ''),
    name: String(equipment.name || ''),
    description: String(equipment.description || ''),
    manufacturer: String(equipment.manufacturer || ''),
    is_reusable: Boolean(equipment.is_reusable || true),
    maintenance_cycle_km: Number(equipment.maintenance_cycle_km || 0),
    maintenance_cycle_hour: Number(equipment.maintenance_cycle_hour || 0),
  };
};

export const convertTypeOfEquipmentADriverAssignment = ({
  rawValue,
  listId = true,
}) => {
  const value = cloneDeep(rawValue);
  const result = {
    equipment_id: String(value.equipment_id || ''),
    vehicle_driver_id: String(value.vehicle_driver_id || ''),
  };
  if (listId === true) {
    return addApproverIdList(result, value.approver_id_list);
  } else {
    return result;
  }
};

export const convertTypeOfEquipmentAVehicleAssignment = ({
  rawValue,
  listId = true,
}) => {
  const value = cloneDeep(rawValue);
  const result = {
    equipment_id: String(value.equipment_id || ''),
    vehicle_id: String(value.vehicle_id || ''),
    start_km: Number(value.start_km || 0),
    end_km: Number(value.end_km || 0),
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
