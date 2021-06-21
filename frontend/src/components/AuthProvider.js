import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import user from "../reducers/user";

const AuthProvider = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      dispatch(
        user.actions.setUser({
          accessToken: accessToken,
        })
      );
    }
  }, []);

  return <></>;
};
export default AuthProvider;
