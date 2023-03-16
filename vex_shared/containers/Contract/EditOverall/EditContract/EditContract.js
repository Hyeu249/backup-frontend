import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { Modal } from 'antd';

import { ExclamationCircleFilled } from '@ant-design/icons';
import actions from '@iso/vex_redux/contract/service/contract/actions';
import '@iso/cra/src/index.css';

import EditTemplate from '@iso/vex_components/ModalTemplate/EditTemplate';
import useRawFields from '../../hook/useRawFields';

const EditModal = () => {
  const { confirm } = Modal;
  const intl = useIntl();
  const dispatch = useDispatch();
  const { updateContract } = actions;
  const [isAllowEdit, setIsAllowEdit] = useState(false);

  const { rawFields } = useRawFields();
  const viewedContract = useSelector(state => state.contract.viewedContract);
  //state
  function confirmEditContractHandle() {
    const contractData = this;

    confirm({
      title: intl.formatMessage({ id: 'text.confirm.contractConfirmEdit' }),
      icon: <ExclamationCircleFilled />,
      content: intl.formatMessage({
        id: 'text.confirm.contractDescriptionEdit',
      }),
      okText: intl.formatMessage({ id: 'text.ok' }),
      cancelText: intl.formatMessage({ id: 'text.cancel' }),
      onOk() {
        dispatch(updateContract(contractData));
      },
      onCancel() {},
    });
  }

  return (
    <React.Fragment>
      <EditTemplate
        titleModal={intl.formatMessage({ id: 'text.editContract' })}
        isAllowEdit={isAllowEdit}
        confirmHandle={confirmEditContractHandle}
        rawFields={rawFields}
        setIsAllowEdit={setIsAllowEdit}
        viewedData={viewedContract}
      />
    </React.Fragment>
  );
};

export default EditModal;
