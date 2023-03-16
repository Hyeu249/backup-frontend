import React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { STRING, NUMBER, DATE, BOOLEAN } from '@iso/vex_containers/constants';

import { trueFalseOptions } from '@iso/vex_containers/defaultOptions';

const useRawFields = () => {
  //selector
  const { maintenanceTypes, equipmentGroups } = useSelector(
    state => state.equipment
  );
  const selectedWarehouse = useSelector(
    state => state.assetWarehouse.selectedWarehouse
  );
  const intl = useIntl();
  //field texts
  const equipmentGroupIntl = intl.formatMessage({ id: 'text.equipmentGroup' });
  const maintenanceTypeIntl = intl.formatMessage({
    id: 'text.maintenanceType',
  });
  const nameIntl = intl.formatMessage({ id: 'text.equipmentName' });
  const descriptionIntl = intl.formatMessage({
    id: 'text.equipmentDescription',
  });
  const manufacturerIntl = intl.formatMessage({
    id: 'text.equipmentManufacturer',
  });
  const isReusableIntl = intl.formatMessage({
    id: 'text.equipmentIsReusable',
  });
  const maintenanceCycleKmIntl = intl.formatMessage({
    id: 'text.equipmentMaintenanceCycleKm',
  });
  const maintenanceCycleHourIntl = intl.formatMessage({
    id: 'text.equipmentMaintenanceCycleHour',
  });
  const assetWarehouseIntl = intl.formatMessage({
    id: 'text.assetWarehouse',
  });

  const rawFields = {
    name: {
      type: STRING,
      validate: { required: true },
      intl: nameIntl,
    },
    description: {
      type: STRING,
      validate: null,
      intl: descriptionIntl,
    },
    manufacturer: {
      type: STRING,
      validate: { required: true },
      intl: manufacturerIntl,
    },
    maintenance_cycle_km: {
      type: NUMBER,
      validate: { required: true, gte: 0 },
      intl: maintenanceCycleKmIntl,
      inputType: 'number',
    },
    maintenance_cycle_hour: {
      type: NUMBER,
      validate: { required: true, gte: 0 },
      intl: maintenanceCycleHourIntl,
      inputType: 'number',
    },
    equipment_group_id: {
      type: STRING,
      validate: { required: true },
      intl: equipmentGroupIntl,
      fieldType: 'select',
      options: equipmentGroups,
    },
    maintenance_type_id: {
      type: STRING,
      validate: { required: true },
      intl: maintenanceTypeIntl,
      fieldType: 'select',
      options: maintenanceTypes,
    },
    asset_warehouse: {
      type: STRING,
      validate: { required: true },
      intl: assetWarehouseIntl,
      defaultValue: selectedWarehouse?.name,
      disabled: true,
    },

    is_reusable: {
      type: BOOLEAN,
      validate: { required: true },
      intl: isReusableIntl,
      fieldType: 'select',
      options: trueFalseOptions,
    },
  };
  return { rawFields };
};

export default useRawFields;
