import { getToken } from '@iso/lib/helpers/utility';

export const getMaintenanceTypesApi = () => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL + '/equipments/maintenance-types',
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    }
  )
    .then(res => res)
    .catch(err => console.log('initData: ', err?.message));
};

export const getMaintenanceTypeByIdApi = maintenanceTypeID => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL +
      `/equipments/maintenance-types/${maintenanceTypeID}`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    }
  )
    .then(res => res)
    .catch(err => console.log('initData: ', err?.message));
};

export const insertMaintenanceTypeApi = maintenanceType => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL + '/equipments/maintenance-types',
    {
      method: 'POST',
      body: JSON.stringify(maintenanceType),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  )
    .then(res => res)
    .catch(err => console.log('err-create-fetch: ', err?.message));
};

export const updateMaintenanceTypeApi = (fieldsNeedToUpdate, id) => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL + `/equipments/maintenance-types/${id}`,
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

export const deleteMaintenanceTypeApi = id => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL + `/equipments/maintenance-types/${id}`,
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

export const jsonApi = async res => {
  const data = await res.json();
  return data;
};

export const blobApi = async res => {
  const data = await res.blob();
  return data;
};
