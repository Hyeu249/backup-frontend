import { cloneDeep } from 'lodash';

export const convertTypeOfRole = rawRole => {
  const role = cloneDeep(rawRole);
  return {
    role: String(role.role || ''),
    auth_object_actions_list: Array(...(role.auth_object_actions_list || [])),
  };
};
