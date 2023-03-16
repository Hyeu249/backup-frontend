import React, { useEffect } from 'react';
import { cloneDeep } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import RightSideBar from '@iso/vex_components/EditOverall/RightSideBar';
import { IMAGE, DRIVER_DOCUMENT } from '@iso/vex_containers/constants';
import actions from '@iso/vex_redux/driver/service/driver/actions';
import ImageIcon from '@iso/vex_config/icon/ImageIcon';
import DocumentIcon from '@iso/vex_config/icon/DocumentIcon';

import EditDriver from './EditDriver/EditDriver';
import ImageItems from './ImageItems/ImageItems';
import DriverDocument from './DriverDocument/DriverDocument';

import {
  Header,
  Content,
  LeftContent,
  RightContent,
} from '@iso/vex_components/EditOverall/EditOverallStuff';

const EditOverall = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { initEditData, removeEditInitData } = actions;

  const [whatRightContent, setWhatRightContent] =
    React.useState(DRIVER_DOCUMENT);
  const viewedDriver = cloneDeep(
    useSelector(state => state.driver.viewedDriver)
  );
  const isHaveViewedDriver = Object.keys(viewedDriver).length > 0;

  useEffect(() => {
    dispatch(initEditData({ driverID: id }));
    return () => {
      dispatch(removeEditInitData());
    };
  }, []);

  return isHaveViewedDriver ? (
    <div>
      <Header />
      <Content>
        <LeftContent>
          <EditDriver />
        </LeftContent>
        <RightContent>
          {whatRightContent === DRIVER_DOCUMENT && <DriverDocument />}
          {whatRightContent === IMAGE && <ImageItems />}
        </RightContent>
        <RightSideBar
          onClick={e => setWhatRightContent(e.type)}
          defaultType={DRIVER_DOCUMENT}
          options={[
            {
              type: DRIVER_DOCUMENT,
              IconLabel: DocumentIcon,
            },
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
