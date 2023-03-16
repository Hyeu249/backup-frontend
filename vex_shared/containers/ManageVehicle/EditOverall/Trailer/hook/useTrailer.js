import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { cloneDeep } from 'lodash';
import { useParams } from 'react-router-dom';

import actions from '@iso/vex_redux/vehicle/service/trailer/actions';
import { EMPTY, GET_MY_TRAILER } from '@iso/vex_containers/constants';

import Item from '../Item';

const useTrailer = () => {
  const intl = useIntl();
  let renderItems = [];
  let filterItems = [];
  const { id } = useParams();

  const dispatch = useDispatch();
  const { initData, removeInitData } = actions;

  React.useEffect(() => {
    //set state
    dispatch(initData());
    return () => {
      dispatch(removeInitData());
    };
  }, [dispatch]);

  //state
  const [createOpen, setCreateOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [trailer, setTrailer] = React.useState(EMPTY);

  const trailers = cloneDeep(useSelector(state => state.vehicle.trailers));

  trailers.unshift({
    label: intl.formatMessage({ id: 'text.getMyTrailer' }),
    value: GET_MY_TRAILER,
  });

  trailers.unshift({
    label: intl.formatMessage({ id: 'text.selectAll' }),
    value: EMPTY,
  });

  switch (trailer) {
    case EMPTY:
      filterItems = trailers.filter(
        o => o.value !== EMPTY && o.value !== GET_MY_TRAILER
      );
      renderItems = filterItems.map(data => {
        return <Item key={data.key} data={data} setEditOpen={setEditOpen} />;
      });
      break;
    case GET_MY_TRAILER:
      filterItems = trailers.filter(o => o.semi_truck?.id === id);
      renderItems = filterItems.map(data => {
        return <Item key={data.key} data={data} setEditOpen={setEditOpen} />;
      });
      break;
    default:
      filterItems = trailers.filter(o => o.value == trailer);
      renderItems = filterItems.map(data => (
        <Item key={data.key} data={data} setEditOpen={setEditOpen} />
      ));
  }

  return {
    //state
    createOpen,
    editOpen,
    trailer,
    //setState
    setCreateOpen,
    setEditOpen,
    setTrailer,
    //others
    trailers,
    renderItems,
  };
};

export default useTrailer;
