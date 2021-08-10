import React, { useEffect } from "react";

import BurgerMenu from "../components/BurgerMenu";
import LogOutButton from "../components/LogOutButton";

import { HeaderNavbar, Title, NavbarMenu, PageLink, TripPage, InfoPage, ChecklistPage } from "./Navbar.style";

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