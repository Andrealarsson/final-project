import React from 'react'
import styled from 'styled-components/macro'

const Navbar = () =>  {

  return(
    <>
      <HeaderNavbar>
        <TripPage><Link href='/users/:userId/trip'>MINA RESOR</Link></TripPage>
        <InfoPage><Link href='/users/info'>VIKTIG INFO</Link></InfoPage>
        <ChecklistPage><Link href='/users/:userId/checklist'>CHECKLISTA</Link></ChecklistPage>
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

const Link = styled.a`
text-decoration: none;
`

const TripPage = styled.li`
`

const InfoPage = styled.li`
`

const ChecklistPage = styled.li`
`

