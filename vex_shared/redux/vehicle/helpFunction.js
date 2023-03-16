import { cloneDeep } from 'lodash';

export const convertTypeOfVehicle = rawVehicle => {
  const vehicle = cloneDeep(rawVehicle);
  return {
    vehicle_type_id: String(vehicle.vehicle_type_id || ''),
    name: String(vehicle.name || ''),
    brand: String(vehicle.brand || ''),
    model: String(vehicle.model || ''),
    build_date: String(vehicle.build_date || ''),
    wheel_count: Number(vehicle.wheel_count || 0),
    origin: String(vehicle.origin || ''),
    gps_key: String(vehicle.gps_key || ''),
    tyre_rotation_max_threshold_km: Number(
      vehicle.tyre_rotation_max_threshold_km || 0
    ),
    is_trailer: Boolean(vehicle.is_trailer),
  };
};

export const convertTypeOfVehicleDocument = raw => {
  const vehicle = cloneDeep(raw);
  return {
    vehicle_document_type_id: String(vehicle.vehicle_document_type_id || ''),
    issued_by: String(vehicle.issued_by || ''),
    issue_date: String(vehicle.issue_date || ''),
    expiry_date: String(vehicle.expiry_date || ''),
  };
};

export const getSemiTrucks = raw => {
  const vehicles = cloneDeep(raw === null ? [] : raw);
  const semiTrucks = vehicles.filter(
    vehicle => vehicle.is_trailer === undefined || vehicle.is_trailer === false
  );

  return semiTrucks;
};
export const getTrailers = raw => {
  const vehicles = cloneDeep(raw);
  const trailer = vehicles.filter(vehicle => vehicle.is_trailer === true);
  return trailer;
};

export const addSemiTruck = raw => {
  const vehicles = cloneDeep(raw);

  return vehicles.map(vehicle => {
    vehicle.semi_truck = vehicle.edges?.semi_truck || {};
    return vehicle;
  });
};
