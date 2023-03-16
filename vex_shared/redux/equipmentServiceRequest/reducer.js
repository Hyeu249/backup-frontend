import equipmentServiceRequestActions from './service/equipmentServiceRequest/actions';
const initState = {
  //equipmentServiceRequest
  equipmentServiceRequests: [],
  supplierQuoteOptions: [],
  viewedEquipmentServiceRequest: {},
};

export default function equipmentServiceRequestReducer(
  state = initState,
  { type, ...action }
) {
  switch (type) {
    //equipmentServiceRequest
    case equipmentServiceRequestActions.LOAD_EQUIPMENT_SERVICE_REQUEST: {
      return {
        ...state,
        equipmentServiceRequests: action.equipmentServiceRequests,
      };
    }
    case equipmentServiceRequestActions.LOAD_SUPPLIER_QUOTE_IN_EQUIPMENT_SERVICE_REQUEST: {
      return {
        ...state,
        supplierQuoteOptions: action.supplierQuotes,
      };
    }
    case equipmentServiceRequestActions.REMOVE_EQUIPMENT_SERVICE_REQUEST: {
      return {
        ...state,
        equipmentServiceRequests: [],
      };
    }
    case equipmentServiceRequestActions.REMOVE_SUPPLIER_QUOTE_IN_EQUIPMENT_SERVICE_REQUEST: {
      return {
        ...state,
        supplierQuoteOptions: [],
      };
    }
    case equipmentServiceRequestActions.UPDATE_VIEWED_EQUIPMENT_SERVICE_REQUEST: {
      return {
        ...state,
        viewedEquipmentServiceRequest: {
          ...action.viewedEquipmentServiceRequest,
        },
      };
    }
    case equipmentServiceRequestActions.REMOVE_VIEWED_EQUIPMENT_SERVICE_REQUEST: {
      return { ...state, viewedEquipmentServiceRequest: {} };
    }
    default:
      return state;
  }
}
