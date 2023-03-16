import React from 'react';
import { useIntl } from 'react-intl';

import { STRING } from '@iso/vex_containers/constants';

const useRawFields = () => {
  const intl = useIntl();
  //field texts
  const nameIntl = intl.formatMessage({
    id: 'text.assetWarehouseName',
  });
  const descriptionIntl = intl.formatMessage({
    id: 'text.assetWarehouseDescription',
  });

  const rawFields = {
    id: {
      type: STRING,
      validate: { required: false },
      intl: intl.formatMessage({ id: 'text.id' }),
      disabled: true,
    },
    name: {
      type: STRING,
      validate: { required: true },
      intl: nameIntl,
    },
    description: {
      type: STRING,
      validate: null,
      intl: descriptionIntl,
    },
  };

  return { rawFields };
};

export default useRawFields;
