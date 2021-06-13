import React from 'react'
import styled from 'styled-components/macro'
import { useSelector } from 'react-redux'
import {Link } from 'react-router-dom'

const Navbar = () =>  {
  const userId = useSelector(store => store.user.userId)

  return(
    <>
      <HeaderNavbar>
        <TripPage><PageLink to={`/users/${userId}/trip`}>MINA RESOR</PageLink></TripPage>
        <InfoPage><PageLink to='/users/info'>VIKTIG INFO</PageLink></InfoPage>
        <ChecklistPage><PageLink to={`/users/${userId}/checklist`}>CHECKLISTA</PageLink></ChecklistPage>
      </HeaderNavbar>
    </>
  )
}

export default Navbar

const HeaderNavbar = styled.ul`
display: flex;
flex-direction: row;
justify-content: space-around;
list-style-type:  none;
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

