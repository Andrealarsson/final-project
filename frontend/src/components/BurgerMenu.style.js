import { Link } from "react-router-dom";
import styled from "styled-components/macro";

export const StyledBurgerMenu = styled.div`
/* Position and sizing of burger button */
.bm-burger-button {
  position: absolute;
  width: 30px;
  height: 25px;
  right: 36px;
  top: 25px;
  float: right;
}

/* Color/shape of burger icon bars */
.bm-burger-bars {
  background: #ffffff;
}

.bm-burger-bars-hover {
  color: #7497ad;
}

/* Position and sizing of clickable cross button */
.bm-cross-button {
  height: 24px;
  width: 24px;
}

/* Color/shape of close button cross */
.bm-cross {
  background: #7497ad;
}

.bm-menu-wrap {
  bottom: 0;
  left: 0;
  height: 100%;
}

/* General sidebar styles */
.bm-menu {
  background: #414344;
  padding: 2.5em 1.5em 0;
  font-size: 1.15em;
}

/* Wrapper for item list */
.bm-item-list {
  color: #b8b7ad;
  padding: 0.8em;
}

/* Individual item */
.bm-item {
  display: inline-block;
}

.bm-item-hover {
  color: #7497AD;
}

/* Styling of overlay */
.bm-overlay {
  background: rgba(0, 0, 0, 0.3);
}

@media (min-width: 768px) {
  display: none;
}
`;

export const PageLink = styled(Link)`
color: #ffffff;
font-size: 16px;
text-decoration: none;

&:focus, &:hover, &:visited, &:link, &:active {
text-decoration: none;
&:hover{
  color: #7497AD;
}
`;

export const TripPage = styled.li`
padding-bottom: 20px;
`;

export const InfoPage = styled(TripPage)``;

export const ChecklistPage = styled(TripPage)``;
