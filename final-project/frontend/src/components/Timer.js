import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import Trip from '../pages/Trip'

const Timer = ({departureDate, destination}) => {
  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");

  let interval = useRef();

  const startTimer = () => {
    const now = new Date().getTime();
    const distance = departureDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (distance < 0) {
      clearInterval(interval.current);
    } else {
      setTimerDays(days);
      setTimerHours(hours);
      setTimerMinutes(minutes);
      setTimerSeconds(seconds);
    }
  };

  function saveInLocalStorage(time) {
    localStorage.setItem("timer", time);
  }

  function getTimeFromLocalStorage() {
    return localStorage.getItem("timer");
  }

  useEffect(() => {
    const localTimer = getTimeFromLocalStorage();

    if (localTimer) {
      interval.current = setInterval(() => {
        startTimer(+localTimer);
      }, 1000);
    } else {
      const countdownDate = new Date().getTime() + 14 * 24 * 60 * 1000;
      saveInLocalStorage(countdownDate);
      interval.current = setInterval(() => {
        startTimer(+countdownDate);
      }, 1000);
    }

    return () => clearInterval(interval.current);
  }, []);

  return (
    <>
    <TimerContainer>
      <TimerDays>{timerDays} &nbsp;</TimerDays>  
      <TimerHours>{timerHours} &nbsp;</TimerHours> 
      <TimerMinutes>{timerMinutes} &nbsp; 
      </TimerMinutes> <TimerSeconds>{timerSeconds} &nbsp;</TimerSeconds>
    </TimerContainer>
    <TimerTitle>{destination}jj</TimerTitle>
    </>
  );
};

export default Timer;

const TimerTitle = styled.h2`
margin-bottom: 30px;
color: #ffffff;`

const TimerContainer = styled.div`

display: flex; 
justify-content: space-between;
`

const TimerDays = styled.p`
background-color: #ffffff;
padding:20px 10px;
margin: 5px;
border-radius: 3px;

`
const TimerHours = styled(TimerDays)`
background-color: #ffffff;

`
const TimerMinutes = styled(TimerDays)`
background-color: #ffffff;
`
const TimerSeconds = styled(TimerDays)`
background-color: #ffffff;
`