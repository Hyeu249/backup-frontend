import { getToken } from '@iso/lib/helpers/utility';

export const GetDocumentListByVehicle = id => {
  const token = getToken().get('idToken');

  return fetch(process.env.REACT_APP_API_URL + `/vehicles/${id}/documents`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(res => res)
    .catch(err => console.log('initData: ', err?.message));
};
export const getVehicleDocumentByIdApi = id => {
  const token = getToken().get('idToken');

  return fetch(process.env.REACT_APP_API_URL + `/vehicles/${id}/documents`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(res => res)
    .catch(err => console.log('initData: ', err?.message));
};

export const insertVehicleDocumentApi = (body, vehicleId) => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL + `/vehicles/${vehicleId}/documents`,
    {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  )
    .then(res => res)
    .catch(err => console.log('err-create-fetch: ', err?.message));
};

export const updateVehicleDocumentApi = (fieldsNeedToUpdate, id) => {
  const token = getToken().get('idToken');

  return fetch(process.env.REACT_APP_API_URL + `/vehicles/documents/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(fieldsNeedToUpdate),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then(res => res)
    .catch(err => console.log('err-create-fetch: ', err?.message));
};

export const deleteVehicleDocumentApi = id => {
  const token = getToken().get('idToken');
  return fetch(process.env.REACT_APP_API_URL + `/vehicles/documents/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res)
    .catch(err => console.log('err-create-fetch: ', err?.message));
};
