import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { Modal } from 'antd';

import { ExclamationCircleFilled } from '@ant-design/icons';
import actions from '@iso/vex_redux/roleOfUser/service/roleOfUser/actions';
import '@iso/cra/src/index.css';

import EditTemplate from '@iso/vex_components/ModalTemplate/EditTemplate';
import useRawFields from '../../hook/useRawFields';

const EditModal = () => {
  const { confirm } = Modal;
  const intl = useIntl();
  const dispatch = useDispatch();
  const { updateRoleOfUser } = actions;
  const [isAllowEdit, setIsAllowEdit] = useState(false);

  const { rawFields } = useRawFields();
  const viewedRoleOfUser = useSelector(
    state => state.roleOfUser.viewedRoleOfUser
  );
  //state
  function confirmEditRoleOfUserHandle() {
    const roleOfUserData = this;

    confirm({
      title: intl.formatMessage({ id: 'text.confirm.roleOfUserConfirmEdit' }),
      icon: <ExclamationCircleFilled />,
      content: intl.formatMessage({
        id: 'text.confirm.roleOfUserDescriptionEdit',
      }),
      okText: intl.formatMessage({ id: 'text.ok' }),
      cancelText: intl.formatMessage({ id: 'text.cancel' }),
      onOk() {
        dispatch(updateRoleOfUser(roleOfUserData));
      },
      onCancel() {},
    });
  }

  return (
    <React.Fragment>
      <EditTemplate
        titleModal={intl.formatMessage({ id: 'text.editRoleOfUser' })}
        isAllowEdit={isAllowEdit}
        confirmHandle={confirmEditRoleOfUserHandle}
        rawFields={rawFields}
        setIsAllowEdit={setIsAllowEdit}
        viewedData={viewedRoleOfUser}
      />
    </React.Fragment>
  );
};

export default EditModal;
