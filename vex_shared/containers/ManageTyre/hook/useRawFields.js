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
  //selector
  const selectedWarehouse = useSelector(
    state => state.assetWarehouse.selectedWarehouse
  );
  const intl = useIntl();
  //field texts
  //field texts
  const tyreNameIntl = intl.formatMessage({ id: 'text.tyreName' });
  const shortNameIntl = intl.formatMessage({ id: 'text.tyreShortName' });
  const sizeCmIntl = intl.formatMessage({ id: 'text.tyreSizeCm' });
  const operationLimitKmIntl = intl.formatMessage({
    id: 'text.tyreOperationLimitKm',
  });
  const replaceMaxThresholdKmIntl = intl.formatMessage({
    id: 'text.tyreReplaceNotiMaxThresholdKm',
  });
  const serialNoIntl = intl.formatMessage({ id: 'text.tyreSerialNo' });

  const imagesForTyreIntl = intl.formatMessage({
    id: 'text.imagesForTyre',
  });

  const assetWarehouseIntl = intl.formatMessage({
    id: 'text.assetWarehouse',
  });
  const rawFields = {
    name: {
      type: STRING,
      validate: { required: true },
      intl: tyreNameIntl,
    },
    short_name: {
      type: STRING,
      validate: { required: true },
      intl: shortNameIntl,
    },
    size_cm: {
      type: NUMBER,
      validate: { required: true, gte: 0 },
      inputType: 'number',
      intl: sizeCmIntl,
    },
    operation_limit_km: {
      type: NUMBER,
      validate: { required: true, gte: 0 },
      inputType: 'number',
      intl: operationLimitKmIntl,
    },
    replace_noti_max_threshold_km: {
      type: NUMBER,
      validate: { required: true, gte: 0 },
      intl: replaceMaxThresholdKmIntl,
      inputType: 'number',
    },
    serial_no: {
      type: STRING,
      validate: { required: true },
      intl: serialNoIntl,
    },
    asset_warehouse: {
      type: STRING,
      validate: { required: true },
      intl: assetWarehouseIntl,
      defaultValue: selectedWarehouse?.name,
      disabled: true,
    },
  };
  return { rawFields };
};

export default useRawFields;
