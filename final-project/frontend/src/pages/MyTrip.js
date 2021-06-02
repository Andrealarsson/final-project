import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch, batch } from 'react-redux'

import myTrip from '../reducers/myTrip'
import user from '../reducers/user'
import { API_URL } from '../reusable/urls' 

const Button = styled.button`
 background: white;
 border: none;
 box-shadow: 2px 2px 1px 2px grey;
 border-radius: 5px;
 `

const MyTrip = () => {
    const accessToken = useSelector(store => store.user.accessToken)
    const myTripItems = useSelector(store => store.myTrip.items)

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
      if (!accessToken) {
        history.push('/');
      }
    }, [accessToken, history]);

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
              Authorization: accessToken
            }  
        }
        fetch(API_URL, options)
        .then(res => res.json())
        .then(data => {
            if(data.success) { 
              batch(() => {
              dispatch(myTrip.actions.setTrip(data.myTrip)) 
              dispatch(myTrip.actions.setErrors(null))
              })
            } else {
              dispatch(myTrip.actions.setErrors(data))
            }
        })
        .catch()
    },[ accessToken, dispatch])

    const handleClick = () => {
      dispatch(user.actions.setUsername(null))
      dispatch(user.actions.setAccessToken(null))
      dispatch(user.actions.setErrors(null))
      dispatch(myTrip.actions.setTrip(null))
    }

 return (
 <> 
   <h1>{myTripItems? myTrip.items : "loading..."}</h1>
   <h2>my trips</h2>
   <Button onClick={handleClick}>Log out</Button>
 </>
 )
}

export default MyTrip