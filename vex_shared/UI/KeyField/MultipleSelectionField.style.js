import styled from 'styled-components';
import WithDirection from '@iso/lib/helpers/rtl';

const MultipleSelectionFieldWrapper = styled.div`
  width: 66.666667%;
  //   height: 21.5px;
  min-height: 34px;
  height: auto;
  font-size: 13px;
  color: #262c2d;
  border-radius: 5px;
  box-sizing: border;
  outline: none;
  border: 1px solid #6cbdff;
  box-shadow: 0px 0px 0px 3px #63c2ff66;
  line-height: 20px;

  .multipleSelectionField {
    width: 100%;
  }

  .ant-select {
    .ant-select-selection-overflow {
      .ant-select-selection-overflow-item {
        .ant-select-selection-item {
          border: 1px solid #cdcdcd;
        }
      }
    }
  }

  .ant-select-selector {
    height: auto !important;
  }
`;

export default WithDirection(MultipleSelectionFieldWrapper);
