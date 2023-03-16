import React from 'react';
import { useSelector } from 'react-redux';
import Searchbar from '@iso/components/Topbar/SearchBox';
import TopbarSearchModal from './TopbarSearchModal.styles';
import { TopbarSearchIcon } from '@iso/config/icon.config';

export default function TopbarSearch() {
  const [visible, setVisiblity] = React.useState(false);
  const customizedTheme = useSelector(state => state.ThemeSwitcher.topbarTheme);

  const handleBlur = () => {
    setTimeout(() => {
      setVisiblity(false);
    }, 200);
  };

  return (
    <div onClick={() => setVisiblity(true)}>
      <TopbarSearchIcon size={24} color={customizedTheme.textColor} />
      <TopbarSearchModal
        visible={visible}
        onOk={() => setVisiblity(false)}
        onCancel={() => setVisiblity(false)}
        wrapClassName="isoSearchModal"
        width="60%"
        footer={null}
      >
        <div className="isoSearchContainer">
          {visible ? <Searchbar onBlur={handleBlur} /> : ''}
        </div>
      </TopbarSearchModal>
    </div>
  );
}