import { getToken } from '@iso/lib/helpers/utility';

//equipment
export const getEquipmentsApi = warehouseID => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL + `/warehouses/${warehouseID}/equipments`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    }
  )
    .then(res => res)
    .catch(err => console.log('initData: ', err?.message));
};

export const getEquipmentByIdApi = (equipmentID, warehouseID) => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL +
      `/warehouses/${warehouseID}/equipments/${equipmentID}`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    }
  )
    .then(res => res)
    .catch(err => console.log('initData: ', err?.message));
};

export const insertEquipmentApi = (equipment, warehouseID) => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL + `/warehouses/${warehouseID}/equipments`,
    {
      method: 'POST',
      body: JSON.stringify(equipment),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  )
    .then(res => res)
    .catch(err => console.log('err-create-fetch: ', err?.message));
};

export const updateEquipmentApi = (fieldsNeedToUpdate, id, warehouseID) => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL +
      `/warehouses/${warehouseID}/equipments/${id}`,
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

export const deleteEquipmentApi = (id, warehouseID) => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL +
      `/warehouses/${warehouseID}/equipments/${id}`,
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
