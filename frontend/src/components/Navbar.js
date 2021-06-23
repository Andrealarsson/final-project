import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";

import BurgerMenu from "../components/BurgerMenu";
import LogOutButton from "../components/LogOutButton";

const Navbar = () => {

  useEffect(() => {
    const menuWrap = document.querySelector(".bm-menu-wrap");
    if (menuWrap) {
      menuWrap.setAttribute("aria-hidden", true);
    }
  }, []);

  return (
    <>
      <HeaderNavbar>
        <Title>
          TRAVEL<span>POCKET</span>
        </Title>
        <BurgerMenu/>
        <NavbarMenu>
          <TripPage>
            <PageLink to="/users/trip">MINA RESOR</PageLink>
          </TripPage>
          <InfoPage>
            <PageLink to="/users/info">VIKTIG INFO</PageLink>
          </InfoPage>
          <ChecklistPage>
            <PageLink to="/users/checklist">CHECKLISTA</PageLink>
          </ChecklistPage>
          <LogOutButton>Log out</LogOutButton>
        </NavbarMenu>
      </HeaderNavbar>
    </>
  );
};

export default Navbar;

const HeaderNavbar = styled.header`
  background-color: rgba(0, 0, 0, 0.56);
  overflow: hidden;
  width: 100%;
  list-style-type: none;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  justify-content: space-between;
`;
const Title = styled.h1`
  color: #ffffff;
  margin-left: 36px;
  span {
    color: #7497ad;
  }
  @media (min-width: 768px) {
    margin-left: 70px;
    font-size: 30px;
  }
  @media (min-width: 1024px) {
    margin-left: 100px;
  }
`;

const NavbarMenu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 767px) {
    display: none;
  }
`;
const PageLink = styled(Link)`
  text-decoration: none;
  color: #ffffff;
  font-size: 16px;

  &:focus, &:hover, &:visited, &:link, &:active {
  text-decoration: none;
  &:hover, &:active{
    color: #7497AD;
  }

  @media (min-width: 1025px) {
    font-size: 17px;
  }
  `;
const TripPage = styled.li`
  margin-right: 30px;
  @media (min-width: 768px) {
    margin-right: 20px;
  }
  @media (min-width: 1025px) {
    margin-right: 80px;
}
`;
const InfoPage = styled(TripPage)``;
const ChecklistPage = styled(TripPage)``;
