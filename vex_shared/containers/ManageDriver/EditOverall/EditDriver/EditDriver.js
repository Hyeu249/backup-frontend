import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { Modal } from 'antd';

import { ExclamationCircleFilled } from '@ant-design/icons';
import actions from '@iso/vex_redux/driver/service/driver/actions';
import '@iso/cra/src/index.css';

import EditTemplate from '@iso/vex_components/ModalTemplate/EditTemplate';
import useRawFields from '../../hook/useRawFields';

const EditModal = () => {
  const { confirm } = Modal;
  const intl = useIntl();
  const dispatch = useDispatch();
  const { updateDriver } = actions;
  const [isAllowEdit, setIsAllowEdit] = useState(false);

  const { rawFields } = useRawFields();
  const viewedDriver = useSelector(state => state.driver.viewedDriver);
  //state
  function confirmEditDriverHandle() {
    const driverData = this;

    confirm({
      title: intl.formatMessage({ id: 'text.confirm.driverConfirmEdit' }),
      icon: <ExclamationCircleFilled />,
      content: intl.formatMessage({
        id: 'text.confirm.driverDescriptionEdit',
      }),
      okText: intl.formatMessage({ id: 'text.ok' }),
      cancelText: intl.formatMessage({ id: 'text.cancel' }),
      onOk() {
        dispatch(updateDriver(driverData));
      },
      onCancel() {},
    });
  }

  return (
    <React.Fragment>
      <EditTemplate
        titleModal={intl.formatMessage({ id: 'text.editDriver' })}
        isAllowEdit={isAllowEdit}
        confirmHandle={confirmEditDriverHandle}
        rawFields={rawFields}
        setIsAllowEdit={setIsAllowEdit}
        viewedData={viewedDriver}
      />
    </React.Fragment>
  );
};

export default EditModal;
