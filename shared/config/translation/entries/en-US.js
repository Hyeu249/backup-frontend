import antdEn from 'antd/lib/locale-provider/en_US';
import enMessages from '../locales/en_US.json';
import vexEnMessages from '@iso/vex_config/translation/locales/en_US.json';

const EnLang = {
  messages: {
    ...enMessages,
    ...vexEnMessages,
  },
  antd: antdEn,
  locale: 'en-US',
};
export default EnLang;
