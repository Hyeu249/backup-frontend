import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { cloneDeep } from 'lodash';

import actions from '@iso/vex_redux/vehicle/service/vehicleDocument/actions';
import { EMPTY } from '@iso/vex_containers/constants';

import Item from '../Item';

const useVehicleDocument = () => {
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
  const [editOpen, setEditOpen] = React.useState(false);
  const [vehicleDocument, setVehicleDocument] = React.useState(EMPTY);

  const vehicleDocuments = cloneDeep(
    useSelector(state => state.vehicle?.vehicleDocuments)
  );

  vehicleDocuments.unshift({
    label: intl.formatMessage({ id: 'text.selectAll' }),
    value: EMPTY,
  });

  switch (vehicleDocument) {
    case EMPTY:
      filterItems = vehicleDocuments.filter(o => o.value !== EMPTY);
      renderItems = filterItems.map(data => {
        return <Item key={data.key} data={data} editOpen={setEditOpen} />;
      });
      break;
    default:
      filterItems = vehicleDocuments.filter(o => o.value == vehicleDocument);
      renderItems = filterItems.map(data => (
        <Item key={data.key} data={data} editOpen={setEditOpen} />
      ));
  }

  return {
    //state
    createOpen,
    editOpen,
    vehicleDocument,
    //setState
    setCreateOpen,
    setEditOpen,
    setVehicleDocument,
    //others
    vehicleDocuments,
    renderItems,
  };
};

export default useVehicleDocument;
