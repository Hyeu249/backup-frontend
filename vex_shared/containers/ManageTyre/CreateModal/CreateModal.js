import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Modal } from 'antd';
import '@iso/cra/src/index.css';

import { ExclamationCircleFilled } from '@ant-design/icons';
import actions from '@iso/vex_redux/tyre/service/tyre/actions';

import ModalTemplate from '@iso/vex_components/ModalTemplate/ModalTemplate';
import useRawFields from '../hook/useRawFields';

const CreateModal = ({ open, setOpen }) => {
  const { confirm } = Modal;
  const intl = useIntl();
  const { createTyre } = actions;

  const dispatch = useDispatch();
  const { rawFields } = useRawFields();

  //confirm and dispatch create tyre action
  function confirmCreateTyreHandle() {
    const tyreData = this;

    confirm({
      title: intl.formatMessage({ id: 'text.confirmCreateTyre' }),
      icon: <ExclamationCircleFilled />,
      content: intl.formatMessage({
        id: 'text.confirm.descriptionCreateTyre',
      }),
      okText: intl.formatMessage({ id: 'text.ok' }),
      cancelText: intl.formatMessage({ id: 'text.cancel' }),
      onOk() {
        dispatch(createTyre(tyreData));
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
        titleModal={intl.formatMessage({ id: 'text.createTyre' })}
        okModal={intl.formatMessage({ id: 'text.create' })}
        isAllowEdit={true}
        confirmHandle={confirmCreateTyreHandle}
        rawFields={rawFields}
      />
    </React.Fragment>
  );
};

export default CreateModal;
