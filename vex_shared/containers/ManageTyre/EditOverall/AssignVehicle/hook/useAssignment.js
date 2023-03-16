import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { cloneDeep } from 'lodash';
import { useParams } from 'react-router-dom';

import actions from '@iso/vex_redux/tyre/service/assignment/actions';
import { EMPTY } from '@iso/vex_containers/constants';

import Item from '../Item';

const useAssignment = () => {
  const intl = useIntl();
  let renderItems = [];
  let filterItems = [];
  const { id } = useParams();

  const dispatch = useDispatch();
  const {
    initVehicleInTyre,
    initVehicleAssignmentInTyre,
    removeVehiclesInTyre,
    removeVehicleAssignmentInTyre,
  } = actions;

  React.useEffect(() => {
    //set state
    dispatch(initVehicleInTyre());
    dispatch(initVehicleAssignmentInTyre(id));
    return () => {
      dispatch(removeVehiclesInTyre());
      dispatch(removeVehicleAssignmentInTyre());
    };
  }, [dispatch]);

  //state
  const [createOpen, setCreateOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [assignment, setAssignment] = React.useState(EMPTY);

  const assignments = cloneDeep(useSelector(state => state.tyre.assignments));

  assignments.unshift({
    label: intl.formatMessage({ id: 'text.selectAll' }),
    value: EMPTY,
  });

  switch (assignment) {
    case EMPTY:
      filterItems = assignments.filter(o => o.value !== EMPTY);
      renderItems = filterItems.map(data => {
        return <Item key={data.key} data={data} setEditOpen={setEditOpen} />;
      });
      break;
    default:
      filterItems = assignments.filter(o => o.value == assignment);
      renderItems = filterItems.map(data => (
        <Item key={data.key} data={data} setEditOpen={setEditOpen} />
      ));
  }

  return {
    //state
    createOpen,
    editOpen,
    assignment,
    //setState
    setCreateOpen,
    setEditOpen,
    setAssignment,
    //others
    assignments,
    renderItems,
  };
};

export default useAssignment;
