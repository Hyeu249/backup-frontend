import React, { useEffect } from 'react';
import { cloneDeep } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import RightSideBar from '@iso/vex_components/EditOverall/RightSideBar';
import { IMAGE, VEHICLE } from '@iso/vex_containers/constants';
import actions from '@iso/vex_redux/tyre/service/tyre/actions';
import ImageIcon from '@iso/vex_config/icon/ImageIcon';
import CarIcon from '@iso/vex_config/icon/CarIcon';

import EditDriver from './EditTyre/EditTyre';
import AssignVehicle from './AssignVehicle/AssignVehicle';
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

  const [whatRightContent, setWhatRightContent] = React.useState(VEHICLE);
  const viewedTyre = cloneDeep(useSelector(state => state.tyre.viewedTyre));
  const isHaveViewedTyre = Object.keys(viewedTyre).length > 0;

  useEffect(() => {
    dispatch(initEditData({ tyreID: id }));
    return () => {
      dispatch(removeEditData());
    };
  }, []);

  return isHaveViewedTyre ? (
    <div>
      <Header />
      <Content>
        <LeftContent>
          <EditDriver />
        </LeftContent>
        <RightContent>
          {whatRightContent === VEHICLE && <AssignVehicle />}
          {whatRightContent === IMAGE && <ImageItems />}
        </RightContent>
        <RightSideBar
          onClick={e => setWhatRightContent(e.type)}
          defaultType={VEHICLE}
          options={[
            {
              type: VEHICLE,
              IconLabel: CarIcon,
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
