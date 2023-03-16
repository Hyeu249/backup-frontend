export const errText = {
  EMPTY: 'EMPTY',
  NaT: 'NaT',
  NAN: 'NAN',
  NaB: 'NaB',
  NaE: 'NaE',
  NOT_GTE_ZERRO: 'NOT_GTE_ZERRO',
  EMAIL_AREADY_EXISTS: 'EMAIL_AREADY_EXISTS',
  PHONE_AREADY_EXISTS: 'PHONE_AREADY_EXISTS',
  CCCD_AREADY_EXISTS: 'CCCD_AREADY_EXISTS',
  TAX_ID_AREADY_EXISTS: 'TAX_ID_AREADY_EXISTS',
};

const {
  EMAIL_AREADY_EXISTS,
  PHONE_AREADY_EXISTS,
  CCCD_AREADY_EXISTS,
  TAX_ID_AREADY_EXISTS,
} = errText;

export const convertTypeOfVehicleType = vehicleType => {
  return {
    name: String(vehicleType.name || ''),
    description: String(vehicleType.description || ''),
  };
};

export function callSetErrFieldsWhenHaveErr(message, setErrFields) {
  const messageSplit = message?.split(' ')?.map(v => v.toLowerCase()) || [];
  const field = ['email', 'phone', 'tax_id', 'national_id_card_no'];
  const errFields = {
    email: EMAIL_AREADY_EXISTS,
    phone: PHONE_AREADY_EXISTS,
    tax: TAX_ID_AREADY_EXISTS,
    national: CCCD_AREADY_EXISTS,
  };
  Object.keys(errFields).forEach((text, i) => {
    if (messageSplit?.includes(text)) {
      setErrFields({
        [field[i]]: errFields[text],
      });
    }
  });
}

export function addKeyByIdToObjectArray(array) {
  if (array?.length === 0) return [];
  return (
    array?.map(d => {
      d.key = d.id;
      return d;
    }) || []
  );
}

export function toValueLabelObjectArray(array) {
  const newArray = [];

  array?.forEach(d => {
    newArray.push({
      value: d.id,
      label: d.name,
    });
  });

  return newArray;
}

export const getFieldsNeedToUpdate = (vehicleType, oldVehicleType) => {
  if (!vehicleType || !oldVehicleType) return {};
  const getEditedFields = Object.keys(vehicleType).filter(v => {
    return vehicleType[v] !== oldVehicleType[v];
  });
  const fieldsNeedToUpdate = {};
  getEditedFields.forEach(key => {
    fieldsNeedToUpdate[key] = vehicleType[key];
  });
  return fieldsNeedToUpdate;
};
