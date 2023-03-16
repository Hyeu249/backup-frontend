import React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { STRING, DATE } from '@iso/vex_containers/constants';

const useRawFields = () => {
  const intl = useIntl();
  const tyrePriceQuotes = useSelector(
    state => state.tyreServiceRequest.tyrePriceQuotes
  );

  const rawFields = {
    tyre_price_quote_id: {
      type: STRING,
      validate: { required: true },
      intl: intl.formatMessage({ id: 'text.tyreServiceTyrePriceQuote' }),
      fieldType: 'select',
      options: tyrePriceQuotes,
    },
    planned_service_time: {
      type: DATE,
      validate: { required: true },
      intl: intl.formatMessage({
        id: 'text.tyreServiceRequestPlannedServiceTime',
      }),
    },
    actual_service_time: {
      type: DATE,
      validate: { required: true },
      intl: intl.formatMessage({
        id: 'text.tyreServiceRequestActualServiceTime',
      }),
    },
  };
  return { rawFields };
};

export default useRawFields;
