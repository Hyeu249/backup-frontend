import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Modal } from 'antd';
import { cloneDeep } from 'lodash';
import { useParams } from 'react-router-dom';

import '@iso/cra/src/index.css';
import { ExclamationCircleFilled } from '@ant-design/icons';
import actions from '@iso/vex_redux/driver/service/driverDocument/actions';
import ModalTemplate from '@iso/vex_components/ModalTemplate/ModalTemplate';

import useRawFields from '../hook/useRawFields.js';

const CreateModal = ({ open, setOpen }) => {
  const { confirm } = Modal;
  const intl = useIntl();
  const { createDriverDocument } = actions;

  const dispatch = useDispatch();
  const { rawFields } = useRawFields();
  const { id } = useParams();

  //confirm and dispatch create driverDocument action
  function confirmCreateDriverDocumentHandle() {
    const raw = this;
    const driverDocumentData = cloneDeep(raw);
    driverDocumentData.result.driver_id = id;

    confirm({
      title: intl.formatMessage({
        id: 'text.confirm.driverDocumentConfirmCreate',
      }),
      icon: <ExclamationCircleFilled />,
      content: intl.formatMessage({
        id: 'text.confirm.driverDocumentDescriptionCreate',
      }),
      okText: intl.formatMessage({ id: 'text.ok' }),
      cancelText: intl.formatMessage({ id: 'text.cancel' }),
      onOk() {
        dispatch(createDriverDocument(driverDocumentData));
      },
      onCancel() {
        setOpen(true);
      },
    });
  }

  return (
    <React.Fragment>
      <ModalTemplate
        open={open}
        setOpen={setOpen}
        titleModal={intl.formatMessage({
          id: 'text.createDriverDocument',
        })}
        okModal={intl.formatMessage({ id: 'text.create' })}
        isAllowEdit={true}
        confirmHandle={confirmCreateDriverDocumentHandle}
        rawFields={rawFields}
      />
    </React.Fragment>
  );
};

export default CreateModal;
