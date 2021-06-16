import React from 'react'
import styled from 'styled-components/macro'
import { useDispatch } from 'react-redux'
import user from '../reducers/user'

const LogOutButton = () => {
  const dispatch = useDispatch()

  const handleClick = () => {
    // localStorage.removeItem('accessToken')
    dispatch(user.actions.setUser({userId: null, accessToken: null, errors: null})) 
  }

  return(
    <>
    <Button onClick={handleClick}>LOGGA UT</Button>
    </>
  )
}

export default LogOutButton

const Button = styled.button`
 background: none;
 color: #ffffff;
 font-size: 15px;
 border: none;

 &:hover{
  color: pink;
}
 `