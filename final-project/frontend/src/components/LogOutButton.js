import React from 'react'

import styled from 'styled-components/macro'
import { useDispatch } from 'react-redux'
import user from '../reducers/user'

const LogOutButton = () => {

  const dispatch = useDispatch();

  const handleClick = () => {
  dispatch(user.actions.setUser({userId: null, accessToken: null, errors: null})) 
  }
  return(
    <>
    <Button onClick={handleClick}>Log out</Button>
    </>
  )
}

export default LogOutButton

const Button = styled.button`
 background: white;
 border: none;
 box-shadow: 2px 2px 1px 2px grey;
 border-radius: 5px;
 `