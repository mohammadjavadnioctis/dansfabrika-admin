import React, { useEffect } from 'react';

const AutoRefreshPage = () => {
  useEffect(() => {
    const interval = setInterval(() => {
        
      window.location.reload();
    }, 60 * 60 * 1000); 

    return () => {
      clearInterval(interval); 
    };
  }, []);

};

export default AutoRefreshPage;