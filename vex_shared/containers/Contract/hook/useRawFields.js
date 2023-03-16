import React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { STRING, DATE, BOOLEAN, LIST } from '@iso/vex_containers/constants';

import { trueFalseOptions } from '../../defaultOptions';

const useRawFields = () => {
  const intl = useIntl();
  const suppliers = useSelector(state => state.contract.suppliers);
  const approverOptions = useSelector(state => state.contract.approverOptions);

  //field texts
  const nameIntl = intl.formatMessage({ id: 'text.contractName' });
  const validFromIntl = intl.formatMessage({ id: 'text.contractValidFrom' });
  const validUntilIntl = intl.formatMessage({ id: 'text.contractValidUntil' });
  const gracePeriodIntl = intl.formatMessage({
    id: 'text.contractGracePeriod',
  });
  const typeOfPurchaseIntl = intl.formatMessage({
    id: 'text.contractTypeOfPurchase',
  });
  const noteIntl = intl.formatMessage({ id: 'text.contractNote' });
  const isInHandIntl = intl.formatMessage({ id: 'text.contractIsInHand' });
  const supplierIdIntl = intl.formatMessage({ id: 'text.contractSupplierId' });
  const approverIdListIntl = intl.formatMessage({
    id: 'text.contractApproverIdList',
  });

  const rawFields = {
    name: {
      type: STRING,
      validate: { required: true },
      intl: nameIntl,
    },
    valid_from: {
      type: DATE,
      validate: null,
      intl: validFromIntl,
    },
    valid_until: {
      type: DATE,
      validate: null,
      intl: validUntilIntl,
    },
    grace_period: {
      type: STRING,
      validate: { required: true },
      intl: gracePeriodIntl,
    },
    type_of_purchase: {
      type: STRING,
      validate: { required: true },
      intl: typeOfPurchaseIntl,
    },
    note: {
      type: STRING,
      validate: { required: true },
      intl: noteIntl,
    },
    is_in_hand: {
      type: BOOLEAN,
      validate: { required: true },
      intl: isInHandIntl,
      fieldType: 'select',
      options: trueFalseOptions,
    },
    supplier_id: {
      type: STRING,
      validate: { required: true },
      intl: supplierIdIntl,
      fieldType: 'select',
      options: suppliers,
    },
    approver_id_list: {
      type: LIST,
      validate: { required: true },
      intl: approverIdListIntl,
      fieldType: 'multiple select',
      options: approverOptions,
      defaultValue: [],
    },
  };
  return { rawFields };
};

export default useRawFields;
