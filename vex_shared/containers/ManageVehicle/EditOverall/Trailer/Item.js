import React from 'react';
import { useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';

import ImageDocumentIcon from '@iso/vex_config/icon/ImageDocumentIcon';
import actions from '@iso/vex_redux/vehicle/service/trailer/actions';
import CustomDropDown from '@iso/vex_ui/CustomDropdown/CustomDropdown';

import ItemWrapper from '@iso/vex_lib/wraps/ItemWrapper';
import ThreeDotIcon from '@iso/vex_config/icon/ThreeDotIcon';

const Item = ({ data, setEditOpen }) => {
  const font_name = `-apple-system,BlinkMacSystemFont,Avenir Next,Avenir,Segoe UI,Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol`;

  const intl = useIntl();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { setViewedTrailer, deleteTrailer, attachTrailer, detachTrailer } =
    actions;

  const isAttached = data.semi_truck?.id === id;
  return (
    <ItemWrapper
      onClick={() => {
        dispatch(setViewedTrailer({ id: data.id, setOpen: setEditOpen }));
      }}
      style={{ backgroundColor: isAttached ? '#e4f4ff' : '' }}
    >
      <ImageDocumentIcon style={{ color: '#8279e3' }} />
      <div>
        <div
          style={{ color: '#262c2d', fontSize: '13px', fontFamily: font_name }}
        >
          {data.name}
        </div>
        <div
          style={{ fontSize: '12px', color: '#636f73', fontFamily: font_name }}
        >
          {`${intl.formatMessage({
            id: 'text.addedOn',
          })}: ${data.create_time}`}
        </div>
      </div>
      <CustomDropDown
        menu={[
          {
            title: intl.formatMessage({
              id: 'text.deleteTrailer',
            }),
            onClick: e => dispatch(deleteTrailer(data.id)),
            Icon: <div style={{ color: '#636f73', marginLeft: '20px' }}></div>,
          },
          {
            title: intl.formatMessage({
              id: 'text.attachTrailer',
            }),
            onClick: e =>
              dispatch(
                attachTrailer({
                  vehicleId: id,
                  id: data.id,
                })
              ),
            Icon: <div style={{ color: '#636f73', marginLeft: '20px' }}></div>,
          },
          {
            title: intl.formatMessage({
              id: 'text.detachTrailer',
            }),
            onClick: e =>
              dispatch(
                detachTrailer({
                  vehicleId: id,
                  id: data.id,
                })
              ),
            Icon: <div style={{ color: '#636f73', marginLeft: '20px' }}></div>,
          },
        ]}
      >
        <ThreeDotIcon
          styleDiv={{
            height: '20px',
            width: '20px',
            borderRadius: '8px',
            marginLeft: 'auto',
            userSelect: 'none',
          }}
          onClick={e => e.stopPropagation()}
        />
      </CustomDropDown>
    </ItemWrapper>
  );
};

export default Item;
