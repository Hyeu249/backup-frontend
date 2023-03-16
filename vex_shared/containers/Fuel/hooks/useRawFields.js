import React from 'react';
import { useIntl } from 'react-intl';

import { STRING } from '@iso/vex_containers/constants';

const useRawFields = () => {
  const intl = useIntl();
  //field texts
  const nameIntl = intl.formatMessage({
    id: 'text.fuelName',
  });

  const rawFields = {
    name: {
      type: STRING,
      validate: { required: true },
      intl: nameIntl,
    },
  };

  return { rawFields };
};

export default useRawFields;
