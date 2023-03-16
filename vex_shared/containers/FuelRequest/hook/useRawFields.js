import React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import {
  STRING,
  EMAIL,
  NUMBER,
  DATE,
  LIST,
} from '@iso/vex_containers/constants';

const useRawFields = () => {
  const intl = useIntl();

  const vehicles = useSelector(state => state.fuelRequest.vehicles);
  const drivers = useSelector(state => state.fuelRequest.drivers);
  const fuelPriceQuotes = useSelector(
    state => state.fuelRequest.fuelPriceQuotes
  );
  const approverOptions = useSelector(
    state => state.fuelRequest.approverOptions
  );
  //field texts
  const fuelPriceQuoteIdIntl = intl.formatMessage({
    id: 'text.fuelRequestFuelPriceQuoteId',
  });
  const volumeLiterIdIntl = intl.formatMessage({
    id: 'text.fuelRequestVolumeLiter',
  });
  const vehicleIdIntl = intl.formatMessage({
    id: 'text.fuelRequestVehicleId',
  });
  const vehicleDriverIdIntl = intl.formatMessage({
    id: 'text.fuelRequestVehicleDriverId',
  });
  const fuelDateIntl = intl.formatMessage({
    id: 'text.fuelRequestFuelDate',
  });
  const approverIdListIntl = intl.formatMessage({
    id: 'text.fuelRequestApproverIdList',
  });

  const rawFields = {
    vehicle_driver_id: {
      type: STRING,
      validate: { required: true },
      intl: vehicleDriverIdIntl,
      fieldType: 'select',
      options: drivers,
    },
    vehicle_id: {
      type: STRING,
      validate: { required: true },
      intl: vehicleIdIntl,
      fieldType: 'select',
      options: vehicles,
    },
    fuel_price_quote_id: {
      type: STRING,
      validate: { required: true },
      intl: fuelPriceQuoteIdIntl,
      fieldType: 'select',
      options: fuelPriceQuotes,
    },
    volume_liter: {
      type: NUMBER,
      validate: { required: true },
      intl: volumeLiterIdIntl,
      inputType: 'number',
    },
    refuel_date: {
      type: DATE,
      validate: { required: true },
      intl: fuelDateIntl,
    },
    approver_id_list: {
      type: LIST,
      validate: { required: true },
      intl: approverIdListIntl,
      fieldType: 'multiple select',
      options: approverOptions,
      defaultValue: [],
    },
  };
  return { rawFields };
};

export default useRawFields;
