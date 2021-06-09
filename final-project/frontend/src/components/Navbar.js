import React from 'react'
import styled from 'styled-components/macro'

const Navbar = () =>  {

  return(
    <>
      <ul>
        <li><a href='/my-trip'>Min Resa</a></li>
        <li><a href='/info'>Viktig info</a></li>
        <li><a href='/checklist'>Checklista</a></li>
      </ul>
    </>
  )
}

export default Navbar

