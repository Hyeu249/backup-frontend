import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { Modal } from 'antd';

import { ExclamationCircleFilled } from '@ant-design/icons';
import fuelActions from '@iso/vex_redux/fuel/actions';
import '@iso/cra/src/index.css';
import { EDIT_MODAL } from '@iso/vex_containers/constants';

import ModalTemplate from '../../../components/ModalTemplate/ModalTemplate';
import useRawFields from '../hooks/useRawFields';

const EditModal = ({ open, setOpen }) => {
  const { confirm } = Modal;
  const intl = useIntl();
  const dispatch = useDispatch();
  const { updateFuel, removeViewedFuel } = fuelActions;
  const [isAllowEdit, setIsAllowEdit] = useState(false);

  const { rawFields } = useRawFields();
  const viewedFuel = useSelector(state => state.fuel.viewedFuel);
  //state

  function ConfirmEditFuelHandle() {
    const fuelData = this;

    confirm({
      title: intl.formatMessage({
        id: 'text.confirm.fuelConfirmEdit',
      }),
      icon: <ExclamationCircleFilled />,
      content: intl.formatMessage({
        id: 'text.confirm.fuelDescriptionEdit',
      }),
      okText: intl.formatMessage({ id: 'text.ok' }),
      cancelText: intl.formatMessage({ id: 'text.cancel' }),
      onOk() {
        dispatch(updateFuel(fuelData));
      },
      onCancel() {
        setOpen(true);
      },
    });
  }

  const detailsTitle = intl.formatMessage({ id: 'text.details' });
  const editTitle = intl.formatMessage({ id: 'text.editFuel' });
  const titleModal = isAllowEdit ? editTitle : detailsTitle;
  return (
    <React.Fragment>
      <ModalTemplate
        open={open}
        setOpen={setOpen}
        titleModal={titleModal}
        okModal={intl.formatMessage({ id: 'text.edit' })}
        isAllowEdit={isAllowEdit}
        confirmHandle={ConfirmEditFuelHandle}
        rawFields={rawFields}
        //props for edit
        parentComponent={EDIT_MODAL}
        setIsAllowEdit={setIsAllowEdit}
        viewedData={viewedFuel}
        removeViewedData={removeViewedFuel}
      />
    </React.Fragment>
  );
};

export default EditModal;
