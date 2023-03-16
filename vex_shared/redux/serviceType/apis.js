import { getToken } from '@iso/lib/helpers/utility';

export const getServiceTypesApi = () => {
  const token = getToken().get('idToken');

  return fetch(process.env.REACT_APP_API_URL + '/suppliers/service-types', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(res => res)
    .catch(err => console.log('initData: ', err?.message));
};

export const getServiceTypeByIdApi = serviceTypeID => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL + `/suppliers/service-types/${serviceTypeID}`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    }
  )
    .then(res => res)
    .catch(err => console.log('initData: ', err?.message));
};

export const insertServiceTypeApi = serviceType => {
  const token = getToken().get('idToken');

  return fetch(process.env.REACT_APP_API_URL + '/suppliers/service-types', {
    method: 'POST',
    body: JSON.stringify(serviceType),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then(res => res)
    .catch(err => console.log('err-create-fetch: ', err?.message));
};

export const updateServiceTypeApi = (fieldsNeedToUpdate, id) => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL + `/suppliers/service-types/${id}`,
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

export const deleteServiceTypeApi = id => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL + `/suppliers/service-types/${id}`,
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
