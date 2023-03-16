import React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { STRING, DATE } from '@iso/vex_containers/constants';

const useRawFields = () => {
  //selector
  const driverDocumentTypeOptions = useSelector(
    state => state.driver.driverDocumentTypeOptions
  );

  const intl = useIntl();

  const rawFields = {
    driver_document_type_id: {
      type: STRING,
      validate: { required: true },
      intl: intl.formatMessage({
        id: 'text.driverDocumentDriverDocumentTypeId',
      }),
      fieldType: 'select',
      options: driverDocumentTypeOptions,
    },
    issued_by: {
      type: STRING,
      validate: { required: true },
      intl: intl.formatMessage({
        id: 'text.driverDocumentIssuedBy',
      }),
    },
    issue_date: {
      type: DATE,
      validate: null,
      intl: intl.formatMessage({
        id: 'text.driverDocumentIssueDate',
      }),
    },
    expiry_date: {
      type: DATE,
      validate: null,
      intl: intl.formatMessage({
        id: 'text.driverDocumentExpiryDate',
      }),
    },
  };
  return { rawFields };
};

export default useRawFields;
