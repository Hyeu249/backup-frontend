import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Modal } from 'antd';
import '@iso/cra/src/index.css';

import { ExclamationCircleFilled } from '@ant-design/icons';
import actions from '@iso/vex_redux/tyrePriceQuote/service/tyrePriceQuote/actions';

import ModalTemplate from '@iso/vex_components/ModalTemplate/ModalTemplate';
import useRawFields from '../hook/useRawFields';

const CreateModal = ({ open, setOpen }) => {
  const { confirm } = Modal;
  const intl = useIntl();
  const { createTyrePriceQuote } = actions;

  const dispatch = useDispatch();
  const { rawFields } = useRawFields();

  //confirm and dispatch create tyrePriceQuote action
  function confirmCreateTyrePriceQuoteHandle() {
    const tyrePriceQuoteData = this;
    console.log('tyrePriceQuoteData', tyrePriceQuoteData);
    confirm({
      title: intl.formatMessage({
        id: 'text.confirm.tyrePriceQuoteConfirmCreate',
      }),
      icon: <ExclamationCircleFilled />,
      content: intl.formatMessage({
        id: 'text.confirm.tyrePriceQuoteDescriptionCreate',
      }),
      okText: intl.formatMessage({ id: 'text.ok' }),
      cancelText: intl.formatMessage({ id: 'text.cancel' }),
      onOk() {
        dispatch(createTyrePriceQuote(tyrePriceQuoteData));
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
        titleModal={intl.formatMessage({ id: 'text.createTyrePriceQuote' })}
        okModal={intl.formatMessage({ id: 'text.create' })}
        isAllowEdit={true}
        confirmHandle={confirmCreateTyrePriceQuoteHandle}
        rawFields={rawFields}
      />
    </React.Fragment>
  );
};

export default CreateModal;
