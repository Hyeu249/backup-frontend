import { getToken } from '@iso/lib/helpers/utility';

//images
export const uploadImageForTyreApi = payload => {
  const token = getToken().get('idToken');
  const formData = new FormData();
  const image = payload.image;

  formData.append('name', image.name);
  formData.append('image_file', image.originFileObj);

  return fetch(
    process.env.REACT_APP_API_URL + `/tyres/${payload.tyreID}/images`,
    {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then(res => res)
    .catch(err => console.log('err-create-fetch: ', err?.message));
};

export const deleteImageForTyreApi = payload => {
  const token = getToken().get('idToken');
  const tyreID = payload.tyreID;
  const imageID = payload.imageID;

  return fetch(
    process.env.REACT_APP_API_URL + `/tyres/${tyreID}/images/${imageID}`,
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

export const jsonApi = async res => {
  const data = await res.json();
  return data;
};

export const blobApi = async res => {
  const data = await res.blob();
  return data;
};

export const getTyreImageApi = imageId => {
  const token = getToken().get('idToken');

  return fetch(process.env.REACT_APP_API_URL + `/tyres/images/${imageId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res)
    .catch(err => console.log('err-create-fetch: ', err?.message));
};
