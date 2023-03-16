import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { Modal } from 'antd';

import { ExclamationCircleFilled } from '@ant-design/icons';
import actions from '@iso/vex_redux/serviceRequest/service/serviceRequest/actions';
import '@iso/cra/src/index.css';

import EditTemplate from '@iso/vex_components/ModalTemplate/EditTemplate';
import useRawFields from '../../hook/useRawFields';

const EditModal = () => {
  const { confirm } = Modal;
  const intl = useIntl();
  const dispatch = useDispatch();
  const { updateServiceRequest } = actions;
  const [isAllowEdit, setIsAllowEdit] = useState(false);

  const { rawFields } = useRawFields();
  const viewedServiceRequest = useSelector(
    state => state.serviceRequest.viewedServiceRequest
  );
  //state
  function confirmEditServiceRequestHandle() {
    const serviceRequestData = this;

    confirm({
      title: intl.formatMessage({
        id: 'text.confirm.serviceRequestConfirmEdit',
      }),
      icon: <ExclamationCircleFilled />,
      content: intl.formatMessage({
        id: 'text.confirm.serviceRequestDescriptionEdit',
      }),
      okText: intl.formatMessage({ id: 'text.ok' }),
      cancelText: intl.formatMessage({ id: 'text.cancel' }),
      onOk() {
        dispatch(updateServiceRequest(serviceRequestData));
      },
      onCancel() {},
    });
  }

  return (
    <React.Fragment>
      <EditTemplate
        titleModal={intl.formatMessage({ id: 'text.editServiceRequest' })}
        isAllowEdit={isAllowEdit}
        confirmHandle={confirmEditServiceRequestHandle}
        rawFields={rawFields}
        setIsAllowEdit={setIsAllowEdit}
        viewedData={viewedServiceRequest}
      />
    </React.Fragment>
  );
};

export default EditModal;
