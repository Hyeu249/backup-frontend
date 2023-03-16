import React, { useEffect } from 'react';
import { cloneDeep } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import RightSideBar from '@iso/vex_components/EditOverall/RightSideBar';
import {
  IMAGE,
  EQUIPMENT_A_DRIVER_ASSIGNMENT,
  EQUIPMENT_A_VEHICLE_ASSIGNMENT,
} from '@iso/vex_containers/constants';
import actions from '@iso/vex_redux/equipment/service/equipment/actions';
import ImageIcon from '@iso/vex_config/icon/ImageIcon';
import PeopleIcon from '@iso/vex_config/icon/PeopleIcon';
import VehicleIcon from '@iso/vex_config/icon/VehicleIcon';

import EditEquipment from './EditEquipment/EditEquipment';
import ImageItems from './Imageitems/ImageItems';
import EquipmentADriverAssignment from './EquipmentADriverAssignment/EquipmentADriverAssignment';
import EquipmentAVehicleAssignment from './EquipmentAVehicleAssignment/EquipmentAVehicleAssignment';

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

  const [whatRightContent, setWhatRightContent] = React.useState(
    EQUIPMENT_A_DRIVER_ASSIGNMENT
  );
  const viewedEquipment = cloneDeep(
    useSelector(state => state.equipment.viewedEquipment)
  );
  const isHaveViewedEquipment = Object.keys(viewedEquipment).length > 0;

  useEffect(() => {
    dispatch(initEditData({ equipmentID: id }));
    return () => {
      dispatch(removeEditData());
    };
  }, []);

  return isHaveViewedEquipment ? (
    <div>
      <Header />
      <Content>
        <LeftContent>
          <EditEquipment />
        </LeftContent>
        <RightContent>
          {whatRightContent === EQUIPMENT_A_DRIVER_ASSIGNMENT && (
            <EquipmentADriverAssignment />
          )}
          {whatRightContent === EQUIPMENT_A_VEHICLE_ASSIGNMENT && (
            <EquipmentAVehicleAssignment />
          )}
          {whatRightContent === IMAGE && <ImageItems />}
        </RightContent>
        <RightSideBar
          onClick={e => setWhatRightContent(e.type)}
          defaultType={EQUIPMENT_A_DRIVER_ASSIGNMENT}
          options={[
            {
              type: EQUIPMENT_A_DRIVER_ASSIGNMENT,
              IconLabel: PeopleIcon,
            },
            {
              type: EQUIPMENT_A_VEHICLE_ASSIGNMENT,
              IconLabel: VehicleIcon,
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
