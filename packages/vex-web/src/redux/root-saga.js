import { all } from 'redux-saga/effects';
import authSagas from '@iso/redux/auth/saga';
import contactSagas from '@iso/redux/contacts/saga';
import invoicesSagas from '@iso/redux/invoice/saga';
import mailSagas from '@iso/redux/mail/saga';
import notesSagas from '@iso/redux/notes/saga';
import todosSagas from '@iso/redux/todos/saga';
import ecommerceSaga from '@iso/redux/ecommerce/saga';
import cardsSagas from '@iso/redux/card/saga';
import chatSagas from '@iso/redux/chat/sagas';
import youtubeSearchSagas from '@iso/redux/youtubeSearch/sagas';
import githubSagas from '@iso/redux/githubSearch/sagas';
import articles from '@iso/redux/articles/sagas';
import investors from '@iso/redux/investors/sagas';
import scrumBoardSaga from '@iso/redux/scrumBoard/saga';
import profileSaga from '@iso/redux/profile/saga';
import quizSaga from '@iso/redux/quiz/saga';
import vehicleSage from '@iso/vex_redux/vehicle/saga';
import driverSage from '@iso/vex_redux/driver/saga';
import tyreSage from '@iso/vex_redux/tyre/saga';
import driverDocumentType from '@iso/vex_redux/driverDocumentType/saga';
import driverDepositType from '@iso/vex_redux/driverDepositType/saga';
import vehicleType from '@iso/vex_redux/vehicleType/saga';
import assetWarehouse from '@iso/vex_redux/assetWarehouse/saga';
import maintenanceType from '@iso/vex_redux/maintenanceType/saga';
import equipment from '@iso/vex_redux/equipment/saga';
import equipmentGroup from '@iso/vex_redux/equipmentGroup/saga';
import supplier from '@iso/vex_redux/supplier/saga';
import contract from '@iso/vex_redux/contract/saga';
import fuelRequest from '@iso/vex_redux/fuelRequest/saga';
import serviceType from '@iso/vex_redux/serviceType/saga';
import supplierQuote from '@iso/vex_redux/supplierQuote/saga';
import fuel from '@iso/vex_redux/fuel/saga';
import fuelPriceQuote from '@iso/vex_redux/fuelPriceQuote/saga';
import tyrePriceQuote from '@iso/vex_redux/tyrePriceQuote/saga';
import tyreServiceRequest from '@iso/vex_redux/tyreServiceRequest/saga';
import vehicleDocumentType from '@iso/vex_redux/vehicleDocumentType/saga';
import equipmentServiceRequest from '@iso/vex_redux/equipmentServiceRequest/saga';
import serviceRequest from '@iso/vex_redux/serviceRequest/saga';
import role from '@iso/vex_redux/role/saga';
import roleOfUser from '@iso/vex_redux/roleOfUser/saga';

export default function* rootSaga(getState) {
  yield all([
    vehicleSage(),
    driverSage(),
    tyreSage(),
    driverDocumentType(),
    driverDepositType(),
    vehicleType(),
    assetWarehouse(),
    maintenanceType(),
    equipment(),
    equipmentGroup(),
    supplier(),
    contract(),
    fuelRequest(),
    serviceType(),
    supplierQuote(),
    fuel(),
    fuelPriceQuote(),
    tyrePriceQuote(),
    tyreServiceRequest(),
    vehicleDocumentType(),
    equipmentServiceRequest(),
    serviceRequest(),
    role(),
    roleOfUser(),
    //
    authSagas(),
    //
    contactSagas(),
    mailSagas(),
    notesSagas(),
    todosSagas(),
    ecommerceSaga(),
    cardsSagas(),
    invoicesSagas(),
    chatSagas(),
    youtubeSearchSagas(),
    githubSagas(),
    articles(),
    investors(),
    scrumBoardSaga(),
    profileSaga(),
    quizSaga(),
  ]);
}
