import { getToken } from '@iso/lib/helpers/utility';

//vehicle
export const getVehiclesApi = warehouseID => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL + `/warehouses/${warehouseID}/vehicles`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    }
  )
    .then(res => res)
    .catch(err => console.log('initData: ', err?.message));
};

export const getVehicleByIdApi = (vehicleID, warehouseID) => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL +
      `/warehouses/${warehouseID}/vehicles/${vehicleID}`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    }
  )
    .then(res => res)
    .catch(err => console.log('initData: ', err?.message));
};

export const insertVehicleApi = (vehicle, warehouseID) => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL + `/warehouses/${warehouseID}/vehicles`,
    {
      method: 'POST',
      body: JSON.stringify(vehicle),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  )
    .then(res => res)
    .catch(err => console.log('err-create-fetch: ', err?.message));
};

export const updateVehicleApi = (fieldsNeedToUpdate, id, warehouseID) => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL + `/warehouses/${warehouseID}/vehicles/${id}`,
    {
      method: 'PATCH',
      body: JSON.stringify(fieldsNeedToUpdate),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  )
    .then(res => res)
    .catch(err => console.log('err-create-fetch: ', err?.message));
};

export const deleteVehicleApi = (id, warehouseID) => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL + `/warehouses/${warehouseID}/vehicles/${id}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then(res => res)
    .catch(err => console.log('err-create-fetch: ', err?.message));
};
