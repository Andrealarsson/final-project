import React from 'react'
import styled from 'styled-components/macro'
import { useSelector } from 'react-redux'
import {Link } from 'react-router-dom'

const Navbar = () =>  {
  const userId = useSelector(store => store.user.userId)

  return(
    <>
      <HeaderNavbar>
        <TripPage><Link to={`/users/${userId}/trip`}>MINA RESOR</Link></TripPage>
        <InfoPage><Link to='/users/info'>VIKTIG INFO</Link></InfoPage>
        <ChecklistPage><Link to={`/users/${userId}/checklist`}>CHECKLISTA</Link></ChecklistPage>
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

// const Link = styled.a`
// text-decoration: none;
// `

const TripPage = styled.li`
`

const InfoPage = styled.li`
`

const ChecklistPage = styled.li`
`

