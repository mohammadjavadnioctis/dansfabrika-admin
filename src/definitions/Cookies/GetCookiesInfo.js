import jwtDecode from 'jwt-decode';
import { cookies } from './NewCookies';

export const jwt = (cookies.get('jwt')) ? cookies.get('jwt') : ""

export const decodedJwt = (jwtDecode(jwt)) ? jwtDecode(jwt) : ""

//export const userId = decodedJwt.id

//export const userEmail = decodedJwt.email