import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { Modal } from 'antd';

import { ExclamationCircleFilled } from '@ant-design/icons';
import driverDepositTypeActions from '@iso/vex_redux/driverDepositType/actions';
import '@iso/cra/src/index.css';
import { EDIT_MODAL } from '@iso/vex_containers/constants';

import ModalTemplate from '../../../components/ModalTemplate/ModalTemplate';
import useRawFields from '../hook/useRawFields';

const EditModal = ({ open, setOpen }) => {
  const { confirm } = Modal;
  const intl = useIntl();
  const dispatch = useDispatch();
  const { updateDriverDepositType, removeViewedDriverDepositType } =
    driverDepositTypeActions;
  const [isAllowEdit, setIsAllowEdit] = useState(false);

  const { rawFields } = useRawFields();
  const viewedDriverDepositType = useSelector(
    state => state.driverDepositType.viewedDriverDepositType
  );
  //state

  function ConfirmEditDriverDepositTypeHandle() {
    const driverDepositTypeData = this;

    confirm({
      title: intl.formatMessage({
        id: 'text.confirm.driverDepositTypeConfirmEdit',
      }),
      icon: <ExclamationCircleFilled />,
      content: intl.formatMessage({
        id: 'text.confirm.driverDepositTypeDescriptionEdit',
      }),
      okText: intl.formatMessage({ id: 'text.ok' }),
      cancelText: intl.formatMessage({ id: 'text.cancel' }),
      onOk() {
        dispatch(updateDriverDepositType(driverDepositTypeData));
      },
      onCancel() {
        setOpen(true);
      },
    });
  }

  const detailsTitle = intl.formatMessage({ id: 'text.details' });
  const editTitle = intl.formatMessage({ id: 'text.editDriverDepositType' });
  const titleModal = isAllowEdit ? editTitle : detailsTitle;
  return (
    <React.Fragment>
      <ModalTemplate
        open={open}
        setOpen={setOpen}
        titleModal={titleModal}
        okModal={intl.formatMessage({ id: 'text.edit' })}
        isAllowEdit={isAllowEdit}
        confirmHandle={ConfirmEditDriverDepositTypeHandle}
        rawFields={rawFields}
        //props for edit
        parentComponent={EDIT_MODAL}
        setIsAllowEdit={setIsAllowEdit}
        viewedData={viewedDriverDepositType}
        removeViewedData={removeViewedDriverDepositType}
      />
    </React.Fragment>
  );
};

export default EditModal;
