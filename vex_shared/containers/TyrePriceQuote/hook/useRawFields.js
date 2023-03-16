import React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { STRING, DATE, LIST, NUMBER } from '@iso/vex_containers/constants';

const useRawFields = () => {
  const intl = useIntl();
  const suppliers = useSelector(state => state.tyrePriceQuote.suppliers);
  const tyres = useSelector(state => state.tyrePriceQuote.tyres);
  const approverOptions = useSelector(
    state => state.tyrePriceQuote.approverOptions
  );

  //field texts

  const rawFields = {
    supplier_id: {
      type: STRING,
      validate: { required: true },
      intl: intl.formatMessage({
        id: 'text.tyrePriceQuoteSupplierId',
      }),
      fieldType: 'select',
      options: suppliers,
    },
    tyre_id: {
      type: STRING,
      validate: { required: true },
      intl: intl.formatMessage({
        id: 'text.tyrePriceQuoteTyreId',
      }),
      fieldType: 'select',
      options: tyres,
    },
    tyre_price: {
      type: NUMBER,
      validate: { required: true },
      intl: intl.formatMessage({
        id: 'text.tyrePriceQuoteTyrePrice',
      }),
      inputType: 'number',
    },
    labor_cost: {
      type: NUMBER,
      validate: { required: true },
      intl: intl.formatMessage({
        id: 'text.tyrePriceQuoteLaborCost',
      }),
      inputType: 'number',
    },
    valid_from: {
      type: DATE,
      validate: { required: true },
      intl: intl.formatMessage({
        id: 'text.tyrePriceQuoteValidFrom',
      }),
    },
    valid_until: {
      type: DATE,
      validate: { required: true },
      intl: intl.formatMessage({
        id: 'text.tyrePriceQuoteValidUntil',
      }),
    },
    approver_id_list: {
      type: LIST,
      validate: { required: true },
      intl: intl.formatMessage({
        id: 'text.tyrePriceQuoteApproverIdList',
      }),
      fieldType: 'multiple select',
      options: approverOptions,
      defaultValue: [],
    },
  };
  return { rawFields };
};

export default useRawFields;
