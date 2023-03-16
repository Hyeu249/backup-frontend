import React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Modal } from 'antd';

import { ExclamationCircleFilled } from '@ant-design/icons';
import equipmentGroupActions from '@iso/vex_redux/equipmentGroup/actions';
import '@iso/cra/src/index.css';

import useRawFields from '../hooks/useRawFields';
import ModalTemplate from '../../../components/ModalTemplate/ModalTemplate';

const CreateModal = ({ open, setOpen }) => {
  const { confirm } = Modal;
  const intl = useIntl();
  const { createEquipmentGroup } = equipmentGroupActions;

  const dispatch = useDispatch();
  const { rawFields } = useRawFields();

  //confirm and dispatch create equipmentGroup action
  function ConfirmCreateEquipmentGroupHandle() {
    const equipmentGroupData = this;

    confirm({
      title: intl.formatMessage({
        id: 'text.confirm.equipmentGroupConfirmCreate',
      }),
      icon: <ExclamationCircleFilled />,
      content: intl.formatMessage({
        id: 'text.confirm.equipmentGroupDescriptionCreate',
      }),
      okText: intl.formatMessage({ id: 'text.ok' }),
      cancelText: intl.formatMessage({ id: 'text.cancel' }),
      onOk() {
        dispatch(createEquipmentGroup(equipmentGroupData));
      },
      onCancel() {
        setOpen(true);
      },
    });
  }

  return (
    <React.Fragment>
      <ModalTemplate
        open={open}
        setOpen={setOpen}
        titleModal={intl.formatMessage({ id: 'text.createEquipmentGroup' })}
        okModal={intl.formatMessage({ id: 'text.create' })}
        isAllowEdit={true}
        confirmHandle={ConfirmCreateEquipmentGroupHandle}
        rawFields={rawFields}
      />
    </React.Fragment>
  );
};

export default CreateModal;
