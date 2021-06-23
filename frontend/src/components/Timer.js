import React from "react";

import FlipCountdown from "@rumess/react-flip-countdown";
import MediaQuery from "react-responsive";
import { 
  TimerContainer, 
  TimerText 
} from "./Timer.style";

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