import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { cloneDeep } from 'lodash';

import actions from '@iso/vex_redux/driver/service/images/actions';
import { useIntl } from 'react-intl';
import { EMPTY } from '@iso/vex_containers/constants';

import Item from '../Item';

const useImages = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const { id } = useParams();
  let renderItems = [];
  let filterItems = [];
  const { initData, removeInitData } = actions;

  //state
  const [createOpen, setCreateOpen] = useState(false);
  const [driverDocumentImage, setDriverDocumentImage] = useState(EMPTY);

  //init data
  useEffect(() => {
    dispatch(initData(id));
    return () => {
      dispatch(removeInitData());
    };
  }, []);

  const driverDocumentImages = cloneDeep(
    useSelector(state => state.driver.driverDocumentImages)
  );

  driverDocumentImages.unshift({
    label: intl.formatMessage({ id: 'text.selectAll' }),
    value: EMPTY,
  });

  switch (driverDocumentImage) {
    case EMPTY:
      filterItems = driverDocumentImages.filter(o => o.value !== EMPTY);
      renderItems = filterItems.map(data => {
        return <Item key={data.key} data={data} />;
      });
      break;
    default:
      filterItems = driverDocumentImages.filter(
        o => o.value == driverDocumentImage
      );
      renderItems = filterItems.map(data => (
        <Item key={data.key} data={data} />
      ));
  }

  return {
    //state
    createOpen,
    driverDocumentImage,
    //setState
    setCreateOpen,
    setDriverDocumentImage,
    //others
    driverDocumentImages,
    renderItems,
  };
};

export default useImages;
