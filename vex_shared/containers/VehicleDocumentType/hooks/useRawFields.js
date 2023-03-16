import React from 'react';
import { useIntl } from 'react-intl';

import { BOOLEAN, STRING } from '@iso/vex_containers/constants';
import { trueFalseOptions } from '@iso/vex_containers/defaultOptions';

const useRawFields = () => {
  const intl = useIntl();

  const rawFields = {
    name: {
      type: STRING,
      validate: { required: true },
      intl: intl.formatMessage({
        id: 'text.vehicleDocumentTypeName',
      }),
    },
    description: {
      type: STRING,
      validate: null,
      intl: intl.formatMessage({
        id: 'text.vehicleDocumentTypeDescription',
      }),
    },
    is_required: {
      type: BOOLEAN,
      validate: { required: true },
      intl: intl.formatMessage({
        id: 'text.vehicleDocumentTypeIsRequired',
      }),
      fieldType: 'select',
      options: trueFalseOptions,
    },
  };

  return { rawFields };
};

export default useRawFields;
