import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { cloneDeep } from 'lodash';

import actions from '@iso/vex_redux/driver/service/driverDocument/actions';
import { EMPTY } from '@iso/vex_containers/constants';

import Item from '../Item';

const useDriverDocument = () => {
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
  const [driverDocument, setDriverDocument] = React.useState(EMPTY);

  const driverDocuments = cloneDeep(
    useSelector(state => state.driver?.driverDocuments)
  );

  driverDocuments.unshift({
    label: intl.formatMessage({ id: 'text.selectAll' }),
    value: EMPTY,
  });

  switch (driverDocument) {
    case EMPTY:
      filterItems = driverDocuments.filter(o => o.value !== EMPTY);
      renderItems = filterItems.map(data => {
        return <Item key={data.key} data={data} editOpen={setEditOpen} />;
      });
      break;
    default:
      filterItems = driverDocuments.filter(o => o.value == driverDocument);
      renderItems = filterItems.map(data => (
        <Item key={data.key} data={data} editOpen={setEditOpen} />
      ));
  }

  return {
    //state
    createOpen,
    editOpen,
    driverDocument,
    //setState
    setCreateOpen,
    setEditOpen,
    setDriverDocument,
    //others
    driverDocuments,
    renderItems,
  };
};

export default useDriverDocument;
