import React from "react";

import { slide as Menu } from "react-burger-menu";
import LogOutButton from "./LogOutButton";
import { 
  StyledBurgerMenu, 
  PageLink, 
  TripPage, 
  InfoPage, 
  ChecklistPage 
} from './BurgerMenu.style'

const toggleMenu = ({ isOpen }) => {
  const menuWrap = document.querySelector(".bm-menu-wrap");
  isOpen
    ? menuWrap.setAttribute("aria-hidden", false)
    : menuWrap.setAttribute("aria-hidden", true);
};

const BurgerMenu = () => {

  return (
    <StyledBurgerMenu>
      <Menu noOverlay onStateChange={toggleMenu}>
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
      </Menu>
    </StyledBurgerMenu>
  );
};

export default BurgerMenu;