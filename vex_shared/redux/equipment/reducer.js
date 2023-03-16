import equipmentActions from './service/equipment/actions';
import assignDriverAtions from './service/equipmentADriverAssignment/actions';
import assignVehicleAtions from './service/equipmentAVehicleAssignment/actions';
const initState = {
  //equipment
  equipments: [],
  maintenanceTypes: [],
  equipmentGroups: [],
  viewedEquipment: {},
  //assignDriver
  equipmentADriverAssignments: [],
  driverOptions: [],
  //assignVehicle
  equipmentAVehicleAssignments: [],
  vehicleOptions: [],
  //options
  approverOptions: [],
};
export default function equipmentReducer(
  state = initState,
  { type, ...action }
) {
  switch (type) {
    //equipment
    case equipmentActions.LOAD_EQUIPMENT: {
      return {
        ...state,
        equipments: action.equipments,
      };
    }
    case equipmentActions.REMOVE_EQUIPMENT: {
      return {
        ...state,
        equipments: [],
      };
    }
    case equipmentActions.REMOVE_MAINTENANCE_TYPE_IN_EQUIPMENT: {
      return {
        ...state,
        maintenanceTypes: [],
      };
    }
    case equipmentActions.REMOVE_EQUIPMENT_GROUP_IN_EQUIPMENT: {
      return {
        ...state,
        equipmentGroups: [],
      };
    }
    case equipmentActions.LOAD_MAINTENANCE_TYPE_IN_EQUIPMENT: {
      return {
        ...state,
        maintenanceTypes: action.maintenanceTypes,
      };
    }
    case equipmentActions.LOAD_EQUIPMENT_GROUP_IN_EQUIPMENT: {
      return {
        ...state,
        equipmentGroups: action.equipmentGroups,
      };
    }
    case equipmentActions.UPDATE_VIEWED_EQUIPMENT: {
      return { ...state, viewedEquipment: { ...action.viewedEquipment } };
    }
    case equipmentActions.REMOVE_VIEWED_EQUIPMENT: {
      return { ...state, viewedEquipment: {} };
    }
    //assign driver
    case assignDriverAtions.LOAD_EQUIPMENT_A_DRIVER_ASSIGNMENT: {
      return {
        ...state,
        equipmentADriverAssignments: action.equipmentADriverAssignments,
      };
    }
    case assignDriverAtions.REMOVE_EQUIPMENT_A_DRIVER_ASSIGNMENT: {
      return { ...state, equipmentADriverAssignments: [] };
    }

    case assignDriverAtions.LOAD_DRIVER_AT_EQUIPMENT_A_DRIVER_ASSIGNMENT: {
      return { ...state, driverOptions: action.drivers };
    }
    case assignDriverAtions.REMOVE_DRIVER_AT_EQUIPMENT_A_DRIVER_ASSIGNMENT: {
      return { ...state, driverOptions: {} };
    }

    case assignDriverAtions.LOAD_APPROVER_IN_EQUIPMENT_A_DRIVER_ASSIGNMENT: {
      return {
        ...state,
        approverOptions: action.approvers,
      };
    }
    case assignDriverAtions.REMOVE_APPROVER_IN_EQUIPMENT_A_DRIVER_ASSIGNMENT: {
      return { ...state, approverOptions: [] };
    }
    //assign vehicle
    case assignVehicleAtions.LOAD_EQUIPMENT_A_VEHICLE_ASSIGNMENT: {
      return {
        ...state,
        equipmentAVehicleAssignments: action.equipmentAVehicleAssignments,
      };
    }
    case assignVehicleAtions.REMOVE_EQUIPMENT_A_VEHICLE_ASSIGNMENT: {
      return { ...state, equipmentAVehicleAssignments: [] };
    }
    case assignVehicleAtions.LOAD_APPROVER_IN_EQUIPMENT_A_VEHICLE_ASSIGNMENT: {
      return {
        ...state,
        approverOptions: action.approvers,
      };
    }
    case assignVehicleAtions.REMOVE_APPROVER_IN_EQUIPMENT_A_VEHICLE_ASSIGNMENT: {
      return { ...state, approverOptions: [] };
    }

    case assignVehicleAtions.LOAD_VEIHCLE_AT_EQUIPMENT_A_VEHICLE_ASSIGNMENT: {
      return { ...state, vehicleOptions: action.vehicles };
    }
    case assignVehicleAtions.REMOVE_VEHICLE_AT_EQUIPMENT_A_VEHICLE_ASSIGNMENT: {
      return { ...state, vehicleOptions: {} };
    }
    default:
      return state;
  }
}
