import React from "react";
import styled from "styled-components/macro";
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
          titlePosition="bottom" // Options (Default: top): top, bottom.
          theme="dark"
          size="small"
          endAtZero
          endAt={countdownDate} // Date/Time
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
          titlePosition="bottom" // Options (Default: top): top, bottom.
          theme="dark"
          size="medium"
          endAtZero
          endAt={countdownDate} // Date/Time
        />
      </MediaQuery>
    </TimerContainer>
  );
};
export default Timer;

const TimerContainer = styled.div`
  color: #ffffff;
  transform: scale(1.3); 
  font-family: 'Open Sans', sans-serif;
  margin-bottom: 110px;
  margin-top: 80px;

  @media (min-width: 768px) {
    transform: scale(1.1);
  }
`;
const TimerText = styled.h2`
  color: #ffffff;
  font-family: 'Sarabun', sans-serif;
  font-size: 30px;
  margin: 0px 0px 15px 0px;
  display: flex;
  justify-content: center;
  
  @media (min-width: 768px) {
    font-size: 45px;
  }
`;