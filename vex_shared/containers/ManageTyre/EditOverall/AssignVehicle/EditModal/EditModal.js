import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { Modal } from 'antd';
import { cloneDeep } from 'lodash';

import { ExclamationCircleFilled } from '@ant-design/icons';
import actions from '@iso/vex_redux/tyre/service/assignment/actions';
import '@iso/cra/src/index.css';
import { EDIT_MODAL } from '@iso/vex_containers/constants';

import ModalTemplate from '@iso/vex_components/ModalTemplate/ModalTemplate';
import useRawFields from '../hook/useRawFields';

const EditModal = ({ open, setOpen }) => {
  const { confirm } = Modal;
  const intl = useIntl();
  const dispatch = useDispatch();
  const { updateAssignment, removeViewedAssignment } = actions;
  const [isAllowEdit, setIsAllowEdit] = useState(false);

  const { rawFields: raw } = useRawFields();
  const rawFields = cloneDeep(raw);
  rawFields.approver_id_list.disabled = true;
  const viewedAssignment = useSelector(state => state.tyre.viewedAssignment);

  function confirmEditAssignmentHandle() {
    const assignmentData = this;

    confirm({
      title: intl.formatMessage({
        id: 'text.confirm.assignTyreConfirmEdit',
      }),
      icon: <ExclamationCircleFilled />,
      content: intl.formatMessage({
        id: 'text.confirm.assignTyreDescriptionEdit',
      }),
      okText: intl.formatMessage({ id: 'text.ok' }),
      cancelText: intl.formatMessage({ id: 'text.cancel' }),
      onOk() {
        dispatch(updateAssignment(assignmentData));
      },
      onCancel() {},
    });
  }

  return (
    <React.Fragment>
      <ModalTemplate
        open={open}
        setOpen={setOpen}
        titleModal={intl.formatMessage({
          id: 'text.editTyreVehicleAssignment',
        })}
        okModal={intl.formatMessage({ id: 'text.edit' })}
        isAllowEdit={isAllowEdit}
        confirmHandle={confirmEditAssignmentHandle}
        rawFields={rawFields}
        //props for edit
        parentComponent={EDIT_MODAL}
        setIsAllowEdit={setIsAllowEdit}
        viewedData={viewedAssignment}
        removeViewedData={removeViewedAssignment}
      />
    </React.Fragment>
  );
};

export default EditModal;
