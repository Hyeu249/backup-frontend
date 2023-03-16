import { getToken } from '@iso/lib/helpers/utility';

export const getServiceRequestsApi = () => {
  const token = getToken().get('idToken');

  return fetch(process.env.REACT_APP_API_URL + '/requests/services', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(res => res)
    .catch(err => console.log('initData: ', err?.message));
};

export const getServiceRequestByIdApi = serviceRequestID => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL + `/requests/services/${serviceRequestID}`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    }
  )
    .then(res => res)
    .catch(err => console.log('initData: ', err?.message));
};

export const insertServiceRequestApi = serviceRequest => {
  const token = getToken().get('idToken');

  return fetch(process.env.REACT_APP_API_URL + '/requests/services', {
    method: 'POST',
    body: JSON.stringify(serviceRequest),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then(res => res)
    .catch(err => console.log('err-create-fetch: ', err?.message));
};

export const updateServiceRequestApi = (fieldsNeedToUpdate, id) => {
  const token = getToken().get('idToken');

  return fetch(process.env.REACT_APP_API_URL + `/requests/services/${id}`, {
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

export const deleteServiceRequestApi = id => {
  const token = getToken().get('idToken');

  return fetch(process.env.REACT_APP_API_URL + `/requests/services/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res)
    .catch(err => console.log('err-create-fetch: ', err?.message));
};
export const approveServiceRequesttApi = ({ id, is_approved }) => {
  const token = getToken().get('idToken');
  return fetch(
    process.env.REACT_APP_API_URL + `/requests/services/${id}/approve`,
    {
      method: 'POST',
      body: JSON.stringify({ is_approved: is_approved }),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  )
    .then(res => res)
    .catch(err => console.log('err-create-fetch: ', err?.message));
};
