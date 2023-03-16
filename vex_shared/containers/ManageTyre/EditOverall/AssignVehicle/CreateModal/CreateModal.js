import React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Modal } from 'antd';
import '@iso/cra/src/index.css';

import { ExclamationCircleFilled } from '@ant-design/icons';
import actions from '@iso/vex_redux/tyre/service/assignment/actions';

import ModalTemplate from '@iso/vex_components/ModalTemplate/ModalTemplate';
import useRawFields from '../hook/useRawFields';

const CreateModal = ({ open, setOpen }) => {
  const { confirm } = Modal;
  const intl = useIntl();
  const { createAssignTyre } = actions;

  const dispatch = useDispatch();
  const { rawFields } = useRawFields();

  //confirm and dispatch create assignAssignTyre action
  function confirmCreateAssignTyreHandle() {
    const assignAssignTyreData = this;

    confirm({
      title: intl.formatMessage({ id: 'text.confirm.assignTyreConfirmCreate' }),
      icon: <ExclamationCircleFilled />,
      content: intl.formatMessage({
        id: 'text.confirm.assignTyreDescriptionCreate',
      }),
      okText: intl.formatMessage({ id: 'text.ok' }),
      cancelText: intl.formatMessage({ id: 'text.cancel' }),
      onOk() {
        dispatch(createAssignTyre(assignAssignTyreData));
      },
      onCancel() {},
    });
  }

  return (
    <React.Fragment>
      <ModalTemplate
        open={open}
        setOpen={setOpen}
        titleModal={intl.formatMessage({ id: 'text.createAssignTyre' })}
        okModal={intl.formatMessage({ id: 'text.create' })}
        isAllowEdit={true}
        confirmHandle={confirmCreateAssignTyreHandle}
        rawFields={rawFields}
      />
    </React.Fragment>
  );
};

export default CreateModal;
