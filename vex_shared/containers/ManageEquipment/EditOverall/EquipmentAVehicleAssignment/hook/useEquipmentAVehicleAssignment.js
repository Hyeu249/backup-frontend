import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { cloneDeep } from 'lodash';

import actions from '@iso/vex_redux/equipment/service/equipmentAVehicleAssignment/actions';
import { EMPTY } from '@iso/vex_containers/constants';

import Item from '../Item';

const useEquipmentAVehicleAssignment = () => {
  const intl = useIntl();
  let renderItems = [];
  let filterItems = [];

  const { id } = useParams();

  const dispatch = useDispatch();
  const { initData, removeInitData } = actions;

  React.useEffect(() => {
    dispatch(initData(id));
    return () => {
      dispatch(removeInitData());
    };
  }, []);

  //state
  const [createOpen, setCreateOpen] = React.useState(false);
  const [equipmentAVehicleAssignment, setEquipmentAVehicleAssignment] =
    React.useState(EMPTY);

  const equipmentAVehicleAssignments = cloneDeep(
    useSelector(state => state.equipment?.equipmentAVehicleAssignments)
  );

  equipmentAVehicleAssignments.unshift({
    label: intl.formatMessage({ id: 'text.selectAll' }),
    value: EMPTY,
  });

  switch (equipmentAVehicleAssignment) {
    case EMPTY:
      filterItems = equipmentAVehicleAssignments.filter(o => o.value !== EMPTY);
      renderItems = filterItems.map(data => {
        return <Item key={data.key} data={data} />;
      });
      break;
    default:
      filterItems = equipmentAVehicleAssignments.filter(
        o => o.value == equipmentAVehicleAssignment
      );
      renderItems = filterItems.map(data => (
        <Item key={data.key} data={data} />
      ));
  }

  return {
    //state
    createOpen,
    equipmentAVehicleAssignment,
    //setState
    setCreateOpen,
    setEquipmentAVehicleAssignment,
    //others
    equipmentAVehicleAssignments,
    renderItems,
  };
};

export default useEquipmentAVehicleAssignment;
