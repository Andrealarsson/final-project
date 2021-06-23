import styled from "styled-components/macro";

export const TimerContainer = styled.div`
color: #ffffff;
transform: scale(1.3); 
font-family: 'Open Sans', sans-serif;
margin-bottom: 110px;
margin-top: 80px;

@media (min-width: 768px) {
  transform: scale(1.1);
}
`;
export const TimerText = styled.h2`
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