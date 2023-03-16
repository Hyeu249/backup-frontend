import React, { useEffect } from 'react';
import { cloneDeep } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import RightSideBar from '@iso/vex_components/EditOverall/RightSideBar';
import { IMAGE } from '@iso/vex_containers/constants';
import actions from '@iso/vex_redux/contract/service/contract/actions';
import ImageIcon from '@iso/vex_config/icon/ImageIcon';

import EditContract from './EditContract/EditContract';
import ImageItems from './Imageitems/ImageItems';

import {
  Header,
  Content,
  LeftContent,
  RightContent,
} from '@iso/vex_components/EditOverall/EditOverallStuff';

const EditOverall = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { initEditData, removeEditData } = actions;

  const [whatRightContent, setWhatRightContent] = React.useState(IMAGE);
  const viewedContract = cloneDeep(
    useSelector(state => state.contract.viewedContract)
  );
  const isHaveViewedContract = Object.keys(viewedContract).length > 0;

  useEffect(() => {
    dispatch(initEditData({ contractID: id }));
    return () => {
      dispatch(removeEditData());
    };
  }, []);

  return isHaveViewedContract ? (
    <div>
      <Header />
      <Content>
        <LeftContent>
          <EditContract />
        </LeftContent>
        <RightContent>
          {whatRightContent === IMAGE && <ImageItems />}
        </RightContent>
        <RightSideBar
          onClick={e => setWhatRightContent(e.type)}
          defaultType={IMAGE}
          options={[
            {
              type: IMAGE,
              IconLabel: ImageIcon,
            },
          ]}
        />
      </Content>
    </div>
  ) : (
    <div></div>
  );
};

export default React.memo(EditOverall);
