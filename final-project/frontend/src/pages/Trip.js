import React, { useEffect } from 'react'
import styled from 'styled-components/macro'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import trip from '../reducers/trip'
import user from '../reducers/user'
import { API_URL } from '../reusable/urls' 
import Navbar from '../components/Navbar'
import paris from '../assets/paris.jpg'
import airplane from '../assets/airplane.png'
import CountdownTimer from '../components/CountdownTimer'

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
 <TripSection>
  <Navbar/>
    <CountdownTimer departureDate={trip.departure}/>
    <TitleContainer>
      <TripIcon src= {airplane} width='20' height='20' alt='airplain icon'/>
      <TripTitle>Kommande avresor</TripTitle>
    </TitleContainer>
    <TripContainer>{trips.sort( (a, b) => new Date(b.time) - new Date(a.time) ).map((trip) => (
        <TripList key={trip._id}>
          <Destination>{trip.destination}</Destination>
          <Departure>{moment(trip.departure).format(' D MMM YYYY, HH:mm')}</Departure>
        </TripList>
    ))}</TripContainer>   
 </TripSection> 
 </>
 )
}

export default Trip

const TripSection = styled.section`
background-image: url('${paris}');
background-size: cover;
height: 100vh;
display: flex; 
justify-content: center;
align-items: center;
flex-direction: column;
`
const TitleContainer = styled.div`
display: flex;
flex-direction: row;
margin: 10px;`

const TripIcon = styled.img`

`

const TripTitle = styled.h2`
color: #ffffff;
margin: 0px;
font-size: 20px;
` 

const TripContainer = styled.div`
min-height: 300px;
width: 80%;

@media (min-width: 768px) {
  margin-top: 20px;
  max-width: 800px;
}
`

const TripList = styled.div`
background-color: #ffffff;
display: flex;
flex-direction: row;
text-align: start;
justify-content: space-between;
margin: 3px;
padding: 10px;`

const Destination = styled.h2`
font-size: 15px;
`

const Departure = styled.h2`
font-size: 15px;
`