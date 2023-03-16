import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';

import actions from '@iso/vex_redux/tyre/service/images/actions';
import CustomDropDown from '@iso/vex_ui/CustomDropdown/CustomDropdown';

import ThreeDotIcon from '@iso/vex_config/icon/ThreeDotIcon';
import { Image as AtndImage } from 'antd';
import ImageWrapper from './image.style';

const Item = ({ data, setEditOpen }) => {
  const font_name = `-apple-system,BlinkMacSystemFont,Avenir Next,Avenir,Segoe UI,Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol`;

  const intl = useIntl();
  const dispatch = useDispatch();
  const { deleteTyreImage } = actions;

  let textName = data.label;
  if (textName.length > 20) {
    textName = textName.substring(0, 20) + '...';
  }
  return (
    <div onClick={() => {}} style={{ paddingBottom: '15px' }}>
      <Image src={data.url} />
      <div className="flex-spbt-alct">
        <div
          style={{
            color: '#262c2d',
            fontSize: '13px',
            fontFamily: font_name,
          }}
        >
          {textName}
        </div>
        <CustomDropDown
          menu={[
            {
              title: intl.formatMessage({
                id: 'text.deleteImage',
              }),
              onClick: e => dispatch(deleteTyreImage(data.id)),
              Icon: (
                <div style={{ color: '#636f73', marginLeft: '20px' }}></div>
              ),
            },
          ]}
        >
          <ThreeDotIcon
            styleDiv={{
              height: '20px',
              width: '20px',
              borderRadius: '8px',
              marginLeft: 'auto',
              userSelect: 'none',
            }}
            onClick={e => e.stopPropagation()}
          />
        </CustomDropDown>
      </div>
    </div>
  );
};

export default Item;

function Image({ src }) {
  const [visible, setVisible] = useState(false);
  return (
    <ImageWrapper>
      <AtndImage
        style={{
          backgroundImage: `url(${src})`,
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          height: '125px',
          borderRadius: '5px',
        }}
        width={'100%'}
        preview={{
          visible,
          src: src,
          onVisibleChange: value => {
            setVisible(value);
          },
        }}
      />
    </ImageWrapper>
  );
}
