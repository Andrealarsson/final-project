import React, { useEffect } from 'react'
import styled from 'styled-components/macro'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import LogOutButton from '../components/LogOutButton'
import myTrip from '../reducers/myTrip'
import { API_URL } from '../reusable/urls' 

const MyTrip = () => {
    const accessToken = useSelector(store => store.user.accessToken)

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
      if (!accessToken) {
        history.push('/');
      }
    }, [accessToken, history]);

    useEffect(() => {
      const option = {
          method: 'GET',
          headers: {
            Authorization: accessToken
          }  
      }
      fetch(API_URL('my-trip'), option)
      .then((res) => res.json())
      .then(data => {
          if(data.success) { 
            dispatch(myTrip.actions.setTrip({destination: data.destination, detartureDate: data.departureDate, departureTime: data.departureTime})) 
            dispatch(myTrip.actions.setTrip(null))
          } else {
            dispatch(myTrip.actions.setTrip({errors:''}))
          }
      })
      .catch()
  },[accessToken, dispatch])

 return (
 <> 
   
   <h2>my trips</h2>
   <LogOutButton>Log out</LogOutButton>
 </>
 )
}

export default MyTrip