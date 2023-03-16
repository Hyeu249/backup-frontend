import { getToken } from '@iso/lib/helpers/utility';

export const getFuelRequestsApi = () => {
  const token = getToken().get('idToken');

  return fetch(process.env.REACT_APP_API_URL + '/requests/refuel', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(res => res)
    .catch(err => console.log('initData: ', err?.message));
};

export const getFuelRequestByIdApi = fuelRequestID => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL + `/requests/refuel/${fuelRequestID}`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    }
  )
    .then(res => res)
    .catch(err => console.log('initData: ', err?.message));
};

export const insertFuelRequestApi = fuelRequest => {
  const token = getToken().get('idToken');

  return fetch(process.env.REACT_APP_API_URL + '/requests/refuel', {
    method: 'POST',
    body: JSON.stringify(fuelRequest),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then(res => res)
    .catch(err => console.log('err-create-fetch: ', err?.message));
};

export const updateFuelRequestApi = (fieldsNeedToUpdate, id) => {
  const token = getToken().get('idToken');

  return fetch(process.env.REACT_APP_API_URL + `/requests/refuel/${id}`, {
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

export const deleteFuelRequestApi = id => {
  const token = getToken().get('idToken');

  return fetch(process.env.REACT_APP_API_URL + `/requests/refuel/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res)
    .catch(err => console.log('err-create-fetch: ', err?.message));
};

export const approveFuelRequestApi = ({ id, is_approved }) => {
  const token = getToken().get('idToken');
  return fetch(
    process.env.REACT_APP_API_URL + `/requests/refuel/${id}/approve`,
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

export const GetRefuelRequestsApprovalStatusList = ids => {
  const token = getToken().get('idToken');
  const params = ids?.map(v => `request_id_list=${v}`)?.join('&');
  console.log('params: ', params);
  console.log('okay: ', `/requests/refuel/approval-status?${params}`);

  return fetch(
    process.env.REACT_APP_API_URL +
      `/requests/refuel/approval-status?${params}`,
    {
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then(res => res)
    .catch(err => console.log('err-create-fetch: ', err?.message));
};
