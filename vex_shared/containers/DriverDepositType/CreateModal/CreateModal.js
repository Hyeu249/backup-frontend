import React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Modal } from 'antd';

import { ExclamationCircleFilled } from '@ant-design/icons';
import driverDepositTypeActions from '@iso/vex_redux/driverDepositType/actions';
import '@iso/cra/src/index.css';

import useRawFields from '../hook/useRawFields';
import ModalTemplate from '../../../components/ModalTemplate/ModalTemplate';

const CreateModal = ({ open, setOpen }) => {
  const { confirm } = Modal;
  const intl = useIntl();
  const { createDriverDepositType } = driverDepositTypeActions;

  const dispatch = useDispatch();
  const { rawFields } = useRawFields();

  //confirm and dispatch create driverDepositType action
  function ConfirmCreateDriverDepositTypeHandle() {
    const driverDepositTypeData = this;

    confirm({
      title: intl.formatMessage({
        id: 'text.confirm.driverDepositTypeConfirmCreate',
      }),
      icon: <ExclamationCircleFilled />,
      content: intl.formatMessage({
        id: 'text.confirm.driverDepositTypeDescriptionCreate',
      }),
      okText: intl.formatMessage({ id: 'text.ok' }),
      cancelText: intl.formatMessage({ id: 'text.cancel' }),
      onOk() {
        // setOpen(false);
        dispatch(createDriverDepositType(driverDepositTypeData));
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
        titleModal={intl.formatMessage({ id: 'text.createDriverDepositType' })}
        okModal={intl.formatMessage({ id: 'text.create' })}
        isAllowEdit={true}
        confirmHandle={ConfirmCreateDriverDepositTypeHandle}
        rawFields={rawFields}
      />
    </React.Fragment>
  );
};

export default CreateModal;
