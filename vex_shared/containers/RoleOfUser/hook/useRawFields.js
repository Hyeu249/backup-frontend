import React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { STRING } from '@iso/vex_containers/constants';

const useRawFields = () => {
  const intl = useIntl();
  const userOptions = useSelector(state => state.roleOfUser.userOptions);
  const roleOptions = useSelector(state => state.roleOfUser.roleOptions);
  const domainOptions = useSelector(state => state.roleOfUser.domainOptions);

  const rawFields = {
    userUUID: {
      type: STRING,
      validate: { required: true },
      intl: intl.formatMessage({ id: 'text.supplierUserUUID' }),
      fieldType: 'select',
      options: userOptions,
    },
    role: {
      type: STRING,
      validate: { required: true },
      intl: intl.formatMessage({ id: 'text.supplierRole' }),
      fieldType: 'select',
      options: roleOptions,
    },
    domain: {
      type: STRING,
      validate: { required: true },
      intl: intl.formatMessage({ id: 'text.supplierDomain' }),
      fieldType: 'select',
      options: domainOptions,
    },
  };
  return { rawFields };
};

export default useRawFields;
