import React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import {
  STRING,
  NUMBER,
  DATE,
  BOOLEAN,
  IMAGE,
  LIST,
} from '@iso/vex_containers/constants';

import { users } from '@iso/vex_containers/defaultOptions';

const useRawFields = () => {
  const intl = useIntl();
  const vehicleOptions = useSelector(state => state.tyre.vehicles);

  //field texts
  const vehicleIntl = intl.formatMessage({
    id: 'sidebar.vehicle',
  });
  const positionIntl = intl.formatMessage({ id: 'text.tyrePosition' });
  const tyreInUseKmIntl = intl.formatMessage({ id: 'text.tyreInUseKm' });
  const approverListIntl = intl.formatMessage({ id: 'text.approverList' });

  const rawFields = {
    vehicle_id: {
      type: STRING,
      validate: { required: true },
      intl: `${vehicleIntl}(*)`,
      fieldType: 'select',
      options: vehicleOptions,
    },
    position: {
      type: NUMBER,
      validate: { required: true, gte: 0 },
      intl: positionIntl,
      inputType: 'number',
    },
    in_use_km: {
      type: NUMBER,
      validate: null,
      intl: tyreInUseKmIntl,
      inputType: 'number',
    },
    approver_id_list: {
      type: LIST,
      validate: { required: true },
      intl: approverListIntl,
      fieldType: 'multiple select',
      options: users,
      defaultValue: [],
    },
  };
  return { rawFields };
};

export default useRawFields;
