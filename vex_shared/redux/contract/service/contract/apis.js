import { getToken } from '@iso/lib/helpers/utility';

export const getContractsApi = () => {
  const token = getToken().get('idToken');

  return fetch(process.env.REACT_APP_API_URL + '/suppliers/contracts', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(res => res)
    .catch(err => console.log('initData: ', err?.message));
};

export const getContractByIdApi = contractID => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL + `/suppliers/contracts/${contractID}`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    }
  )
    .then(res => res)
    .catch(err => console.log('initData: ', err?.message));
};

export const insertContractApi = contract => {
  const token = getToken().get('idToken');

  return fetch(process.env.REACT_APP_API_URL + '/suppliers/contracts', {
    method: 'POST',
    body: JSON.stringify(contract),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then(res => res)
    .catch(err => console.log('err-create-fetch: ', err?.message));
};

export const updateContractApi = (fieldsNeedToUpdate, id) => {
  const token = getToken().get('idToken');

  return fetch(process.env.REACT_APP_API_URL + `/suppliers/contracts/${id}`, {
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

export const deleteContractApi = id => {
  const token = getToken().get('idToken');

  return fetch(process.env.REACT_APP_API_URL + `/suppliers/contracts/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res)
    .catch(err => console.log('err-create-fetch: ', err?.message));
};

export const approveContractApi = ({ id, is_approved }) => {
  const token = getToken().get('idToken');
  return fetch(
    process.env.REACT_APP_API_URL + `/suppliers/contracts/${id}/approve`,
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

export const getContractsApprovalStatusListApi = (ids = []) => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL +
      `/suppliers/contracts/approval-status?contract_id_list=${ids[0]}`,
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
