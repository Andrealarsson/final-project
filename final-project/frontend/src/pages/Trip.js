import React, { useEffect } from 'react'
import styled from 'styled-components/macro'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment';
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
    <TripTitle>Kommande avresor</TripTitle>
    <TripContainer>{trips.map((trip) => (
        <TripList key={trip._id}>
          <Destination>{trip.destination}</Destination>
          <Departure>{moment(trip.departure).format('D MMM YYYY, HH:mm')}</Departure>
        </TripList>
    ))}</TripContainer>   
 </>
 )
}

export default Trip

const TripTitle = styled.h1`
color: #ffffff;`
const TripContainer = styled.div`
background-color: #ffffff;
min-height: 500px;
widht: 80vw;
margin: 30px, 20px;
font-size: 18px;
border-radius: 30px;;
text-align: center;
justify-content: center;
box-shadow: 3px 40px 30px 2px #ccc;`

const TripList = styled.div`
display: flex;
flex-direction: row;

text-align: start;`

const Destination = styled.h2`
font-size: 18px;
margin: 0px, 20px;
`

const Departure = styled.h2`
font-size: 18px;
`