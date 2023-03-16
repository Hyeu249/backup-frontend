import React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { STRING, LIST } from '@iso/vex_containers/constants';

const useRawFields = () => {
  //selector
  const driverOptions = useSelector(state => state.equipment.driverOptions);
  const approverOptions = useSelector(state => state.equipment.approverOptions);

  const intl = useIntl();

  const rawFields = {
    vehicle_driver_id: {
      type: STRING,
      validate: { required: true },
      intl: intl.formatMessage({
        id: 'text.equipmentADriverAssignmentDriverId',
      }),
      fieldType: 'select',
      options: driverOptions,
    },
    approver_id_list: {
      type: LIST,
      validate: { required: true },
      intl: intl.formatMessage({
        id: 'text.equipmentADriverAssignmentApproverIdList',
      }),
      fieldType: 'multiple select',
      options: approverOptions,
      defaultValue: [],
    },
  };
  return { rawFields };
};

export default useRawFields;
