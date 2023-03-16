import { cloneDeep } from 'lodash';

export const convertTypeOfSupplier = rawSupplier => {
  const supplier = cloneDeep(rawSupplier);
  return {
    name: String(supplier.name || ''),
    agent_name: String(supplier.agent_name || ''),
    address: String(supplier.address || ''),
    supply_type: String(supplier.supply_type || ''),
    additional_option: String(supplier.additional_option || ''),
    phone: String(supplier.phone || ''),
    email: String(supplier.email || ''),
  };
};
