import styled from 'styled-components';
import WithDirection from '@iso/lib/helpers/rtl';

const ImageWrapper = styled.div`
  .ant-image-mask {
    border-radius: 5px;
  }
`;

export default WithDirection(ImageWrapper);
