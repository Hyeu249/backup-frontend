import { combineReducers } from 'redux';
import App from '@iso/redux/app/reducer';
import Auth from '@iso/redux/auth/reducer';
import Mails from '@iso/redux/mail/reducer';
import Calendar from '@iso/redux/calendar/reducer';
import Box from '@iso/redux/box/reducer';
import Notes from '@iso/redux/notes/reducer';
import Todos from '@iso/redux/todos/reducer';
import Contacts from '@iso/redux/contacts/reducer';
import Cards from '@iso/redux/card/reducer';
import Chat from '@iso/redux/chat/reducers';
import DynamicChartComponent from '@iso/redux/dynamicEchart/reducer';
import Ecommerce from '@iso/redux/ecommerce/reducer';
import ThemeSwitcher from '@iso/redux/themeSwitcher/reducer';
import Invoices from '@iso/redux/invoice/reducer';
import LanguageSwitcher from '@iso/redux/languageSwitcher/reducer';
import YoutubeSearch from '@iso/redux/youtubeSearch/reducers';
import Articles from '@iso/redux/articles/reducers';
import Investors from '@iso/redux/investors/reducers';
import scrumBoard from '@iso/redux/scrumBoard/reducer';
import drawer from '@iso/redux/drawer/reducer';
import modal from '@iso/redux/modal/reducer';
import profile from '@iso/redux/profile/reducer';
import githubSearch from '@iso/redux/githubSearch/reducers';
import quiz from '@iso/redux/quiz/reducer';
import vehicle from '@iso/vex_redux/vehicle/reducer';
import driver from '@iso/vex_redux/driver/reducer';
import tyre from '@iso/vex_redux/tyre/reducer';
import driverDocumentType from '@iso/vex_redux/driverDocumentType/reducer';
import driverDepositType from '@iso/vex_redux/driverDepositType/reducer';
import vehicleType from '@iso/vex_redux/vehicleType/reducer';
import assetWarehouse from '@iso/vex_redux/assetWarehouse/reducer';
import maintenanceType from '@iso/vex_redux/maintenanceType/reducer';
import equipment from '@iso/vex_redux/equipment/reducer';
import equipmentGroup from '@iso/vex_redux/equipmentGroup/reducer';
import supplier from '@iso/vex_redux/supplier/reducer';
import contract from '@iso/vex_redux/contract/reducer';
import fuelRequest from '@iso/vex_redux/fuelRequest/reducer';
import serviceType from '@iso/vex_redux/serviceType/reducer';
import supplierQuote from '@iso/vex_redux/supplierQuote/reducer';
import fuel from '@iso/vex_redux/fuel/reducer';
import fuelPriceQuote from '@iso/vex_redux/fuelPriceQuote/reducer';
import tyrePriceQuote from '@iso/vex_redux/tyrePriceQuote/reducer';
import tyreServiceRequest from '@iso/vex_redux/tyreServiceRequest/reducer';
import vehicleDocumentType from '@iso/vex_redux/vehicleDocumentType/reducer';
import equipmentServiceRequest from '@iso/vex_redux/equipmentServiceRequest/reducer';
import serviceRequest from '@iso/vex_redux/serviceRequest/reducer';
import role from '@iso/vex_redux/role/reducer';
import roleOfUser from '@iso/vex_redux/roleOfUser/reducer';

export default combineReducers({
  vehicle,
  driver,
  tyre,
  driverDocumentType,
  driverDepositType,
  vehicleType,
  assetWarehouse,
  maintenanceType,
  equipment,
  equipmentGroup,
  supplier,
  contract,
  fuelRequest,
  serviceType,
  supplierQuote,
  fuel,
  fuelPriceQuote,
  tyrePriceQuote,
  tyreServiceRequest,
  vehicleDocumentType,
  equipmentServiceRequest,
  serviceRequest,
  role,
  roleOfUser,
  //
  Auth,
  //
  App,
  ThemeSwitcher,
  LanguageSwitcher,
  Mails,
  Calendar,
  Box,
  Notes,
  Todos,
  Contacts,
  Cards,
  Chat,
  DynamicChartComponent,
  Ecommerce,
  Invoices,
  YoutubeSearch,
  Articles,
  Investors,
  scrumBoard,
  modal,
  drawer,
  profile,
  githubSearch,
  quiz,
});
