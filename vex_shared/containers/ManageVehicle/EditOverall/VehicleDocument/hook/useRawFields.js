import React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { STRING, DATE } from '@iso/vex_containers/constants';

const useRawFields = () => {
  //selector
  const vehicleDocumentTypeOptions = useSelector(
    state => state.vehicle.vehicleDocumentTypeOptions
  );

  const intl = useIntl();

  const rawFields = {
    vehicle_document_type_id: {
      type: STRING,
      validate: { required: true },
      intl: intl.formatMessage({
        id: 'text.vehicleDocumentVehicleDocumentTypeId',
      }),
      fieldType: 'select',
      options: vehicleDocumentTypeOptions,
    },
    issued_by: {
      type: STRING,
      validate: { required: true },
      intl: intl.formatMessage({
        id: 'text.vehicleDocumentIssuedBy',
      }),
    },
    issue_date: {
      type: DATE,
      validate: null,
      intl: intl.formatMessage({
        id: 'text.vehicleDocumentIssueDate',
      }),
    },
    expiry_date: {
      type: DATE,
      validate: null,
      intl: intl.formatMessage({
        id: 'text.vehicleDocumentExpiryDate',
      }),
    },
  };
  return { rawFields };
};

export default useRawFields;
