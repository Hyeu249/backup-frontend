import React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { STRING, NUMBER, DATE, BOOLEAN } from '@iso/vex_containers/constants';

import { trueFalseOptions } from '@iso/vex_containers/defaultOptions';

const useRawFields = () => {
  //selector
  const vehicleTypes = useSelector(state => state.vehicle.vehicleTypes);
  const selectedWarehouse = useSelector(
    state => state.assetWarehouse.selectedWarehouse
  );

  const intl = useIntl();
  //field texts
  const nameIntl = intl.formatMessage({ id: 'text.vehicleName' });
  const carBrandIntl = intl.formatMessage({ id: 'text.carBrand' });
  const carModelIntl = intl.formatMessage({ id: 'text.carModel' });
  const carYearIntl = intl.formatMessage({ id: 'text.carYear' });
  const wheelCountIntl = intl.formatMessage({ id: 'text.wheelCount' });
  const carOriginIntl = intl.formatMessage({ id: 'text.carOrigin' });
  const gpsKeyIntl = intl.formatMessage({ id: 'text.gpsKey' });
  const tyreRotationThresholdKmIntl = intl.formatMessage({
    id: 'text.tyreRotationThresholdKm',
  });
  const imagesForVehicle = intl.formatMessage({ id: 'text.imagesForVehicle' });

  const vehicleTypeIntl = intl.formatMessage({ id: 'text.vehicleType' });
  const assetWarehouseIntl = intl.formatMessage({
    id: 'text.assetWarehouse',
  });
  const isTrailerIntl = intl.formatMessage({ id: 'text.isCarTrailer' });

  const rawFields = {
    //1
    name: {
      type: STRING,
      validate: { required: true },
      intl: nameIntl,
    },
    //2
    brand: {
      type: STRING,
      validate: { required: true },
      intl: carBrandIntl,
    },
    //3
    model: {
      type: STRING,
      validate: { required: true },
      intl: carModelIntl,
    },
    //4
    build_date: {
      type: DATE,
      validate: { required: false },
      intl: carYearIntl,
    },
    //5
    wheel_count: {
      type: NUMBER,
      validate: { required: true, gte: 0 },
      intl: wheelCountIntl,
      inputType: 'number',
    },
    //6
    origin: {
      type: STRING,
      validate: null,
      intl: carOriginIntl,
    },
    //7
    gps_key: {
      type: STRING,
      validate: null,
      intl: gpsKeyIntl,
    },
    //8
    tyre_rotation_max_threshold_km: {
      type: NUMBER,
      validate: { required: true, gte: 0 },
      intl: tyreRotationThresholdKmIntl,
      inputType: 'number',
    },
    //9
    vehicle_type_id: {
      type: STRING,
      validate: { required: true },
      intl: vehicleTypeIntl,
      fieldType: 'select',
      options: vehicleTypes,
    },
    //10
    asset_warehouse: {
      type: STRING,
      validate: { required: true },
      intl: assetWarehouseIntl,
      defaultValue: selectedWarehouse?.name,
      disabled: true,
    },
    //11
    is_trailer: {
      type: BOOLEAN,
      validate: { required: true },
      intl: isTrailerIntl,
      fieldType: 'select',
      options: trueFalseOptions,
      disabled: true,
      defaultValue: false,
    },
  };
  return { rawFields };
};

export default useRawFields;
