import { put, call, select } from 'redux-saga/effects';
import { cloneDeep } from 'lodash';

import notification from '@iso/components/Notification';

import actions from './actions';
import {
  getContractsApi,
  insertContractApi,
  updateContractApi,
  deleteContractApi,
  getContractByIdApi,
  approveContractApi,
  getContractsApprovalStatusListApi,
  //
} from './apis';
import { getApproversByObjectApi } from '@iso/vex_redux/globalApi';

import { getSuppliersApi } from '@iso/vex_redux/supplier/service/supplier/apis';

import { convertTypeOfContract } from '@iso/vex_redux/contract/helpFunction';
import {
  addKeyByIdToObjectArray,
  getFieldsNeedToUpdate,
  callSetErrFieldsWhenHaveErr,
  toValueLabelObjectArray,
  jsonApi,
} from '@iso/vex_redux/helpFunction';

import errorCode from '@iso/vex_redux/error_code.json';

//var
const SUCCESS = 200;
const BAD_REQUEST = 400;

export function* getContracts() {
  const res = yield call(getContractsApi);

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const ids = value?.result?.map(v => v.id);
    const statusRes = yield call(getContractsApprovalStatusListApi, ids);
    const statusApprover = yield call(jsonApi, statusRes);

    const contracts = addKeyByIdToObjectArray(value?.result);
    yield put({ type: actions.LOAD_CONTRACT, contracts });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* getSuppliers() {
  const res = yield call(getSuppliersApi);

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const suppliers = toValueLabelObjectArray(value?.result);
    yield put({ type: actions.LOAD_SUPPLIER_IN_CONTRACT, suppliers });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* insertContract({ payload }) {
  const contract = convertTypeOfContract({ rawContract: payload.result });
  const setErrFields = payload.setErrFields;
  const setOpen = payload.setOpen;
  //api call
  const res = yield call(insertContractApi, contract);

  if (res?.status === SUCCESS) {
    //Success response
    notification('success', 'Tạo dữ liệu thành công');
    setOpen(false);
    yield put({ type: actions.GET_CONTRACT });
  } else {
    const { locale } = yield select(state => state.LanguageSwitcher.language);
    const value = yield call(jsonApi, res);
    const message = JSON.parse(value.message);
    const localErrorCodes = errorCode.errors;
    const isHaveField = localErrorCodes[message.error_code].field !== undefined;

    if (isHaveField) {
      const field = localErrorCodes[message.error_code].field;
      let text = message[locale];
      if (message[locale].length > 40) {
        text = message[locale].substring(0, 40) + '...';
      }

      setErrFields({
        [field]: text,
      });
    }
    notification('error', message[locale]);
  }
}

export function* updateContract({ payload }) {
  //declare variables
  const setErrFields = payload.setErrFields;
  const setOpen = payload.setOpen;
  let { viewedContract } = yield select(state => state.contract);
  const oldContract = convertTypeOfContract({
    rawContract: viewedContract,
    listId: false,
  });
  const contract = convertTypeOfContract({
    rawContract: payload.result,
    listId: false,
  });

  //check if there are fields need to update
  const fieldsNeedToUpdate = getFieldsNeedToUpdate(contract, oldContract);
  fieldsNeedToUpdate.approver_id_list = payload.result.approver_id_list;

  //return if there are no fields to update
  if (Object.keys(fieldsNeedToUpdate).length === 0) {
    setOpen(false);
    return notification('success', 'Không có trường cần update!');
  }

  //call update api if there are fields need to update
  const res = yield call(
    updateContractApi,
    fieldsNeedToUpdate,
    viewedContract.id
  );

  if (res?.status === SUCCESS) {
    notification('success', 'Sửa dữ liệu thành công');
    setOpen(false);
    yield put({
      type: actions.SET_VIEWED_CONTRACT,
      payload: { contractID: viewedContract.id },
    });
  } else {
    const { locale } = yield select(state => state.LanguageSwitcher.language);
    const value = yield call(jsonApi, res);
    const message = JSON.parse(value.message);
    const localErrorCodes = errorCode.errors;
    const isHaveField = localErrorCodes[message.error_code].field !== undefined;

    if (isHaveField) {
      const field = localErrorCodes[message.error_code].field;
      let text = message[locale];
      if (message[locale].length > 40) {
        text = message[locale].substring(0, 40) + '...';
      }

      setErrFields({
        [field]: text,
      });
    }
    notification('error', message[locale]);
  }
}

export function* deleteContract(a) {
  //api
  const res = yield call(deleteContractApi, a.contractID);

  if (res?.status === SUCCESS) {
    notification('success', 'Xóa dữ liệu thành công');
    yield put({ type: actions.GET_CONTRACT });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* viewedContract({ payload }) {
  const contractID = payload.contractID;
  const res = yield call(getContractByIdApi, contractID);
  if (res.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const result = cloneDeep(value.result);
    // //assign approver_id_list
    result.approver_id_list = result.approver_list.map(
      approver => approver.user_id
    );
    const contract = convertTypeOfContract({ rawContract: result });
    contract.id = payload.contractID;
    contract.approver = result.approver_list;

    yield put({
      type: actions.UPDATE_VIEWED_CONTRACT,
      viewedContract: contract,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* approveContract(payload) {
  //api
  const res = yield call(approveContractApi, payload);

  if (res?.status === SUCCESS) {
    notification('success', 'Xử lý thành công');
    yield put({ type: actions.GET_CONTRACT });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}

export function* getApproverOptions() {
  const res = yield call(getApproversByObjectApi, 'contract');

  if (res?.status === SUCCESS) {
    const value = yield call(jsonApi, res);
    const approvers = toValueLabelObjectArray(
      value?.result?.map(raw => {
        raw.name = raw.fullname.split('(')[0];
        return raw;
      })
    );
    yield put({
      type: actions.LOAD_APPROVER_IN_CONTRACT,
      approvers,
    });
  } else {
    notification('error', 'Đã xãy ra lỗi, vui lòng liên hệ kỹ thuật');
  }
}
