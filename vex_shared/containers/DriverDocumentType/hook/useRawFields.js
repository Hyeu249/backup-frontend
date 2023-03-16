import React from 'react';
import { useIntl } from 'react-intl';

import { STRING } from '@iso/vex_containers/constants';
import { trueFalseOptions } from '../../defaultOptions';

const useRawFields = () => {
  const intl = useIntl();

  const rawFields = {
    name: {
      type: STRING,
      validate: { required: true },
      intl: intl.formatMessage({
        id: 'text.driverDocumentTypeName',
      }),
    },
    description: {
      type: STRING,
      validate: null,
      intl: intl.formatMessage({
        id: 'text.driverDocumentTypeDescription',
      }),
    },
    is_required: {
      type: STRING,
      validate: null,
      intl: intl.formatMessage({
        id: 'text.driverDocumentTypeIsRequired',
      }),
      fieldType: 'select',
      options: trueFalseOptions,
    },
  };

  return { rawFields };
};

export default useRawFields;
