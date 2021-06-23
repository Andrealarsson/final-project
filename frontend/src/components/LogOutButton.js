import React from "react";
import { useDispatch } from "react-redux";
import user from "../reducers/user";

import { Button } from './LogOutButton.style'

const LogOutButton = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    localStorage.removeItem("accessToken");
    localStorage.clear();
    dispatch(
      user.actions.setUser({ userId: null, accessToken: null, errors: null })
    );
  };

  return (
    <>
      <Button onClick={handleClick}>LOGGA UT</Button>
    </>
  );
};

export default LogOutButton;

