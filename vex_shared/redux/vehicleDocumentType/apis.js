import { getToken } from '@iso/lib/helpers/utility';

export const getVehicleDocumentTypesApi = () => {
  const token = getToken().get('idToken');

  return fetch(process.env.REACT_APP_API_URL + '/vehicles/documents/types', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(res => res)
    .catch(err => console.log('initData: ', err?.message));
};

export const getVehicleDocumentTypeByIdApi = vehicleDocumentTypeID => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL +
      `/vehicles/documents/types/${vehicleDocumentTypeID}`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    }
  )
    .then(res => res)
    .catch(err => console.log('initData: ', err?.message));
};

export const insertVehicleDocumentTypeApi = vehicleDocumentType => {
  const token = getToken().get('idToken');

  return fetch(process.env.REACT_APP_API_URL + '/vehicles/documents/types', {
    method: 'POST',
    body: JSON.stringify(vehicleDocumentType),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then(res => res)
    .catch(err => console.log('err-create-fetch: ', err?.message));
};

export const updateVehicleDocumentTypeApi = (fieldsNeedToUpdate, id) => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL + `/vehicles/documents/types/${id}`,
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

export const deleteVehicleDocumentTypeApi = id => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL + `/vehicles/documents/types/${id}`,
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
