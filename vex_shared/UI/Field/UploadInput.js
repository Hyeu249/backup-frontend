import React, { Fragment, useState } from 'react';
import ReactDoom from 'react-dom';
import { Modal, message, Upload } from 'antd';
import { useIntl } from 'react-intl';

import { InboxOutlined } from '@ant-design/icons';

const UploadInput = ({ value, setValue, setIsEdit }) => {
  const intl = useIntl();
  const { Dragger } = Upload;

  const uploadFiles = intl.formatMessage({ id: 'text.uploadFiles' });
  const uploadText = intl.formatMessage({ id: 'text.uploadText' });
  const uploadHint = intl.formatMessage({ id: 'text.uploadHint' });
  const successUploadImage = intl.formatMessage({
    id: 'text.successUploadImage',
  });
  const errUploadImage = intl.formatMessage({ id: 'text.errUploadImage' });

  //state
  const [localImages, setLocalImages] = useState([]);

  const propsDragger = {
    name: 'file',
    multiple: true,
    onChange({ file }) {
      const { status, name } = file;
      if (status === 'done') {
        message.success(`${name} ${successUploadImage}`);
        setLocalImages(state => [...state, file]);
      }
      if (status === 'error') message.error(`${name} ${errUploadImage}`);
    },
    onDrop: () => console.log('Dropped files', e.dataTransfer.files),
    customRequest: req => req.onSuccess(),
  };

  return (
    <Fragment>
      {ReactDoom.createPortal(
        <Modal
          title={uploadFiles}
          visible={true}
          width={500}
          onOk={() => {
            setValue(state => [...state, ...localImages]);
            setIsEdit(false);
          }}
          onCancel={e => {
            if (['svg', 'SPAN', 'BUTTON'].includes(e?.target?.tagName)) {
              setIsEdit(false);
            }
          }}
        >
          <Dragger {...propsDragger}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">{uploadText}</p>
            <p className="ant-upload-hint">{uploadHint}</p>
          </Dragger>
        </Modal>,
        document.getElementById('modal-root')
      )}
    </Fragment>
  );
};

export default UploadInput;
