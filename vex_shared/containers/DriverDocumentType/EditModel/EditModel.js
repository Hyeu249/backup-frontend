import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { Modal } from 'antd';

import { ExclamationCircleFilled } from '@ant-design/icons';
import driverDocumentTypeActions from '@iso/vex_redux/driverDocumentType/actions';
import '@iso/cra/src/index.css';
import { EDIT_MODAL } from '@iso/vex_containers/constants';

import ModalTemplate from '../../../components/ModalTemplate/ModalTemplate';
import useRawFields from '../hook/useRawFields';

const EditModal = ({ open, setOpen }) => {
  const { confirm } = Modal;
  const intl = useIntl();
  const dispatch = useDispatch();
  const { updateDriverDocumentType, removeViewedDriverDocumentType } =
    driverDocumentTypeActions;
  const [isAllowEdit, setIsAllowEdit] = useState(false);

  const { rawFields } = useRawFields();
  const viewedDriverDocumentType = useSelector(
    state => state.driverDocumentType.viewedDriverDocumentType
  );
  //state

  function ConfirmEditDriverDocumentTypeHandle() {
    const driverDocumentTypeData = this;

    confirm({
      title: intl.formatMessage({
        id: 'text.confirm.driverDocumentTypeConfirmEdit',
      }),
      icon: <ExclamationCircleFilled />,
      content: intl.formatMessage({
        id: 'text.confirm.driverDocumentTypeDescriptionEdit',
      }),
      okText: intl.formatMessage({ id: 'text.ok' }),
      cancelText: intl.formatMessage({ id: 'text.cancel' }),
      onOk() {
        dispatch(updateDriverDocumentType(driverDocumentTypeData));
      },
      onCancel() {
        setOpen(true);
      },
    });
  }

  const detailsTitle = intl.formatMessage({ id: 'text.details' });
  const editTitle = intl.formatMessage({ id: 'text.editDriverDocumentType' });
  const titleModal = isAllowEdit ? editTitle : detailsTitle;
  return (
    <React.Fragment>
      <ModalTemplate
        open={open}
        setOpen={setOpen}
        titleModal={titleModal}
        okModal={intl.formatMessage({ id: 'text.edit' })}
        isAllowEdit={isAllowEdit}
        confirmHandle={ConfirmEditDriverDocumentTypeHandle}
        rawFields={rawFields}
        //props for edit
        parentComponent={EDIT_MODAL}
        setIsAllowEdit={setIsAllowEdit}
        viewedData={viewedDriverDocumentType}
        removeViewedData={removeViewedDriverDocumentType}
      />
    </React.Fragment>
  );
};

export default EditModal;
