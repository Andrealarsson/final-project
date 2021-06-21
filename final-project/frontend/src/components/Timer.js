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
  margin-bottom: 110px;
  margin-top: 160px;
  color: #ffffff;
  transform: scale(1.4); 
  font-family: 'Open Sans', sans-serif;
  @media (min-width: 768px) {
    transform: scale(1.1);
  }
  // background-color: rgba(0, 0, 0, 0.56);
`;
const TimerText = styled.h2`
  color: #ffffff;
  font-size: 30px;
  display: flex;
  margin: 0px 0px 15px 0px;
  justify-content: center;
`;