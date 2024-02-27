import React, { useEffect } from 'react';
import TagManager from 'react-gtm-module';

const GoogleTagManager = ({ gtmId }) => {
  useEffect(() => {
    const tagManagerArgs = {
      gtmId: gtmId
    };
    TagManager.initialize(tagManagerArgs);
  }, [gtmId]);

  return null; // This component doesn't render anything to the DOM
};

export default GoogleTagManager;