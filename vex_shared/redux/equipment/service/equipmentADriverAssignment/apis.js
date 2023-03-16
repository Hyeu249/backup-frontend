import { getToken } from '@iso/lib/helpers/utility';

export const getEquipmentAVehicleAssignmentList = payload => {
  const token = getToken().get('idToken');

  const params = Object.keys(payload || {})
    .map(field => `${field}=${payload[field]}`)
    .join('%');

  return fetch(
    process.env.REACT_APP_API_URL +
      `/equipments/vehicle-driver/assignments?${params}`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    }
  )
    .then(res => res)
    .catch(err => console.log('initData: ', err?.message));
};

export const getEquipmentADriverAssignmentByIdApi = id => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL +
      `/equipments/vehicle-driver/assignments/${id}`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    }
  )
    .then(res => res)
    .catch(err => console.log('initData: ', err?.message));
};

export const insertEquipmentADriverAssignmentApi = body => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL + '/equipments/vehicle-driver/assignments',
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

export const updateEquipmentADriverAssignmentApi = (fieldsNeedToUpdate, id) => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL +
      `/equipments/vehicle-driver/assignments/${id}`,
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

export const deleteEquipmentADriverAssignmentApi = id => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL +
      `/equipments/vehicle-driver/assignments/${id}/unassign`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then(res => res)
    .catch(err => console.log('err-create-fetch: ', err?.message));
};

export const approveEquipmentADriverAssignmentApi = ({ id, is_approved }) => {
  const token = getToken().get('idToken');
  return fetch(
    process.env.REACT_APP_API_URL +
      `/equipments/vehicle-driver/assignments/${id}/approve`,
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
