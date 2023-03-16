import styled from 'styled-components';
import WithDirection from '@iso/lib/helpers/rtl';

const EditTemplateWrapper = styled.div`
  width: calc(100vw - 750px);
  border-radius: 8px;
  border: 1px solid #e8e8e8;
  background-color: #ffffff;
  box-sizing: border-box;
  padding: 20px;
`;

export default WithDirection(EditTemplateWrapper);
