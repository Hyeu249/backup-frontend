import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { Modal } from 'antd';

import { ExclamationCircleFilled } from '@ant-design/icons';
import actions from '@iso/vex_redux/equipmentServiceRequest/service/equipmentServiceRequest/actions';
import '@iso/cra/src/index.css';

import EditTemplate from '@iso/vex_components/ModalTemplate/EditTemplate';
import useRawFields from '../../hook/useRawFields';

const EditModal = () => {
  const { confirm } = Modal;
  const intl = useIntl();
  const dispatch = useDispatch();
  const { updateEquipmentServiceRequest } = actions;
  const [isAllowEdit, setIsAllowEdit] = useState(false);

  const { rawFields } = useRawFields();
  const viewedEquipmentServiceRequest = useSelector(
    state => state.equipmentServiceRequest.viewedEquipmentServiceRequest
  );
  //state
  function confirmEditEquipmentServiceRequestHandle() {
    const equipmentServiceRequestData = this;

    confirm({
      title: intl.formatMessage({
        id: 'text.confirm.equipmentServiceRequestConfirmEdit',
      }),
      icon: <ExclamationCircleFilled />,
      content: intl.formatMessage({
        id: 'text.confirm.equipmentServiceRequestDescriptionEdit',
      }),
      okText: intl.formatMessage({ id: 'text.ok' }),
      cancelText: intl.formatMessage({ id: 'text.cancel' }),
      onOk() {
        dispatch(updateEquipmentServiceRequest(equipmentServiceRequestData));
      },
      onCancel() {},
    });
  }

  return (
    <React.Fragment>
      <EditTemplate
        titleModal={intl.formatMessage({
          id: 'text.editEquipmentServiceRequest',
        })}
        isAllowEdit={isAllowEdit}
        confirmHandle={confirmEditEquipmentServiceRequestHandle}
        rawFields={rawFields}
        setIsAllowEdit={setIsAllowEdit}
        viewedData={viewedEquipmentServiceRequest}
      />
    </React.Fragment>
  );
};

export default EditModal;
