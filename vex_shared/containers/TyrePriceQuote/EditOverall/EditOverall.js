import React, { useEffect } from 'react';
import { cloneDeep } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import RightSideBar from '@iso/vex_components/EditOverall/RightSideBar';
import { IMAGE } from '@iso/vex_containers/constants';
import actions from '@iso/vex_redux/tyrePriceQuote/service/tyrePriceQuote/actions';
import ImageIcon from '@iso/vex_config/icon/ImageIcon';

import EditTyrePriceQuote from './EditTyrePriceQuote/EditTyrePriceQuote';
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
  const viewedTyrePriceQuote = cloneDeep(
    useSelector(state => state.tyrePriceQuote.viewedTyrePriceQuote)
  );
  const isHaveViewedTyrePriceQuote =
    Object.keys(viewedTyrePriceQuote).length > 0;

  useEffect(() => {
    dispatch(initEditData({ tyrePriceQuoteID: id }));
    return () => {
      dispatch(removeEditData());
    };
  }, []);

  return isHaveViewedTyrePriceQuote ? (
    <div>
      <Header />
      <Content>
        <LeftContent>
          <EditTyrePriceQuote />
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
