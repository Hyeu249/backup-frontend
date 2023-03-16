import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { Modal } from 'antd';

import { ExclamationCircleFilled } from '@ant-design/icons';
import actions from '@iso/vex_redux/fuelRequest/service/fuelRequest/actions';
import '@iso/cra/src/index.css';

import EditTemplate from '@iso/vex_components/ModalTemplate/EditTemplate';
import useRawFields from '../../hook/useRawFields';

const EditModal = () => {
  const { confirm } = Modal;
  const intl = useIntl();
  const dispatch = useDispatch();
  const { updateFuelRequest } = actions;
  const [isAllowEdit, setIsAllowEdit] = useState(false);

  const { rawFields } = useRawFields();
  const viewedFuelRequest = useSelector(
    state => state.fuelRequest.viewedFuelRequest
  );
  //state
  function confirmEditFuelRequestHandle() {
    const fuelRequestData = this;

    confirm({
      title: intl.formatMessage({ id: 'text.confirm.fuelRequestConfirmEdit' }),
      icon: <ExclamationCircleFilled />,
      content: intl.formatMessage({
        id: 'text.confirm.fuelRequestDescriptionEdit',
      }),
      okText: intl.formatMessage({ id: 'text.ok' }),
      cancelText: intl.formatMessage({ id: 'text.cancel' }),
      onOk() {
        dispatch(updateFuelRequest(fuelRequestData));
      },
      onCancel() {},
    });
  }

  return (
    <React.Fragment>
      <EditTemplate
        titleModal={intl.formatMessage({ id: 'text.editFuelRequest' })}
        isAllowEdit={isAllowEdit}
        confirmHandle={confirmEditFuelRequestHandle}
        rawFields={rawFields}
        setIsAllowEdit={setIsAllowEdit}
        viewedData={viewedFuelRequest}
      />
    </React.Fragment>
  );
};

export default EditModal;
