import React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import {
  STRING,
  NUMBER,
  DATE,
  BOOLEAN,
  IMAGE,
} from '@iso/vex_containers/constants';

const useRawFields = () => {
  const intl = useIntl();
  const driverDocumentOptions = useSelector(
    state => state.driver.driverDocumentOptions
  );

  //field texts
  const driverDocumentIntl = intl.formatMessage({
    id: 'text.imageForDriverDocumentDocumentId',
  });
  const imagesForDriverDocumentIntl = intl.formatMessage({
    id: 'text.imagesForDriverDocument',
  });

  const rawFields = {
    driver_document_id: {
      type: STRING,
      validate: { required: true },
      intl: driverDocumentIntl,
      fieldType: 'select',
      options: driverDocumentOptions,
    },
    driver_document_images: {
      type: IMAGE,
      validate: { required: true },
      intl: `${imagesForDriverDocumentIntl}(*)`,
      fieldType: 'upload',
      defaultValue: [],
    },
  };
  return { rawFields };
};

export default useRawFields;
