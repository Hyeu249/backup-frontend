import tyreActions from './service/tyre/actions';
import assignmentActions from './service/assignment/actions';
import tyreImagesActions from './service/images/actions';

const initState = {
  //tyre
  tyres: [],
  viewedTyre: {},
  //assignment
  vehicles: [],
  assignments: [],
  viewedAssignment: {},
  //images
  tyreImages: [],
};

export default function tyreReducer(state = initState, { type, ...action }) {
  switch (type) {
    //tyre
    case tyreActions.LOAD_TYRE: {
      return {
        ...state,
        tyres: action.tyres,
      };
    }
    case tyreActions.REMOVE_TYRE: {
      return {
        ...state,
        tyres: [],
      };
    }
    case tyreActions.UPDATE_VIEWED_TYRE: {
      return { ...state, viewedTyre: { ...action.viewedTyre } };
    }
    case tyreActions.REMOVE_VIEWED_TYRE: {
      return { ...state, viewedTyre: {} };
    }

    //assignment
    case assignmentActions.LOAD_VEHICLE_ASSIGNMENT_IN_TYRE: {
      return {
        ...state,
        assignments: action.assignments,
      };
    }
    case assignmentActions.LOAD_VEHICLE_IN_TYRE: {
      return {
        ...state,
        vehicles: action.vehicles,
      };
    }
    case assignmentActions.REMOVE_VEHICLE_IN_TYRE: {
      return { ...state, vehicles: [] };
    }
    case assignmentActions.REMOVE_VEHICLE_ASSIGNMENT_IN_TYRE: {
      return { ...state, assignments: [] };
    }
    case assignmentActions.UPDATE_VIEWED_TYRE_VEHICLE_ASSIGNMENT: {
      return { ...state, viewedAssignment: { ...action.assignment } };
    }
    case assignmentActions.REMOVE_VIEWED_TYRE_VEHICLE_ASSIGNMENT: {
      return { ...state, viewedAssignment: {} };
    }

    //images
    case tyreImagesActions.LOAD_TYRE_IMAGE_IN_TYRE: {
      return { ...state, tyreImages: action.tyreImages };
    }
    case tyreImagesActions.REMOVE_TYRE_IMAGE_IN_TYRE: {
      return { ...state, tyreImages: [] };
    }
    default:
      return state;
  }
}
