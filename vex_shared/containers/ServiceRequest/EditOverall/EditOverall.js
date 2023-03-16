import React, { useEffect } from 'react';
import { cloneDeep } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import RightSideBar from '@iso/vex_components/EditOverall/RightSideBar';
import { IMAGE } from '@iso/vex_containers/constants';
import actions from '@iso/vex_redux/serviceRequest/service/serviceRequest/actions';
import ImageIcon from '@iso/vex_config/icon/ImageIcon';

import EditServiceRequest from './EditServiceRequest/EditServiceRequest';
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
  const viewedServiceRequest = cloneDeep(
    useSelector(state => state.serviceRequest.viewedServiceRequest)
  );
  const isHaveViewedServiceRequest =
    Object.keys(viewedServiceRequest).length > 0;

  useEffect(() => {
    dispatch(initEditData({ serviceRequestID: id }));
    return () => {
      dispatch(removeEditData());
    };
  }, []);

  return isHaveViewedServiceRequest ? (
    <div>
      <Header />
      <Content>
        <LeftContent>
          <EditServiceRequest />
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
