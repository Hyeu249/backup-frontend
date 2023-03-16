import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { Modal } from 'antd';

import { ExclamationCircleFilled } from '@ant-design/icons';
import actions from '@iso/vex_redux/supplierQuote/service/supplierQuote/actions';
import '@iso/cra/src/index.css';

import EditTemplate from '@iso/vex_components/ModalTemplate/EditTemplate';
import useRawFields from '../../hook/useRawFields';

const EditModal = () => {
  const { confirm } = Modal;
  const intl = useIntl();
  const dispatch = useDispatch();
  const { updateSupplierQuote } = actions;
  const [isAllowEdit, setIsAllowEdit] = useState(false);

  const { rawFields } = useRawFields();
  const viewedSupplierQuote = useSelector(
    state => state.supplierQuote.viewedSupplierQuote
  );
  //state
  function confirmEditSupplierQuoteHandle() {
    const supplierQuoteData = this;

    confirm({
      title: intl.formatMessage({
        id: 'text.confirm.supplierQuoteConfirmEdit',
      }),
      icon: <ExclamationCircleFilled />,
      content: intl.formatMessage({
        id: 'text.confirm.supplierQuoteDescriptionEdit',
      }),
      okText: intl.formatMessage({ id: 'text.ok' }),
      cancelText: intl.formatMessage({ id: 'text.cancel' }),
      onOk() {
        dispatch(updateSupplierQuote(supplierQuoteData));
      },
      onCancel() {},
    });
  }

  return (
    <React.Fragment>
      <EditTemplate
        titleModal={intl.formatMessage({ id: 'text.editSupplierQuote' })}
        isAllowEdit={isAllowEdit}
        confirmHandle={confirmEditSupplierQuoteHandle}
        rawFields={rawFields}
        setIsAllowEdit={setIsAllowEdit}
        viewedData={viewedSupplierQuote}
      />
    </React.Fragment>
  );
};

export default EditModal;
