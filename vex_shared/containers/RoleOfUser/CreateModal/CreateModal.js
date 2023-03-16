import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Modal } from 'antd';
import '@iso/cra/src/index.css';

import { ExclamationCircleFilled } from '@ant-design/icons';
import actions from '@iso/vex_redux/roleOfUser/service/roleOfUser/actions';

import ModalTemplate from '@iso/vex_components/ModalTemplate/ModalTemplate';
import useRawFields from '../hook/useRawFields';

const CreateModal = ({ open, setOpen }) => {
  const { confirm } = Modal;
  const intl = useIntl();
  const { createRoleOfUser } = actions;

  const dispatch = useDispatch();
  const { rawFields } = useRawFields();

  //confirm and dispatch create roleOfUser action
  function confirmCreateRoleOfUserHandle() {
    const roleOfUserData = this;
    console.log('roleOfUserData', roleOfUserData);
    confirm({
      title: intl.formatMessage({ id: 'text.confirm.roleOfUserConfirmCreate' }),
      icon: <ExclamationCircleFilled />,
      content: intl.formatMessage({
        id: 'text.confirm.roleOfUserDescriptionCreate',
      }),
      okText: intl.formatMessage({ id: 'text.ok' }),
      cancelText: intl.formatMessage({ id: 'text.cancel' }),
      onOk() {
        dispatch(createRoleOfUser(roleOfUserData));
      },
      onCancel() {
        setOpen(true);
      },
    });
  }

  return (
    <React.Fragment>
      <ModalTemplate
        open={open}
        setOpen={setOpen}
        titleModal={intl.formatMessage({ id: 'text.createRoleOfUser' })}
        okModal={intl.formatMessage({ id: 'text.create' })}
        isAllowEdit={true}
        confirmHandle={confirmCreateRoleOfUserHandle}
        rawFields={rawFields}
      />
    </React.Fragment>
  );
};

export default CreateModal;
