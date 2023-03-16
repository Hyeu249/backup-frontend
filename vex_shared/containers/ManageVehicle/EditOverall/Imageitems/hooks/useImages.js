import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { cloneDeep } from 'lodash';

import actions from '@iso/vex_redux/vehicle/service/images/actions';
import { useIntl } from 'react-intl';
import { EMPTY } from '@iso/vex_containers/constants';

import Item from '../Item';

const useImages = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const { id } = useParams();
  let renderItems = [];
  let filterItems = [];
  const { initImagesInVehicle, removeImagesInVehicle } = actions;

  //state
  const [createOpen, setCreateOpen] = useState(false);
  const [vehicleImage, setVehicleImage] = useState(EMPTY);

  //init data
  useEffect(() => {
    dispatch(initImagesInVehicle(id));
    return () => {
      dispatch(removeImagesInVehicle());
    };
  }, []);

  const vehicleImages = cloneDeep(
    useSelector(state => state.vehicle.vehicleImages)
  );

  vehicleImages.unshift({
    label: intl.formatMessage({ id: 'text.selectAll' }),
    value: EMPTY,
  });

  switch (vehicleImage) {
    case EMPTY:
      filterItems = vehicleImages.filter(o => o.value !== EMPTY);
      renderItems = filterItems.map(data => {
        return <Item key={data.key} data={data} />;
      });
      break;
    default:
      filterItems = vehicleImages.filter(o => o.value == vehicleImage);
      renderItems = filterItems.map(data => (
        <Item key={data.key} data={data} />
      ));
  }

  return {
    //state
    createOpen,
    vehicleImage,
    //setState
    setCreateOpen,
    setVehicleImage,
    //others
    vehicleImages,
    renderItems,
  };
};

export default useImages;
