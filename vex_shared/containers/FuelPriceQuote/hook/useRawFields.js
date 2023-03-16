import React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { STRING, DATE, LIST, NUMBER } from '@iso/vex_containers/constants';

const useRawFields = () => {
  const intl = useIntl();
  const suppliers = useSelector(state => state.fuelPriceQuote.suppliers);
  const fuels = useSelector(state => state.fuelPriceQuote.fuels);
  const approverOptions = useSelector(
    state => state.fuelPriceQuote.approverOptions
  );

  //field texts
  const validFromIntl = intl.formatMessage({
    id: 'text.fuelPriceQuoteValidFrom',
  });
  const validUntilIntl = intl.formatMessage({
    id: 'text.fuelPriceQuoteValidUntil',
  });
  const supplierIdIntl = intl.formatMessage({
    id: 'text.fuelPriceQuoteSupplierId',
  });
  const fuelIdIntl = intl.formatMessage({
    id: 'text.fuelPriceQuoteFuelId',
  });
  const priceIntl = intl.formatMessage({
    id: 'text.fuelPriceQuotePrice',
  });
  const approverIdListIntl = intl.formatMessage({
    id: 'text.fuelPriceQuoteApproverIdList',
  });

  const rawFields = {
    valid_from: {
      type: DATE,
      validate: { required: true },
      intl: validFromIntl,
    },
    valid_until: {
      type: DATE,
      validate: { required: true },
      intl: validUntilIntl,
    },
    supplier_id: {
      type: STRING,
      validate: { required: true },
      intl: supplierIdIntl,
      fieldType: 'select',
      options: suppliers,
    },
    fuel_id: {
      type: STRING,
      validate: { required: true },
      intl: fuelIdIntl,
      fieldType: 'select',
      options: fuels,
    },
    price: {
      type: NUMBER,
      validate: { required: true },
      intl: priceIntl,
      inputType: 'number',
    },
    approver_id_list: {
      type: LIST,
      validate: { required: true },
      intl: approverIdListIntl,
      fieldType: 'multiple select',
      options: approverOptions,
      defaultValue: [],
    },
  };
  return { rawFields };
};

export default useRawFields;
