import React from 'react';
import IntlMessages from '@iso/components/utility/intlMessages';

export default function ErrorField({ is, IntlId }) {
  return (
    <>
      {is != 'init' && is && (
        <div className="isoErrorText" style={{ color: 'red' }}>
          <IntlMessages id={IntlId} />
        </div>
      )}
    </>
  );
}
