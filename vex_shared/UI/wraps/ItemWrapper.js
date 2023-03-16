import styled from 'styled-components';
import WithDirection from '@iso/lib/helpers/rtl';

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  :hover {
    background-color: #e4f4ff;
    border-radius: 5px;
  }
  cursor: pointer;
`;

export default WithDirection(ItemWrapper);
