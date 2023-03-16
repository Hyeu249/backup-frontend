import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Modal } from 'antd';
import '@iso/cra/src/index.css';

import { ExclamationCircleFilled } from '@ant-design/icons';
import actions from '@iso/vex_redux/fuelPriceQuote/service/fuelPriceQuote/actions';

import ModalTemplate from '@iso/vex_components/ModalTemplate/ModalTemplate';
import useRawFields from '../hook/useRawFields';

const CreateModal = ({ open, setOpen }) => {
  const { confirm } = Modal;
  const intl = useIntl();
  const { createFuelPriceQuote } = actions;

  const dispatch = useDispatch();
  const { rawFields } = useRawFields();

  //confirm and dispatch create fuelPriceQuote action
  function confirmCreateFuelPriceQuoteHandle() {
    const fuelPriceQuoteData = this;
    console.log('fuelPriceQuoteData', fuelPriceQuoteData);
    confirm({
      title: intl.formatMessage({
        id: 'text.confirm.fuelPriceQuoteConfirmCreate',
      }),
      icon: <ExclamationCircleFilled />,
      content: intl.formatMessage({
        id: 'text.confirm.fuelPriceQuoteDescriptionCreate',
      }),
      okText: intl.formatMessage({ id: 'text.ok' }),
      cancelText: intl.formatMessage({ id: 'text.cancel' }),
      onOk() {
        dispatch(createFuelPriceQuote(fuelPriceQuoteData));
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
        titleModal={intl.formatMessage({ id: 'text.createFuelPriceQuote' })}
        okModal={intl.formatMessage({ id: 'text.create' })}
        isAllowEdit={true}
        confirmHandle={confirmCreateFuelPriceQuoteHandle}
        rawFields={rawFields}
      />
    </React.Fragment>
  );
};

export default CreateModal;
