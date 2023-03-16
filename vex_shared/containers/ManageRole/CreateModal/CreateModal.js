import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Modal } from 'antd';
import '@iso/cra/src/index.css';

import { ExclamationCircleFilled } from '@ant-design/icons';
import actions from '@iso/vex_redux/role/service/role/actions';

import KeyFieldModalTemplate from '../KeyFieldModalTemplate';
import useRawFields from '../hook/useRawFields';

const CreateModal = ({ open, setOpen }) => {
  const { confirm } = Modal;
  const intl = useIntl();
  const { createRole } = actions;

  const dispatch = useDispatch();
  const { rawFields } = useRawFields();

  //confirm and dispatch create role action
  function confirmCreateRoleHandle() {
    const roleData = this;
    console.log('roleData', roleData);
    confirm({
      title: intl.formatMessage({ id: 'text.confirm.roleConfirmCreate' }),
      icon: <ExclamationCircleFilled />,
      content: intl.formatMessage({
        id: 'text.confirm.roleDescriptionCreate',
      }),
      okText: intl.formatMessage({ id: 'text.ok' }),
      cancelText: intl.formatMessage({ id: 'text.cancel' }),
      onOk() {
        dispatch(createRole(roleData));
      },
      onCancel() {
        setOpen(true);
      },
    });
  }

  return (
    <React.Fragment>
      <KeyFieldModalTemplate
        open={open}
        setOpen={setOpen}
        titleModal={intl.formatMessage({ id: 'text.createRole' })}
        okModal={intl.formatMessage({ id: 'text.create' })}
        isAllowEdit={true}
        confirmHandle={confirmCreateRoleHandle}
        rawFields={rawFields}
      />
    </React.Fragment>
  );
};

export default CreateModal;
