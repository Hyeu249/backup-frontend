import React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Modal } from 'antd';

import { ExclamationCircleFilled } from '@ant-design/icons';
import driverDocumentTypeActions from '@iso/vex_redux/driverDocumentType/actions';
import '@iso/cra/src/index.css';

import useRawFields from '../hook/useRawFields';
import ModalTemplate from '../../../components/ModalTemplate/ModalTemplate';

const CreateModal = ({ open, setOpen }) => {
  const { confirm } = Modal;
  const intl = useIntl();
  const { createDriverDocumentType } = driverDocumentTypeActions;

  const dispatch = useDispatch();
  const { rawFields } = useRawFields();

  //confirm and dispatch create driverDocumentType action
  function ConfirmCreateDriverDocumentTypeHandle() {
    const driverDocumentTypeData = this;

    confirm({
      title: intl.formatMessage({
        id: 'text.confirm.driverDocumentTypeConfirmCreate',
      }),
      icon: <ExclamationCircleFilled />,
      content: intl.formatMessage({
        id: 'text.confirm.driverDocumentTypeDescriptionCreate',
      }),
      okText: intl.formatMessage({ id: 'text.ok' }),
      cancelText: intl.formatMessage({ id: 'text.cancel' }),
      onOk() {
        dispatch(createDriverDocumentType(driverDocumentTypeData));
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
        titleModal={intl.formatMessage({ id: 'text.createDriverDocumentType' })}
        okModal={intl.formatMessage({ id: 'text.create' })}
        isAllowEdit={true}
        confirmHandle={ConfirmCreateDriverDocumentTypeHandle}
        rawFields={rawFields}
      />
    </React.Fragment>
  );
};

export default CreateModal;
