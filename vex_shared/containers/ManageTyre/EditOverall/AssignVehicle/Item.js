import React from 'react';
import { useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';

import ImageDocumentIcon from '@iso/vex_config/icon/ImageDocumentIcon';
import actions from '@iso/vex_redux/tyre/service/assignment/actions';
import CustomDropDown from '@iso/vex_ui/CustomDropdown/CustomDropdown';

import ItemWrapper from '@iso/vex_lib/wraps/ItemWrapper';
import ThreeDotIcon from '@iso/vex_config/icon/ThreeDotIcon';

const Item = ({ data, setEditOpen }) => {
  const font_name = `-apple-system,BlinkMacSystemFont,Avenir Next,Avenir,Segoe UI,Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol`;

  const intl = useIntl();
  const dispatch = useDispatch();
  const {
    setViewedAssignment,
    deleteAssignment,
    approveVehicleTyreAssignment,
  } = actions;

  const approver_list = data.approver_list;
  const approverLength = approver_list.length;
  const approverSuccessLength = approver_list.filter(
    a => a.approval_status == 'APPROVED'
  ).length;
  const approverSuccessful = approverSuccessLength === approverLength;

  return (
    <ItemWrapper
      onClick={() => {
        dispatch(setViewedAssignment({ id: data.id, setOpen: setEditOpen }));
      }}
      style={{ backgroundColor: approverSuccessful ? '#e4f4ff' : '' }}
    >
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
          Added on: {data.create_time}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {approver_list.map(approver => {
            return <Approver key={approver.user_id} approver={approver} />;
          })}
        </div>
      </div>
      <CustomDropDown
        menu={[
          {
            title: intl.formatMessage({
              id: 'text.deleteAssignment',
            }),
            onClick: e => dispatch(deleteAssignment(data.id)),
            Icon: <div style={{ color: '#636f73', marginLeft: '20px' }}></div>,
          },
          {
            title: intl.formatMessage({
              id: 'text.approveVehicleTyreAssignment',
            }),
            onClick: e => dispatch(approveVehicleTyreAssignment(data.id)),
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

function Approver({ approver }) {
  const approved = approver.approval_status == 'APPROVED';

  return (
    <div
      style={{
        display: 'inline',
        margin: '5px 5px 0px 0px',
        fontSize: '10px',
        padding: '3px',
        backgroundColor: approved ? 'var(--valid-bg)' : 'var(--unvalid-bg)',
        borderRadius: '5px',
        color: '#ffffff',
      }}
    >
      {`${approver.last_name} ${approver.first_name}`}
    </div>
  );
}
