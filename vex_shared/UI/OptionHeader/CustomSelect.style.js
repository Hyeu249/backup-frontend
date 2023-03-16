import styled from 'styled-components';
import WithDirection from '@iso/lib/helpers/rtl';

const DocumentSelectWrapper = styled.div`
  .ant-select {
    border: 1px solid #dadada !important;
  }

  .ant-select:has(.ant-select-selection-search-input:focus) {
    box-shadow: 0px 0px 0px 3px #63c2ff66 !important;
  }

  .ant-select-selection-search {
    height: 28px !important;
  }
  .ant-select-selection-search-input {
    height: 28px !important;
  }
  .ant-select-selection-placeholder {
    line-height: 30.5px !important;
    height: 28px !important;
  }

  .ant-select-arrow {
    top: 37%;
    width: 20px;
    height: 20px;
  }

  .ant-select-selection-item {
    line-height: 28px !important;
    height: 28px !important;
  }
`;

export default WithDirection(DocumentSelectWrapper);
