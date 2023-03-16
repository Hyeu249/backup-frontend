import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { Modal } from 'antd';

import { ExclamationCircleFilled } from '@ant-design/icons';
import actions from '@iso/vex_redux/tyreServiceRequest/service/tyreServiceRequest/actions';
import '@iso/cra/src/index.css';

import EditTemplate from '@iso/vex_components/ModalTemplate/EditTemplate';
import useRawFields from '../../hook/useRawFields';

const EditModal = () => {
  const { confirm } = Modal;
  const intl = useIntl();
  const dispatch = useDispatch();
  const { updateTyreServiceRequest } = actions;
  const [isAllowEdit, setIsAllowEdit] = useState(false);

  const { rawFields } = useRawFields();
  const viewedTyreServiceRequest = useSelector(
    state => state.tyreServiceRequest.viewedTyreServiceRequest
  );
  //state
  function confirmEditTyreServiceRequestHandle() {
    const tyreServiceRequestData = this;

    confirm({
      title: intl.formatMessage({
        id: 'text.confirm.tyreServiceRequestConfirmEdit',
      }),
      icon: <ExclamationCircleFilled />,
      content: intl.formatMessage({
        id: 'text.confirm.tyreServiceRequestDescriptionEdit',
      }),
      okText: intl.formatMessage({ id: 'text.ok' }),
      cancelText: intl.formatMessage({ id: 'text.cancel' }),
      onOk() {
        dispatch(updateTyreServiceRequest(tyreServiceRequestData));
      },
      onCancel() {},
    });
  }

  return (
    <React.Fragment>
      <EditTemplate
        titleModal={intl.formatMessage({ id: 'text.editTyreServiceRequest' })}
        isAllowEdit={isAllowEdit}
        confirmHandle={confirmEditTyreServiceRequestHandle}
        rawFields={rawFields}
        setIsAllowEdit={setIsAllowEdit}
        viewedData={viewedTyreServiceRequest}
      />
    </React.Fragment>
  );
};

export default EditModal;
