import { getToken } from '@iso/lib/helpers/utility';

//trailer
export const attachTrailerApi = (vehicleId, id) => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL + `/vehicles/${vehicleId}/trailers/${id}`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    }
  )
    .then(res => res)
    .catch(err => console.log('initData: ', err?.message));
};

export const detachTrailerApi = (vehicleId, id) => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL + `/vehicles/${vehicleId}/trailers/${id}`,
    {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    }
  )
    .then(res => res)
    .catch(err => console.log('initData: ', err?.message));
};
