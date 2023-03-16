import { getToken } from '@iso/lib/helpers/utility';

export const getTyrePriceQuotesApi = () => {
  const token = getToken().get('idToken');

  return fetch(process.env.REACT_APP_API_URL + '/tyres/price-quotes', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(res => res)
    .catch(err => console.log('initData: ', err?.message));
};

export const getTyrePriceQuoteByIdApi = tyrePriceQuoteID => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL + `/tyres/price-quotes/${tyrePriceQuoteID}`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    }
  )
    .then(res => res)
    .catch(err => console.log('initData: ', err?.message));
};

export const insertTyrePriceQuoteApi = tyrePriceQuote => {
  const token = getToken().get('idToken');

  return fetch(process.env.REACT_APP_API_URL + '/tyres/price-quotes', {
    method: 'POST',
    body: JSON.stringify(tyrePriceQuote),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then(res => res)
    .catch(err => console.log('err-create-fetch: ', err?.message));
};

export const updateTyrePriceQuoteApi = (fieldsNeedToUpdate, id) => {
  const token = getToken().get('idToken');

  return fetch(process.env.REACT_APP_API_URL + `/tyres/price-quotes/${id}`, {
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

export const deleteTyrePriceQuoteApi = id => {
  const token = getToken().get('idToken');

  return fetch(process.env.REACT_APP_API_URL + `/tyres/price-quotes/${id}`, {
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
export const approveTyrePriceQuoteApi = ({ id, is_approved }) => {
  const token = getToken().get('idToken');
  return fetch(
    process.env.REACT_APP_API_URL + `/tyres/price-quotes/${id}/approve`,
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
