import { getToken } from '@iso/lib/helpers/utility';

export const getDriverDocumentTypesApi = () => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL + '/vehicle-driver/documents/types',
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    }
  )
    .then((res) => res)
    .catch((err) => console.log('initData: ', err?.message));
};

export const insertDriverDocumentTypeApi = (driverDocumentType) => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL + '/vehicle-driver/documents/types',
    {
      method: 'POST',
      body: JSON.stringify(driverDocumentType),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  )
    .then((res) => res)
    .catch((err) => console.log('err-create-fetch: ', err?.message));
};

export const updateDriverDocumentTypeApi = (fieldsNeedToUpdate, id) => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL + `/vehicle-driver/documents/types/${id}`,
    {
      method: 'PATCH',
      body: JSON.stringify(fieldsNeedToUpdate),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  )
    .then((res) => res)
    .catch((err) => console.log('err-create-fetch: ', err?.message));
};

export const deleteDriverDocumentTypeApi = (id) => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL + `/vehicle-driver/documents/types/${id}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((res) => res)
    .catch((err) => console.log('err-create-fetch: ', err?.message));
};

export const jsonApi = async (res) => {
  const data = await res.json();
  return data;
};

export const blobApi = async (res) => {
  const data = await res.blob();
  return data;
};
