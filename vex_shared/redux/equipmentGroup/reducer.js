import actions from './actions';

const initState = {
  equipmentGroups: [],
  viewedEquipmentGroup: {},
};

export default function equipmentGroupReducer(
  state = initState,
  { type, ...action }
) {
  switch (type) {
    case actions.LOAD_EQUIPMENT_GROUP: {
      return {
        ...state,
        equipmentGroups: action.equipmentGroups,
      };
    }
    case actions.REMOVE_EQUIPMENT_GROUP: {
      return {
        ...state,
        equipmentGroups: [],
      };
    }
    case actions.UPDATE_VIEWED_EQUIPMENT_GROUP: {
      return {
        ...state,
        viewedEquipmentGroup: { ...action.viewedEquipmentGroup },
      };
    }
    case actions.REMOVE_VIEWED_EQUIPMENT_GROUP: {
      return {
        ...state,
        viewedEquipmentGroup: {},
      };
    }
    default:
      return state;
  }
}
