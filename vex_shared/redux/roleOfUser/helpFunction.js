import { cloneDeep } from 'lodash';

export const convertTypeOfRoleOfUser = rawRoleOfUser => {
  const roleOfUser = cloneDeep(rawRoleOfUser);
  return {
    userUUID: String(roleOfUser.userUUID || ''),
    domain: String(roleOfUser.domain || ''),
  };
};
