import { getToken } from '@iso/lib/helpers/utility';

//images
export const uploadImageForVehicleApi = payload => {
  const token = getToken().get('idToken');
  const formData = new FormData();
  const image = payload.image;

  formData.append('name', image.name);
  formData.append('image_file', image.originFileObj);

  return fetch(
    process.env.REACT_APP_API_URL + `/vehicles/${payload.vehicleID}/images`,
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

export const deleteImageForVehicleApi = payload => {
  const token = getToken().get('idToken');
  const vehicleID = payload.vehicleID;
  const imageID = payload.imageID;

  return fetch(
    process.env.REACT_APP_API_URL + `/vehicles/${vehicleID}/images/${imageID}`,
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

export const getVehicleImageApi = imageId => {
  const token = getToken().get('idToken');

  return fetch(process.env.REACT_APP_API_URL + `/vehicles/images/${imageId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res)
    .catch(err => console.log('err-create-fetch: ', err?.message));
};
