import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";

import BurgerMenu from "../components/BurgerMenu";
import LogOutButton from "../components/LogOutButton";

const Navbar = () => {
  const userId = useSelector((store) => store.user.userId);

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
        <BurgerMenu />
        <NavbarMenu>
          <TripPage>
            <PageLink to={`/users/trip`}>MINA RESOR</PageLink>
          </TripPage>
          <InfoPage>
            <PageLink to="/users/info">VIKTIG INFO</PageLink>
          </InfoPage>
          <ChecklistPage>
            <PageLink to={`/users/checklist`}>CHECKLISTA</PageLink>
          </ChecklistPage>
          <LogOutButton>Log out</LogOutButton>
        </NavbarMenu>
      </HeaderNavbar>
    </>
  );
};

export default Navbar;

const HeaderNavbar = styled.header`
  position: fixed;
  top: 0px;
  background-color: rgba(0, 0, 0, 0.56);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  justify-content: space-around;
  list-style-type: none;
`;
const Title = styled.h1`
  color: #ffffff;
  span {
    color: #7497ad;
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
&:hover{
  color: #7497AD;
}
`;
const TripPage = styled.li`
  margin-right: 30px;
`;
const InfoPage = styled(TripPage)``;
const ChecklistPage = styled(TripPage)``;
