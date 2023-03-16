import { getToken } from '@iso/lib/helpers/utility';

export const getEquipmentAVehicleAssignmentList = payload => {
  const token = getToken().get('idToken');

  const params = Object.keys(payload || {})
    .map(field => `${field}=${payload[field]}`)
    .join('%');

  return fetch(
    process.env.REACT_APP_API_URL + `/equipments/vehicle/assignments?${params}`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    }
  )
    .then(res => res)
    .catch(err => console.log('initData: ', err?.message));
};

export const getEquipmentAVehicleAssignmentByIdApi = id => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL + `/equipments/vehicle/assignments/${id}`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    }
  )
    .then(res => res)
    .catch(err => console.log('initData: ', err?.message));
};

export const insertEquipmentAVehicleAssignmentApi = body => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL + '/equipments/vehicle/assignments',
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

export const updateEquipmentAVehicleAssignmentApi = (
  fieldsNeedToUpdate,
  id
) => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL + `/equipments/vehicle/assignments/${id}`,
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

export const deleteEquipmentAVehicleAssignmentApi = id => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL +
      `/equipments/vehicle/assignments/${id}/unassign`,
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

export const approveEquipmentAVehicleAssignmentApi = ({ id, is_approved }) => {
  const token = getToken().get('idToken');
  return fetch(
    process.env.REACT_APP_API_URL +
      `/equipments/vehicle/assignments/${id}/approve`,
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
