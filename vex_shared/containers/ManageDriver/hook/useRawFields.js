import React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { STRING, EMAIL, DATE, NUMBER } from '@iso/vex_containers/constants';

const useRawFields = () => {
  const intl = useIntl();
  const depositTypes = useSelector(state => state.driver.depositTypes);

  //field texts
  const firstNameIntl = intl.formatMessage({ id: 'text.firstName' });
  const lastNameIntl = intl.formatMessage({ id: 'text.lastName' });
  const dateOfBirthIntl = intl.formatMessage({ id: 'text.dateOfBirth' });
  const CCCDIntl = intl.formatMessage({ id: 'text.CCCD' });
  const taxIdIntl = intl.formatMessage({ id: 'text.taxId' });
  const addressIntl = intl.formatMessage({ id: 'page.address' });
  const phoneIntl = intl.formatMessage({ id: 'page.phone' });
  const emailIntl = intl.formatMessage({ id: 'page.email' });
  const joinDateIntl = intl.formatMessage({ id: 'text.joinDate' });
  const exitDateIntl = intl.formatMessage({ id: 'text.exitDate' });

  const advancePaymentLimitIntl = intl.formatMessage({
    id: 'text.advance_payment_limit',
  });
  const advancePaymentAmountIntl = intl.formatMessage({
    id: 'text.advance_payment_amount',
  });
  const depositAmountIntl = intl.formatMessage({ id: 'text.deposit_amount' });

  const depositTypeIntl = intl.formatMessage({ id: 'text.deposit_type' });

  const rawFields = {
    first_name: {
      type: STRING,
      validate: { required: true },
      intl: firstNameIntl,
    },
    last_name: {
      type: STRING,
      validate: { required: true },
      intl: lastNameIntl,
    },
    date_of_birth: {
      type: DATE,
      validate: { required: true },
      intl: dateOfBirthIntl,
    },
    national_id_card_no: {
      type: STRING,
      validate: { required: true },
      intl: CCCDIntl,
    },
    tax_id: {
      type: STRING,
      validate: { required: true },
      intl: taxIdIntl,
    },
    address: {
      type: STRING,
      validate: { required: true },
      intl: addressIntl,
    },
    phone: {
      type: STRING,
      validate: { required: true },
      intl: `${phoneIntl}(*)`,
    },
    email: {
      type: EMAIL,
      validate: { required: true },
      intl: emailIntl,
    },
    join_date: {
      type: DATE,
      validate: { required: true },
      intl: joinDateIntl,
    },
    exit_date: {
      type: DATE,
      validate: null,
      intl: exitDateIntl,
    },
    advance_payment_limit: {
      type: NUMBER,
      validate: { required: true },
      intl: advancePaymentLimitIntl,
      inputType: 'number',
    },
    advance_payment_amount: {
      type: NUMBER,
      validate: { required: true, gte: 0 },
      intl: advancePaymentAmountIntl,
      inputType: 'number',
    },
    deposit_amount: {
      type: NUMBER,
      validate: { required: true, gte: 0 },
      intl: depositAmountIntl,
      inputType: 'number',
    },
    driver_deposit_type_id: {
      type: STRING,
      validate: { required: true },
      intl: depositTypeIntl,
      fieldType: 'select',
      options: depositTypes,
    },
  };
  return { rawFields };
};

export default useRawFields;
