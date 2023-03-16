import React from 'react';
import { useIntl } from 'react-intl';

import {
  STRING,
  NUMBER,
  DATE,
  BOOLEAN,
  IMAGE,
} from '@iso/vex_containers/constants';

const useRawFields = () => {
  const intl = useIntl();
  //field texts
  const imagesForVehicleIntl = intl.formatMessage({
    id: 'text.imagesForVehicle',
  });

  const rawFields = {
    vehicleImages: {
      type: IMAGE,
      validate: { required: true },
      intl: `${imagesForVehicleIntl}(*)`,
      fieldType: 'upload',
      defaultValue: [],
    },
  };
  return { rawFields };
};

export default useRawFields;
