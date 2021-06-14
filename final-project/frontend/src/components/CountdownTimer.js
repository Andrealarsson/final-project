import React, { useRef, useState, useEffect } from 'react'

const CountdownTimer = ({departureDate}) => {
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
    <div>
      timerDays: {timerDays} &nbsp; timerHours: {timerHours} &nbsp;
      timerMinutes: {timerMinutes} &nbsp; timerSeconds: {timerSeconds} &nbsp;
    </div>
  );
};

export default CountdownTimer;
/*const CountdownTime = ({departure}) => {

  const getCountdown = () => {
  const now = new Date().getTime()
  const distance = departure - now
  let countdown = {}
  if(distance > 0) {
    countdown = {
      Days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      Hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
      Minutes: Math.floor((distance / 1000 / 60) % 60),
      Seconds: Math.floor((distance / 1000) % 60),
    }
  }
  return countdown
  }
  const [countdown, setCountdown] = useState(getCountdown())

  useEffect(() => {
    setTimeout(() => {
      setCountdown(getCountdown());
    }, 1000);
  });

  const data = [];
Object.entries(countdown).forEach(([unit, value]) => {
  data.push(
    <li key={Math.random().toString(16)}>
      <strong>{value}</strong> {unit}
    </li>
  );
});
console.log(data)
return (
  <>
    <h1>New Year Countdown</h1>
    <ul>{data}</ul>
  </>
);
}
  export default CountdownTime;*/