import React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { STRING, DATE } from '@iso/vex_containers/constants';

const useRawFields = () => {
  const intl = useIntl();
  const supplierQuoteOptions = useSelector(
    state => state.equipmentServiceRequest.supplierQuoteOptions
  );

  const rawFields = {
    supplier_quote_id: {
      type: STRING,
      validate: { required: true },
      intl: intl.formatMessage({
        id: 'text.equipmentServiceRequestSupplierQuote',
      }),
      fieldType: 'select',
      options: supplierQuoteOptions,
    },
    planned_service_time: {
      type: DATE,
      validate: { required: true },
      intl: intl.formatMessage({
        id: 'text.equipmentServiceRequestPlannedServiceTime',
      }),
    },
    actual_service_time: {
      type: DATE,
      validate: { required: true },
      intl: intl.formatMessage({
        id: 'text.equipmentServiceRequestActualServiceTime',
      }),
    },
  };
  return { rawFields };
};

export default useRawFields;
