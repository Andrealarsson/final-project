import React from 'react'
import { useSelector } from 'react-redux'
import {Link } from 'react-router-dom'
import styled from 'styled-components/macro'

import LogOutButton from '../components/LogOutButton'

const Navbar = () =>  {
  const userId = useSelector(store => store.user.userId)

  return(
    <>
      <HeaderNavbar>
        <Title>Travel Pocket</Title>
        <TripPage><PageLink to={`/users/${userId}/trip`}>MINA RESOR</PageLink></TripPage>
        <InfoPage><PageLink to='/users/info'>VIKTIG INFO</PageLink></InfoPage>
        <ChecklistPage><PageLink to={`/users/${userId}/checklist`}>CHECKLISTA</PageLink></ChecklistPage>
        <LogOutButton>Log out</LogOutButton>
      </HeaderNavbar>
    </>
  )
}

export default Navbar

const HeaderNavbar = styled.header`
position: fixed;
top: 0px;
background-color: rgba(0, 0, 0, 0.56);
width: 100vw;
display: flex;
align-items: center;
justify-content: center;
flex-direction: row;
justify-content: space-around;
list-style-type:  none;
`
const Title = styled.h1`
color: #ffffff;
 `
const PageLink = styled(Link)`
text-decoration: none;
color: #ffffff;

&:focus, &:hover, &:visited, &:link, &:active {
text-decoration: none;
`
const TripPage = styled.li`
text-decoration: none;
`
const InfoPage = styled.li`
`
const ChecklistPage = styled.li`
`

