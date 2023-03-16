import React, { useEffect } from 'react';
import { cloneDeep } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import RightSideBar from '@iso/vex_components/EditOverall/RightSideBar';
import { IMAGE } from '@iso/vex_containers/constants';
import actions from '@iso/vex_redux/tyreServiceRequest/service/tyreServiceRequest/actions';
import ImageIcon from '@iso/vex_config/icon/ImageIcon';

import EditTyreServiceRequest from './EditTyreServiceRequest/EditTyreServiceRequest';
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
  const viewedTyreServiceRequest = cloneDeep(
    useSelector(state => state.tyreServiceRequest.viewedTyreServiceRequest)
  );
  const isHaveViewedTyreServiceRequest =
    Object.keys(viewedTyreServiceRequest).length > 0;

  useEffect(() => {
    dispatch(initEditData({ tyreServiceRequestID: id }));
    return () => {
      dispatch(removeEditData());
    };
  }, []);

  return isHaveViewedTyreServiceRequest ? (
    <div>
      <Header />
      <Content>
        <LeftContent>
          <EditTyreServiceRequest />
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
