import { getToken } from '@iso/lib/helpers/utility';

export const getEquipmentGroupsApi = () => {
  const token = getToken().get('idToken');

  return fetch(process.env.REACT_APP_API_URL + '/equipments/groups', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(res => res)
    .catch(err => console.log('initData: ', err?.message));
};

export const getEquipmentGroupByIdApi = equipmentGroupID => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL + `/equipments/groups/${equipmentGroupID}`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    }
  )
    .then(res => res)
    .catch(err => console.log('initData: ', err?.message));
};

export const insertEquipmentGroupApi = equipmentGroup => {
  const token = getToken().get('idToken');

  return fetch(process.env.REACT_APP_API_URL + '/equipments/groups', {
    method: 'POST',
    body: JSON.stringify(equipmentGroup),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then(res => res)
    .catch(err => console.log('err-create-fetch: ', err?.message));
};

export const updateEquipmentGroupApi = (fieldsNeedToUpdate, id) => {
  const token = getToken().get('idToken');

  return fetch(process.env.REACT_APP_API_URL + `/equipments/groups/${id}`, {
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

export const deleteEquipmentGroupApi = id => {
  const token = getToken().get('idToken');

  return fetch(process.env.REACT_APP_API_URL + `/equipments/groups/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
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
