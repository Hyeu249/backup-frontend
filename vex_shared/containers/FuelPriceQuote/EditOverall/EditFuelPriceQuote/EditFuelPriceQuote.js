import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { Modal } from 'antd';

import { ExclamationCircleFilled } from '@ant-design/icons';
import actions from '@iso/vex_redux/fuelPriceQuote/service/fuelPriceQuote/actions';
import '@iso/cra/src/index.css';

import EditTemplate from '@iso/vex_components/ModalTemplate/EditTemplate';
import useRawFields from '../../hook/useRawFields';

const EditModal = () => {
  const { confirm } = Modal;
  const intl = useIntl();
  const dispatch = useDispatch();
  const { updateFuelPriceQuote } = actions;
  const [isAllowEdit, setIsAllowEdit] = useState(false);

  const { rawFields } = useRawFields();
  const viewedFuelPriceQuote = useSelector(
    state => state.fuelPriceQuote.viewedFuelPriceQuote
  );
  //state
  function confirmEditFuelPriceQuoteHandle() {
    const fuelPriceQuoteData = this;

    confirm({
      title: intl.formatMessage({
        id: 'text.confirm.fuelPriceQuoteConfirmEdit',
      }),
      icon: <ExclamationCircleFilled />,
      content: intl.formatMessage({
        id: 'text.confirm.fuelPriceQuoteDescriptionEdit',
      }),
      okText: intl.formatMessage({ id: 'text.ok' }),
      cancelText: intl.formatMessage({ id: 'text.cancel' }),
      onOk() {
        dispatch(updateFuelPriceQuote(fuelPriceQuoteData));
      },
      onCancel() {},
    });
  }

  return (
    <React.Fragment>
      <EditTemplate
        titleModal={intl.formatMessage({ id: 'text.editFuelPriceQuote' })}
        isAllowEdit={isAllowEdit}
        confirmHandle={confirmEditFuelPriceQuoteHandle}
        rawFields={rawFields}
        setIsAllowEdit={setIsAllowEdit}
        viewedData={viewedFuelPriceQuote}
      />
    </React.Fragment>
  );
};

export default EditModal;
