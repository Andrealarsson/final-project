import React, { useEffect } from 'react'
import styled from 'styled-components/macro'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import LogOutButton from '../components/LogOutButton'
import trip from '../reducers/trip'
import user from '../reducers/user'
import { API_URL } from '../reusable/urls' 

const Trip = () => {
    const accessToken = useSelector(store => store.user.accessToken)
    const userId = useSelector(store => store.user.userId)
    const trips = useSelector(store => store.trip.trip)
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
      fetch(API_URL(`users/${userId}/trip`), options)
      .then((res) => res.json())
      .then(data => {
          if(data.success) { 
            dispatch(trip.actions.setTrip(data.trip))
              // ({
              // _id: data._id,
              // destination: data.destination, 
              // detartureDate: data.departureDate, 
              // departureTime: data.departureTime}))
              
            dispatch(trip.actions.setErrors(null))
          } else {
            dispatch(trip.actions.setErrors(data))
          }
      })
     .catch()
  },[accessToken, userId, dispatch])

  console.log(trips)
 return (
 <> 
    {/* <div>{trips.map((trip) => (
        <div key={trip._id}>{trip}</div>
    ))}</div>  */}
   <h2>trips</h2>
   <LogOutButton>Log out</LogOutButton>
 </>
 )
}

export default Trip