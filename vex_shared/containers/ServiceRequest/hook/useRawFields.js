import React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { STRING, LIST } from '@iso/vex_containers/constants';

const useRawFields = () => {
  const intl = useIntl();
  const driverOptions = useSelector(
    state => state.serviceRequest.driverOptions
  );
  const vehicleOptions = useSelector(
    state => state.serviceRequest.vehicleOptions
  );
  const equipmentServiceRequestOptions = useSelector(
    state => state.serviceRequest.equipmentServiceRequestOptions
  );
  const tyreServiceRequestOptions = useSelector(
    state => state.serviceRequest.tyreServiceRequestOptions
  );

  const approverOptions = useSelector(
    state => state.serviceRequest.approverOptions
  );

  const rawFields = {
    driver_id: {
      type: STRING,
      validate: null,
      intl: intl.formatMessage({
        id: 'text.serviceRequestDriverId',
      }),
      fieldType: 'select',
      options: driverOptions,
    },
    vehicle_id: {
      type: STRING,
      validate: null,
      intl: intl.formatMessage({
        id: 'text.serviceRequestVehicleId',
      }),
      fieldType: 'select',
      options: vehicleOptions,
    },
    equipment_service_request_id_list: {
      type: LIST,
      validate: { required: true },
      intl: intl.formatMessage({
        id: 'text.serviceRequestEquipmentServiceRequestIdList',
      }),
      fieldType: 'multiple select',
      options: equipmentServiceRequestOptions,
      defaultValue: [],
    },
    tyre_service_request_id_list: {
      type: LIST,
      validate: { required: true },
      intl: intl.formatMessage({
        id: 'text.serviceRequestTyreServiceRequestIdList',
      }),
      fieldType: 'multiple select',
      options: tyreServiceRequestOptions,
      defaultValue: [],
    },
    approver_id_list: {
      type: LIST,
      validate: { required: true },
      intl: intl.formatMessage({
        id: 'text.serviceRequestApproverIdList',
      }),
      fieldType: 'multiple select',
      options: approverOptions,
      defaultValue: [],
    },
  };
  return { rawFields };
};

export default useRawFields;
