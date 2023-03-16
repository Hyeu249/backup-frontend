import { cloneDeep } from 'lodash';

export const convertTypeOfTyre = rawTyre => {
  const tyre = cloneDeep(rawTyre);

  return {
    name: String(tyre.name || ''),
    short_name: String(tyre.short_name || ''),
    size_cm: Number(tyre.size_cm || 0),
    operation_limit_km: Number(tyre.operation_limit_km || 0),
    replace_noti_max_threshold_km: Number(
      tyre.replace_noti_max_threshold_km || 0
    ),
    serial_no: String(tyre.serial_no || ''),
  };
};

export const convertTypeOfTyreAVehicleAssignment = ({
  rawRelation,
  listId,
}) => {
  const relation = cloneDeep(rawRelation);
  const assignment = {
    tyre_id: String(relation.tyre_id || ''),
    vehicle_id: String(relation.vehicle_id || ''),
    position: Number(relation.position || 0),
    in_use_km: Number(relation.in_use_km || 0),
  };
  if (listId === true) {
    return addApproverIdList(assignment, relation.approver_id_list);
  }
};

function addApproverIdList(rawAssignment, listId) {
  const assignment = cloneDeep(rawAssignment);
  assignment.approver_id_list = Array(...(listId || []));

  return assignment;
}
