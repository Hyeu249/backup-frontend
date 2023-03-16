import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { Modal } from 'antd';

import { ExclamationCircleFilled } from '@ant-design/icons';
import actions from '@iso/vex_redux/tyrePriceQuote/service/tyrePriceQuote/actions';
import '@iso/cra/src/index.css';

import EditTemplate from '@iso/vex_components/ModalTemplate/EditTemplate';
import useRawFields from '../../hook/useRawFields';

const EditModal = () => {
  const { confirm } = Modal;
  const intl = useIntl();
  const dispatch = useDispatch();
  const { updateTyrePriceQuote } = actions;
  const [isAllowEdit, setIsAllowEdit] = useState(false);

  const { rawFields } = useRawFields();
  const viewedTyrePriceQuote = useSelector(
    state => state.tyrePriceQuote.viewedTyrePriceQuote
  );
  //state
  function confirmEditTyrePriceQuoteHandle() {
    const tyrePriceQuoteData = this;

    confirm({
      title: intl.formatMessage({
        id: 'text.confirm.tyrePriceQuoteConfirmEdit',
      }),
      icon: <ExclamationCircleFilled />,
      content: intl.formatMessage({
        id: 'text.confirm.tyrePriceQuoteDescriptionEdit',
      }),
      okText: intl.formatMessage({ id: 'text.ok' }),
      cancelText: intl.formatMessage({ id: 'text.cancel' }),
      onOk() {
        dispatch(updateTyrePriceQuote(tyrePriceQuoteData));
      },
      onCancel() {},
    });
  }

  return (
    <React.Fragment>
      <EditTemplate
        titleModal={intl.formatMessage({ id: 'text.editTyrePriceQuote' })}
        isAllowEdit={isAllowEdit}
        confirmHandle={confirmEditTyrePriceQuoteHandle}
        rawFields={rawFields}
        setIsAllowEdit={setIsAllowEdit}
        viewedData={viewedTyrePriceQuote}
      />
    </React.Fragment>
  );
};

export default EditModal;
