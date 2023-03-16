import React from 'react';
import { useIntl } from 'react-intl';

import { STRING, EMAIL } from '@iso/vex_containers/constants';

const useRawFields = () => {
  const intl = useIntl();
  //field texts
  const nameIntl = intl.formatMessage({ id: 'text.supplierName' });
  const agentNameIntl = intl.formatMessage({ id: 'text.supplierAgentName' });
  const addressIntl = intl.formatMessage({ id: 'text.supplierAddress' });
  const supplyTypeIntl = intl.formatMessage({ id: 'text.supplierSupplyType' });
  const additionalOptionIntl = intl.formatMessage({
    id: 'text.supplierAdditionalOption',
  });
  const phoneIntl = intl.formatMessage({ id: 'text.supplierPhone' });
  const emailIntl = intl.formatMessage({ id: 'text.supplierEmail' });

  const rawFields = {
    name: {
      type: STRING,
      validate: { required: true },
      intl: nameIntl,
    },
    agent_name: {
      type: STRING,
      validate: { required: true },
      intl: agentNameIntl,
    },
    address: {
      type: STRING,
      validate: { required: true },
      intl: addressIntl,
    },
    supply_type: {
      type: STRING,
      validate: { required: true },
      intl: supplyTypeIntl,
    },
    additional_option: {
      type: STRING,
      validate: null,
      intl: additionalOptionIntl,
    },
    phone: {
      type: STRING,
      validate: { required: true },
      intl: phoneIntl,
    },
    email: {
      type: EMAIL,
      validate: { required: true },
      intl: emailIntl,
    },
  };
  return { rawFields };
};

export default useRawFields;
