import { cloneDeep } from 'lodash';

export const convertTypeOfTyreServiceRequest = rawTyreServiceRequest => {
  const tyreServiceRequest = cloneDeep(rawTyreServiceRequest);
  return {
    tyre_price_quote_id: String(tyreServiceRequest.tyre_price_quote_id || ''),
    planned_service_time: String(tyreServiceRequest.planned_service_time || ''),
    actual_service_time: String(tyreServiceRequest.actual_service_time || ''),
  };
};
