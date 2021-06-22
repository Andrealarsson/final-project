import React from "react";
import styled from "styled-components/macro";
import { useDispatch } from "react-redux";
import user from "../reducers/user";

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

const Button = styled.button`
  background: none;
  color: #ffffff;
  font-size: 16px;
  border: none;
  font-family: 'Sarabun', sans-serif;
  padding: 0px;

  &:hover {
    color: #7497AD;
  }
  @media (min-width: 768px) {
    margin-right: 70px;
  }

  @media (min-width: 1025px) {
    margin-right: 100px;
    font-size: 17px;
  }
`;
