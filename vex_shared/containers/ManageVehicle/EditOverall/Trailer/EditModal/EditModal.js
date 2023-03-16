import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { Modal } from 'antd';
import { cloneDeep } from 'lodash';

import { ExclamationCircleFilled } from '@ant-design/icons';
import actions from '@iso/vex_redux/vehicle/service/trailer/actions';
import '@iso/cra/src/index.css';
import { EDIT_MODAL } from '@iso/vex_containers/constants';

import ModalTemplate from '@iso/vex_components/ModalTemplate/ModalTemplate';
import useRawFields from '../hook/useRawFields';

const EditModal = ({ open, setOpen }) => {
  const { confirm } = Modal;
  const intl = useIntl();
  const dispatch = useDispatch();
  const { updateTrailer, removeViewedTrailer } = actions;
  const [isAllowEdit, setIsAllowEdit] = useState(false);

  const { rawFields: raw } = useRawFields();
  const rawFields = cloneDeep(raw);
  const viewedTrailer = useSelector(state => state.vehicle.viewedTrailer);

  function confirmEditAssignmentHandle() {
    const trailerData = this;

    confirm({
      title: intl.formatMessage({
        id: 'text.confirm.trailerConfirmEdit',
      }),
      icon: <ExclamationCircleFilled />,
      content: intl.formatMessage({
        id: 'text.confirm.trailerDescriptionEdit',
      }),
      okText: intl.formatMessage({ id: 'text.ok' }),
      cancelText: intl.formatMessage({ id: 'text.cancel' }),
      onOk() {
        dispatch(updateTrailer(trailerData));
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
          id: 'text.editTrailer',
        })}
        okModal={intl.formatMessage({ id: 'text.edit' })}
        isAllowEdit={isAllowEdit}
        confirmHandle={confirmEditAssignmentHandle}
        rawFields={rawFields}
        //props for edit
        parentComponent={EDIT_MODAL}
        setIsAllowEdit={setIsAllowEdit}
        viewedData={viewedTrailer}
        removeViewedData={removeViewedTrailer}
      />
    </React.Fragment>
  );
};

export default EditModal;
