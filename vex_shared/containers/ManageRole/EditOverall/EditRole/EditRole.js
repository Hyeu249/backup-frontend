import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { Modal } from 'antd';

import { ExclamationCircleFilled } from '@ant-design/icons';
import actions from '@iso/vex_redux/role/service/role/actions';
import '@iso/cra/src/index.css';

import EditTemplate from '@iso/vex_components/ModalTemplate/EditTemplate';
import useRawFields from '../../hook/useRawFields';

const EditModal = () => {
  const { confirm } = Modal;
  const intl = useIntl();
  const dispatch = useDispatch();
  const { updateRole } = actions;
  const [isAllowEdit, setIsAllowEdit] = useState(false);

  const { rawFields } = useRawFields();
  const viewedRole = useSelector(state => state.role.viewedRole);
  //state
  function confirmEditRoleHandle() {
    const roleData = this;

    confirm({
      title: intl.formatMessage({ id: 'text.confirm.roleConfirmEdit' }),
      icon: <ExclamationCircleFilled />,
      content: intl.formatMessage({
        id: 'text.confirm.roleDescriptionEdit',
      }),
      okText: intl.formatMessage({ id: 'text.ok' }),
      cancelText: intl.formatMessage({ id: 'text.cancel' }),
      onOk() {
        dispatch(updateRole(roleData));
      },
      onCancel() {},
    });
  }

  return (
    <React.Fragment>
      <EditTemplate
        titleModal={intl.formatMessage({ id: 'text.editRole' })}
        isAllowEdit={isAllowEdit}
        confirmHandle={confirmEditRoleHandle}
        rawFields={rawFields}
        setIsAllowEdit={setIsAllowEdit}
        viewedData={viewedRole}
      />
    </React.Fragment>
  );
};

export default EditModal;
