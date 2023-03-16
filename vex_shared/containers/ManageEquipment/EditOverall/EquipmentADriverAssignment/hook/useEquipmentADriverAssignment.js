import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { cloneDeep } from 'lodash';

import actions from '@iso/vex_redux/equipment/service/equipmentADriverAssignment/actions';
import { EMPTY } from '@iso/vex_containers/constants';

import Item from '../Item';

const useEquipmentADriverAssignment = () => {
  const intl = useIntl();
  let renderItems = [];
  let filterItems = [];

  const { id } = useParams();

  const dispatch = useDispatch();
  const { initData, removeInitData } = actions;

  React.useEffect(() => {
    dispatch(initData(id));
    return () => {
      console.log('remove!!!');
      dispatch(removeInitData());
    };
  }, []);

  //state
  const [createOpen, setCreateOpen] = React.useState(false);
  const [equipmentADriverAssignment, setEquipmentADriverAssignment] =
    React.useState(EMPTY);

  const equipmentADriverAssignments = cloneDeep(
    useSelector(state => state.equipment?.equipmentADriverAssignments)
  );

  equipmentADriverAssignments.unshift({
    label: intl.formatMessage({ id: 'text.selectAll' }),
    value: EMPTY,
  });

  switch (equipmentADriverAssignment) {
    case EMPTY:
      filterItems = equipmentADriverAssignments.filter(o => o.value !== EMPTY);
      renderItems = filterItems.map(data => {
        return <Item key={data.key} data={data} />;
      });
      break;
    default:
      filterItems = equipmentADriverAssignments.filter(
        o => o.value == equipmentADriverAssignment
      );
      renderItems = filterItems.map(data => (
        <Item key={data.key} data={data} />
      ));
  }

  return {
    //state
    createOpen,
    equipmentADriverAssignment,
    //setState
    setCreateOpen,
    setEquipmentADriverAssignment,
    //others
    equipmentADriverAssignments,
    renderItems,
  };
};

export default useEquipmentADriverAssignment;
