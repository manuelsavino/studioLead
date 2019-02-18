import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { SET_CURRENT_USER, GET_ERRORS } from "./types";

export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login/", userData)
    .then(res => {
      const { token } = res.data;
      // console.log(res.data);
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
      console.log("err", err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//setLoggedInUser
export const setCurrentUser = decoded => {
  return { type: SET_CURRENT_USER, payload: decoded };
};

//log out current user
export const logoutUser = () => dispatch => {
  //remove token from local storage
  localStorage.removeItem("jwtToken");
  //remote auth header
  setAuthToken(false);
  //set current user to an empty object
  dispatch(setCurrentUser({}));
};
