//isEmpty use for string
export const isEmpty = field => field === '';
//not apply for 'string number' that have comma
export const isNotAString = field => +field || field == '0';
//not apply for 'string number' that have comma
export const isNotANumber = field => !+field && field != '0';
export const isNotEmail = field => !field.includes('@');
export const isNotGte0 = field => field <= 0;

export const isOneOfTheseNotAString = fs => fs.some(f => +f || f == '0');
export const isOneOfTheseNotANumber = fs => fs.some(f => !+f && f != '0');
export const isOneOfTheseEmpty = fields => fields.some(f => f === '');
export const isOneOfTheseNotGte0 = fields => fields.some(f => f <= 0);
