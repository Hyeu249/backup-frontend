import antdEn from 'antd/lib/locale-provider/vi_VN';
import enMessages from '../locales/vi_VN.json';
import vexEnMessages from '@iso/vex_config/translation/locales/vi_VN.json';

const EnLang = {
  messages: {
    ...enMessages,
    ...vexEnMessages,
  },
  antd: antdEn,
  locale: 'vi',
};
export default EnLang;
