import styled from 'styled-components';
import WithDirection from '@iso/lib/helpers/rtl';

const EditLayerWrapper = styled.div`
  position: relative;
  width: 66.666667%;
  user-select: none;
  border-radius: 5px;
  .textAfterHovered {
    position: absolute;
    transform: translate(-20%, -30%);
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    padding: 10px;
    z-index: -5;
    transition: all 1.5s ease-in-out;
    font-family: -apple-system, BlinkMacSystemFont, 'Avenir Next', Avenir,
      'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji',
      'Segoe UI Emoji', 'Segoe UI Symbol';
  }
  :hover {
    .textAfterHovered {
      opacity: 100% !important;
      z-index: 10 !important;
    }
  }
`;

export default WithDirection(EditLayerWrapper);
