import React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { STRING, LIST, NUMBER } from '@iso/vex_containers/constants';

const useRawFields = () => {
  //selector
  const vehicleOptions = useSelector(state => state.equipment.vehicleOptions);
  const approverOptions = useSelector(state => state.equipment.approverOptions);
  const intl = useIntl();

  const rawFields = {
    vehicle_id: {
      type: STRING,
      validate: { required: true },
      intl: intl.formatMessage({
        id: 'text.equipmentAVehicleAssignmentVehicle',
      }),
      fieldType: 'select',
      options: vehicleOptions,
    },
    start_km: {
      type: NUMBER,
      validate: { required: true },
      intl: intl.formatMessage({
        id: 'text.equipmentAVehicleAssignmentStartKm',
      }),
      inputType: 'number',
    },
    end_km: {
      type: NUMBER,
      validate: null,
      intl: intl.formatMessage({
        id: 'text.equipmentAVehicleAssignmentEndKm',
      }),
      inputType: 'number',
    },
    approver_id_list: {
      type: LIST,
      validate: { required: true },
      intl: intl.formatMessage({
        id: 'text.equipmentAVehicleAssignmentApproverIdList',
      }),
      fieldType: 'multiple select',
      options: approverOptions,
      defaultValue: [],
    },
  };
  return { rawFields };
};

export default useRawFields;
