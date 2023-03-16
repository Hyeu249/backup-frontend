import { getToken } from '@iso/lib/helpers/utility';
import { cloneDeep } from 'lodash';

//assingmnet
export const assignTyreToVehicleApi = data => {
  const token = getToken().get('idToken');

  return fetch(process.env.REACT_APP_API_URL + '/tyres/vehicle/assignments', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then(res => res)
    .catch(err => console.log('err-create-fetch: ', err?.message));
};

export const getAssignmentByIdApi = id => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL + `/tyres/vehicle/assignments/${id}`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    }
  )
    .then(res => res)
    .catch(err => console.log('initData: ', err?.message));
};
export const approveVehicleTyreRelationApi = id => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL + `/tyres/vehicle/assignments/${id}/approve`,
    {
      method: 'POST',
      body: JSON.stringify({ is_approved: true }),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  )
    .then(res => res)
    .catch(err => console.log('initData: ', err?.message));
};

export const deleteVehicleTyreAssignmentApi = id => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL + `/tyres/vehicle/assignments/${id}/unassign`,
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
export const GetTyreAVehicleAssignmentListApi = rawBody => {
  const token = getToken().get('idToken');
  const body = cloneDeep(rawBody);
  //get query params
  const params = [];
  Object.keys(body).forEach(field => {
    params.push(`${field}=${body[field]}`);
  });

  return fetch(
    process.env.REACT_APP_API_URL +
      `/tyres/vehicle/assignments?${params.join('&')}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then(res => res)
    .catch(err => console.log('err-create-fetch: ', err?.message));
};
export const GetTyreAVehicleAssignmentApprovalStatusListApi = rawBody => {
  const token = getToken().get('idToken');
  const body = cloneDeep(rawBody);

  const myArray = JSON.stringify(body);

  return fetch(
    process.env.REACT_APP_API_URL +
      `/tyres/vehicle/assignments/approval-status?tyre_vehicle_assignment_id_list=${encodeURIComponent(
        myArray
      )}}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  )
    .then(res => res)
    .catch(err => console.log('err-create-fetch: ', err?.message));
};
export const updateVehicleTyreAssignmentApi = (fieldsNeedToUpdate, id) => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL + `/tyres/vehicle/assignments/${id}`,
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
