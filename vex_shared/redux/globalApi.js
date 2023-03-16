import { getToken } from '@iso/lib/helpers/utility';

export const getApproversByObjectApi = object => {
  const token = getToken().get('idToken');

  return fetch(
    process.env.REACT_APP_API_URL +
      `/authorization-management/${object}/available-approvers`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    }
  )
    .then(res => res)
    .catch(err => console.log('initData: ', err?.message));
};
