import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { SET_CURRENT_USER } from "./types";
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login/", userData)
    .then(res => {
      const { token } = res.data;
      console.log(res.data);
      //Set Toke to local Storage
      localStorage.setItem("jwtToken", token);
      //Set toke to Auth header
      setAuthToken(token);
      //Decode Token to get user data
      const decoded = jwt_decode(token);
      console.log("decoded", decoded);
      //set Current User
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      console.log(err);
    });
};

//setLoggedInUser
export const setCurrentUser = decoded => {
  return { type: SET_CURRENT_USER, payload: decoded };
};
