import { getToken } from '@iso/lib/helpers/utility';

export const getSupplierQuotesApi = () => {
  const token = getToken().get('idToken');

  return fetch(process.env.REACT_APP_API_URL + '/suppliers/supplier-quotes', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(res => res)
    .catch(err => console.log('initData: ', err?.message));
};

export const getSupplierQuoteByIdApi = supplierQuoteID => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL +
      `/suppliers/supplier-quotes/${supplierQuoteID}`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    }
  )
    .then(res => res)
    .catch(err => console.log('initData: ', err?.message));
};

export const insertSupplierQuoteApi = supplierQuote => {
  const token = getToken().get('idToken');

  return fetch(process.env.REACT_APP_API_URL + '/suppliers/supplier-quotes', {
    method: 'POST',
    body: JSON.stringify(supplierQuote),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then(res => res)
    .catch(err => console.log('err-create-fetch: ', err?.message));
};

export const updateSupplierQuoteApi = (fieldsNeedToUpdate, id) => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL + `/suppliers/supplier-quotes/${id}`,
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

export const deleteSupplierQuoteApi = id => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL + `/suppliers/supplier-quotes/${id}`,
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
export const approveSupplierQuoteApi = ({ id, is_approved }) => {
  const token = getToken().get('idToken');
  return fetch(
    process.env.REACT_APP_API_URL + `/suppliers/supplier-quotes/${id}/approve`,
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
