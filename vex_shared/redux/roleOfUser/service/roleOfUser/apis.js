import { getToken } from '@iso/lib/helpers/utility';

export const getRoleOfUsersApi = () => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL + '/authorization-management/rbac-users',
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    }
  )
    .then(res => res)
    .catch(err => console.log('initData: ', err?.message));
};
export const getAListOfDomainApi = () => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL + '/authorization-management/rbac-domains',
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    }
  )
    .then(res => res)
    .catch(err => console.log('initData: ', err?.message));
};
export const getAListOfAllRolesApi = () => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL + '/authorization-management/roles',
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    }
  )
    .then(res => res)
    .catch(err => console.log('initData: ', err?.message));
};
export const getRoleOfUserByIdApi = roleOfUserID => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL +
      `/authorization-management/rbac-users/${roleOfUserID}`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    }
  )
    .then(res => res)
    .catch(err => console.log('initData: ', err?.message));
};

export const insertRoleOfUserApi = (roleOfUser, role) => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL +
      `/authorization-management/roles/${role}/add-user`,
    {
      method: 'POST',
      body: JSON.stringify(roleOfUser),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  )
    .then(res => res)
    .catch(err => console.log('err-create-fetch: ', err?.message));
};

export const updateRoleOfUserApi = (fieldsNeedToUpdate, id) => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL +
      `/authorization-management/rbac-users/${id}`,
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

export const deleteRoleOfUserApi = id => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL +
      `/authorization-management/rbac-users/${id}`,
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
export const getRoleOfUserInAllDomainsApi = userId => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL +
      `/authorization-management/roles/user/${userId}`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    }
  )
    .then(res => res)
    .catch(err => console.log('initData: ', err?.message));
};
