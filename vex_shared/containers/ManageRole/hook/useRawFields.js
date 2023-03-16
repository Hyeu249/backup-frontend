import React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { cloneDeep } from 'lodash';

import { STRING } from '@iso/vex_containers/constants';

const useRawFields = () => {
  const intl = useIntl();
  const objectActionOptions = useSelector(
    state => state.role.objectActionOptions
  );

  const rawFields = {
    role: {
      type: STRING,
      validate: { required: true },
      intl: intl.formatMessage({ id: 'text.authRole' }),
    },
    key_field: {
      keyType: STRING,
      valueType: STRING,
      validate: { required: true },
      options: objectActionOptions,
    },
    usingNumbers: {
      defaultValue: 1,
    },
  };
  return { rawFields };
};

export default useRawFields;
