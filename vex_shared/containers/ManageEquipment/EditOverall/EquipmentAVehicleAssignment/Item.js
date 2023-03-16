import React from 'react';
import { useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';

import ImageDocumentIcon from '@iso/vex_config/icon/ImageDocumentIcon';
import actions from '@iso/vex_redux/equipment/service/equipmentAVehicleAssignment/actions';
import CustomDropDown from '@iso/vex_ui/CustomDropdown/CustomDropdown';
import ItemWrapper from '@iso/vex_lib/wraps/ItemWrapper';
import ThreeDotIcon from '@iso/vex_config/icon/ThreeDotIcon';

const Document = ({ data }) => {
  const font_name = `-apple-system,BlinkMacSystemFont,Avenir Next,Avenir,Segoe UI,Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol`;

  const intl = useIntl();
  const dispatch = useDispatch();
  const {
    deleteEquipmentAVehicleAssignment,
    approveEquipmentAVehicleAssignment,
  } = actions;
  const { id } = useParams();

  return (
    <ItemWrapper>
      <ImageDocumentIcon style={{ color: '#8279e3' }} />
      <div>
        <div
          style={{ color: '#262c2d', fontSize: '13px', fontFamily: font_name }}
        >
          {data.label}
        </div>
        <div
          style={{ fontSize: '12px', color: '#636f73', fontFamily: font_name }}
        >
          {`${intl.formatMessage({
            id: 'text.addedOn',
          })}: ${data.create_time}`}
        </div>
        <div
          style={{
            display: 'inline',
            fontSize: '10px',
            padding: '3px',
            backgroundColor: '#005073',
            borderRadius: '5px',
            color: '#ffffff',
          }}
        >
          {intl.formatMessage({ id: 'sidebar.driver' })}
        </div>
      </div>
      <CustomDropDown
        menu={[
          {
            title: intl.formatMessage({
              id: 'text.deleteEquipmentAVehicleAssignment',
            }),
            onClick: e =>
              dispatch(
                deleteEquipmentAVehicleAssignment({
                  id: data.id,
                  equipmentId: id,
                })
              ),
            Icon: <div style={{ color: '#636f73', marginLeft: '20px' }}></div>,
          },
          {
            title: intl.formatMessage({
              id: 'text.approve',
            }),
            onClick: e =>
              dispatch(
                approveEquipmentAVehicleAssignment({
                  id: data.id,
                  equipmentId: id,
                  is_approved: true,
                })
              ),
            Icon: <div style={{ color: '#636f73', marginLeft: '20px' }}></div>,
          },
          {
            title: intl.formatMessage({
              id: 'text.reject',
            }),
            onClick: e =>
              dispatch(
                approveEquipmentAVehicleAssignment({
                  id: data.id,
                  equipmentId: id,
                  is_approved: false,
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

export default Document;
