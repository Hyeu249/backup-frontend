import React from 'react';
import { useIntl } from 'react-intl';

import {
  STRING,
  NUMBER,
  DATE,
  BOOLEAN,
  IMAGE,
} from '@iso/vex_containers/constants';

const useRawFields = () => {
  const intl = useIntl();
  //field texts
  const imagesForTyreIntl = intl.formatMessage({
    id: 'text.imagesForTyre',
  });

  const rawFields = {
    tyreImages: {
      type: IMAGE,
      validate: { required: true },
      intl: `${imagesForTyreIntl}(*)`,
      fieldType: 'upload',
      defaultValue: [],
    },
  };
  return { rawFields };
};

export default useRawFields;
