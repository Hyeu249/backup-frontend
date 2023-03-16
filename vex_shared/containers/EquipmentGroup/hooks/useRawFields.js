import React from 'react';
import { useIntl } from 'react-intl';

import { STRING } from '@iso/vex_containers/constants';

const useRawFields = () => {
  const intl = useIntl();
  //field texts
  const nameIntl = intl.formatMessage({
    id: 'text.equipmentGroupName',
  });
  const descriptionIntl = intl.formatMessage({
    id: 'text.equipmentGroupDescription',
  });

  const rawFields = {
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
