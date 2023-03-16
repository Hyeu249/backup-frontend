import { cloneDeep } from 'lodash';

export const convertTypeOfDriver = rawDriver => {
  const driver = cloneDeep(rawDriver);
  return {
    first_name: String(driver.first_name || ''),
    last_name: String(driver.last_name || ''),
    date_of_birth: String(driver.date_of_birth || ''),
    national_id_card_no: String(driver.national_id_card_no || ''),
    tax_id: String(driver.tax_id || ''),
    address: String(driver.address || ''),
    phone: String(driver.phone || ''),
    email: String(driver.email || ''),
    join_date: String(driver.join_date || ''),
    exit_date: String(driver.exit_date || ''),
    advance_payment_limit: Number(driver.advance_payment_limit || 0),
    advance_payment_amount: Number(driver.advance_payment_amount || 0),
    deposit_amount: Number(driver.deposit_amount || 0),
    driver_deposit_type_id: String(driver.driver_deposit_type_id || ''),
  };
};

export const convertTypeOfDriverDocument = rawDriver => {
  const driver = cloneDeep(rawDriver);
  return {
    driver_document_type_id: String(driver.driver_document_type_id || ''),
    issued_by: String(driver.issued_by || ''),
    issue_date: String(driver.issue_date || ''),
    expiry_date: String(driver.expiry_date || ''),
  };
};
