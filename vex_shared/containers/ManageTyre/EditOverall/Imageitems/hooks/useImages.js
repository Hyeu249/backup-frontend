import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { cloneDeep } from 'lodash';

import actions from '@iso/vex_redux/tyre/service/images/actions';
import { useIntl } from 'react-intl';
import { EMPTY } from '@iso/vex_containers/constants';

import Item from '../Item';

const useImages = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const { id } = useParams();
  let renderItems = [];
  let filterItems = [];
  const { initImagesInTyre, removeImagesInTyre } = actions;

  //state
  const [createOpen, setCreateOpen] = useState(false);
  const [tyreImage, setTyreImage] = useState(EMPTY);

  //init data
  useEffect(() => {
    dispatch(initImagesInTyre(id));
    return () => {
      dispatch(removeImagesInTyre());
    };
  }, []);

  const tyreImages = cloneDeep(useSelector(state => state.tyre.tyreImages));

  tyreImages.unshift({
    label: intl.formatMessage({ id: 'text.selectAll' }),
    value: EMPTY,
  });

  switch (tyreImage) {
    case EMPTY:
      filterItems = tyreImages.filter(o => o.value !== EMPTY);
      renderItems = filterItems.map(data => {
        return <Item key={data.key} data={data} />;
      });
      break;
    default:
      filterItems = tyreImages.filter(o => o.value == tyreImage);
      renderItems = filterItems.map(data => (
        <Item key={data.key} data={data} />
      ));
  }

  return {
    //state
    createOpen,
    tyreImage,
    //setState
    setCreateOpen,
    setTyreImage,
    //others
    tyreImages,
    renderItems,
  };
};

export default useImages;
