import React from 'react'
import styled from 'styled-components/macro'

const Navbar = () =>  {

  return(
    <>
      <ul>
        <li><a href='/users/:userId/my-trip'>Min Resa</a></li>
        <li><a href='/users/info'>Viktig info</a></li>
        <li><a href='/users/:userId/checklist'>Checklista</a></li>
      </ul>
    </>
  )
}

export default Navbar

