import React, { useEffect } from 'react';
import { cloneDeep } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import RightSideBar from '@iso/vex_components/EditOverall/RightSideBar';
import {
  IMAGE,
  ATTACHED_TRAILER,
  VEHICLE_DOCUMENT,
} from '@iso/vex_containers/constants';
import actions from '@iso/vex_redux/vehicle/service/vehicle/actions';
import ImageIcon from '@iso/vex_config/icon/ImageIcon';
import StarIcon from '@iso/vex_config/icon/StarIcon';
import DocumentIcon from '@iso/vex_config/icon/DocumentIcon';

import EditVehicle from './EditVehicle/EditVehicle';
import ImageItems from './Imageitems/ImageItems';
import Trailer from './Trailer/Trailer';
import VehicleDocument from './VehicleDocument/VehicleDocument';

import {
  Header,
  Content,
  LeftContent,
  RightContent,
} from '@iso/vex_components/EditOverall/EditOverallStuff';

const EditOverall = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { initEditData, removeInitEditData } = actions;

  const [whatRightContent, setWhatRightContent] =
    React.useState(ATTACHED_TRAILER);
  const viewedVehicle = cloneDeep(
    useSelector(state => state.vehicle.viewedVehicle)
  );
  const isHaveViewedVehicle = Object.keys(viewedVehicle).length > 0;

  useEffect(() => {
    dispatch(initEditData({ vehicleID: id }));
    return () => {
      dispatch(removeInitEditData());
    };
  }, []);

  return isHaveViewedVehicle ? (
    <div>
      <Header />
      <Content>
        <LeftContent>
          <EditVehicle />
        </LeftContent>
        <RightContent>
          {whatRightContent === ATTACHED_TRAILER && <Trailer />}
          {whatRightContent === VEHICLE_DOCUMENT && <VehicleDocument />}
          {whatRightContent === IMAGE && <ImageItems />}
        </RightContent>
        <RightSideBar
          onClick={e => setWhatRightContent(e.type)}
          defaultType={ATTACHED_TRAILER}
          options={[
            {
              type: ATTACHED_TRAILER,
              IconLabel: StarIcon,
            },
            {
              type: VEHICLE_DOCUMENT,
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
