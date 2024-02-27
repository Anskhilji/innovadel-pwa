import React, { useEffect, useState, useCallback } from 'react';
import {Skeleton} from '@salesforce/retail-react-app/app/components/shared/ui'

const ContactUsComponentWrapper = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://innovadeltechnologieslimit6-dev-ed.develop.my.site.com/InnovadelServiceCloudApp/lightning/lightning.out.js';
    script.onload = () => {

      window.$Lightning.use("c:ServiceCloudApp", function () {
          window.$Lightning.createComponent(
              'c:serviceCloudForm',
              {},
              'lwcContainer',
              function (component) {
                if (component) {
                  setLoading(false);
                }
              }
          );
      });
    };
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
        <div>
          <div id="lwcContainer">
            {isLoading && <Skeleton height="100vh" m="auto" />}
          </div>
        </div>
    </div>
  );
};

export default ContactUsComponentWrapper;