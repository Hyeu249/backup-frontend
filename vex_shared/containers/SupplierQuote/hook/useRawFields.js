import React from 'react';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

import { STRING, NUMBER, LIST, DATE } from '@iso/vex_containers/constants';

const useRawFields = () => {
  const intl = useIntl();

  const equipments = useSelector(state => state.supplierQuote.equipments);
  const suppliers = useSelector(state => state.supplierQuote.suppliers);
  const serviceTypes = useSelector(state => state.supplierQuote.serviceTypes);
  const approverOptions = useSelector(
    state => state.supplierQuote.approverOptions
  );

  //field texts
  const validFromIntl = intl.formatMessage({
    id: 'text.supplierQuoteValidFrom',
  });
  const validUntilIntl = intl.formatMessage({
    id: 'text.supplierQuoteValidUntil',
  });
  const supplierIdIntl = intl.formatMessage({
    id: 'text.supplierQuoteSupplierId',
  });
  const serviceTypeIdIntl = intl.formatMessage({
    id: 'text.supplierQuoteSupplierServiceTypeId',
  });
  const equipmentIdIntl = intl.formatMessage({
    id: 'text.supplierQuoteEquipmentId',
  });
  const equipmentPriceIntl = intl.formatMessage({
    id: 'text.supplierQuoteEquipmentPrice',
  });
  const laborCostIntl = intl.formatMessage({
    id: 'text.supplierQuoteLaborCost',
  });
  const approverIdListIntl = intl.formatMessage({
    id: 'text.supplierQuoteApproverIdList',
  });

  const rawFields = {
    valid_from: {
      type: DATE,
      validate: { required: true },
      intl: validFromIntl,
    },
    valid_until: {
      type: DATE,
      validate: { required: true },
      intl: validUntilIntl,
    },
    supplier_id: {
      type: STRING,
      validate: { required: true },
      intl: supplierIdIntl,
      fieldType: 'select',
      options: suppliers,
    },
    supplier_service_type_id: {
      type: STRING,
      validate: { required: true },
      intl: serviceTypeIdIntl,
      fieldType: 'select',
      options: serviceTypes,
    },
    equipment_id: {
      type: STRING,
      validate: { required: true },
      intl: equipmentIdIntl,
      fieldType: 'select',
      options: equipments,
    },
    equipment_price: {
      type: NUMBER,
      validate: { required: true },
      intl: equipmentPriceIntl,
      inputType: 'number',
    },
    labor_cost: {
      type: NUMBER,
      validate: { required: true },
      intl: laborCostIntl,
      inputType: 'number',
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
