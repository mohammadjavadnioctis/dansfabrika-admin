import jwtDecode from 'jwt-decode';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cookies } from 'src/definitions/Cookies/NewCookies';

const CheckToken = () => {

  const navigate = useNavigate();

  useEffect(() => {

    const checkTokenExpiration = () => {

      const token = cookies.get('jwt'); 
      
      const decodeToken = token ? jwtDecode(token) : null

      const expirationTime = token ? decodeToken.exp : null

      if (token && expirationTime) {
        const currentTime = Date.now() / 1000;
        console.log('here are the cookies : ', cookies)
        if (currentTime > expirationTime ) {

            cookies?.remove('jwt')
            window.location.reload();
            navigate('/login')
            
        }
      }
    };

    checkTokenExpiration();

    const interval = setInterval(checkTokenExpiration, 60000)

    return () => clearInterval(interval); 
  }, [navigate]);

};

export default CheckToken;
