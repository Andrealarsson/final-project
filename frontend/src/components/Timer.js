import React from "react";

import { TimerContainer, TimerText } from "./Timer.style";

import FlipCountdown from "@rumess/react-flip-countdown";
import MediaQuery from "react-responsive";

const Timer = ({ countdownDate, destination }) => {
  return (
    <TimerContainer>
      <TimerText>{destination}</TimerText>
      <MediaQuery maxWidth={767}>
        <FlipCountdown
          hideYear
          hideMonth
          dayTitle="dagar"
          hourTitle="timmar"
          minuteTitle="minuter"
          secondTitle="sekunder"
          titlePosition="bottom" 
          theme="dark"
          size="small"
          endAtZero
          endAt={countdownDate} 
        />
      </MediaQuery>
      <MediaQuery minWidth={768}>
        <FlipCountdown
          hideYear
          hideMonth
          dayTitle="dagar"
          hourTitle="timmar"
          minuteTitle="minuter"
          secondTitle="sekunder"
          titlePosition="bottom" 
          theme="dark"
          size="medium"
          endAtZero
          endAt={countdownDate}
        />
      </MediaQuery>
    </TimerContainer>
  );
};

export default Timer;