import React, { useState } from 'react';
import ReactDoom from 'react-dom';
import { Modal, Upload } from 'antd';
import classess from './EditLayer.module.css';

import EditPenIcon from '@iso/vex_config/icon/EditPenIcon';

const getBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

const FileLayer = ({
  value,
  setValue,
  setIsEdit,
  setIsAllowEdit,
  err,
  font_name,
  setErrFields,
  field_name,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    );
  };

  let color;
  let border;
  let renderValue;
  const isHaveErr = err.length > 0;
  if (isHaveErr) {
    renderValue = err;
    color = 'red';
    border = '1px solid red';
  }

  return (
    <div
      className={`${classess.field_hover} flex-space-between`}
      style={{
        position: 'relative',
        width: '66.666667%',
        height: value?.length === 0 ? '21.5px' : '',
        alignItems: 'center',
        borderRadius: '5px',
      }}
    >
      {isHaveErr && (
        <ErrTextRender
          color={color}
          text={renderValue}
          font_name={font_name}
          border={border}
        />
      )}
      <EditPenIcon
        style={{
          display: 'none',
          position: 'absolute',
          top: '50%',
          right: '-2.5px',
          transform: 'translate(-50%, -50%)',
          userSelect: 'none',
        }}
        className={classess.pencil_hover}
        onClick={() => {
          setErrFields(errs => {
            if (field_name === '') return errs;
            return { ...errs, [field_name]: false };
          });
          setIsEdit(true);
          setIsAllowEdit(true);
        }}
      />
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={value}
        onChange={({ fileList: newFileList }) => {
          setIsAllowEdit(true);
          setValue(newFileList);
        }}
        onPreview={handlePreview}
        openFileDialogOnClick={false}
      ></Upload>
      <PreviewModal
        open={previewOpen}
        title={previewTitle}
        image={previewImage}
        setPreviewOpen={setPreviewOpen}
      />
    </div>
  );
};

function PreviewModal({ open, title, image, setPreviewOpen }) {
  return (
    <>
      {ReactDoom.createPortal(
        <Modal
          visible={open}
          title={title}
          footer={null}
          onCancel={() => setPreviewOpen(false)}
        >
          <img
            alt="example"
            style={{
              width: '100%',
            }}
            src={image}
          />
        </Modal>,
        document.getElementById('modal-root')
      )}
    </>
  );
}

export default FileLayer;

function ErrTextRender({ text, font_name, color, border }) {
  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        height: '21.5px',
        fontFamily: font_name,
        fontSize: '13px',
        color: color,
        borderRadius: '5px',
        boxSizing: 'border',
        padding: '0px 25px 0px 10px',
        border: border,
      }}
    >
      {text}
    </div>
  );
}
