import styled from "styled-components/macro";
import sfomobile from "../assets/sfomobile.jpg";
import sfo from "../assets/sfo.jpg";

export const TripSection = styled.section`
background-image: url("${sfomobile}");
background-size: cover;
overflow-x: hidden;
height: 100vh;
display: flex;
align-items: center;
flex-direction: column;

@media (min-width: 1024px) {
  background-image: url("${sfo}");
}
`;

export const TitleContainer = styled.div`
width: 80%;
margin-bottom: 10px;
display: flex;
flex-direction: row;
align-items: center;

@media (min-width: 768px) {
  max-width: 800px;
  margin-bottom: 20px;
}
`;

export const TripIcon = styled.img`
margin-right: 2px;
`;

export const TripTitle = styled.h2`
color: #ffffff;
font-size: 15px;
margin: 0px;

@media (min-width: 768px) {
  font-size: 17px;
}
`;

export const TripContainer = styled.div`
width: 80%;
min-height: 300px;
margin-bottom: 80px;

@media (min-width: 768px) {
  max-width: 800px;
}
`;

export const TripInfo = styled.div``;

export const TripList = styled.div`
background-color: #ffffff;
margin: 3px;
padding: 5px;
display: flex;
flex-direction: row;
text-align: start;
justify-content: space-between;
align-items: center;
`;

export const Destination = styled.h2`
font-size: 14px;
margin: 5px;
color: #414344;

@media (min-width: 768px) {
  font-size: 16px;
}
`;

export const Departure = styled(Destination)``;

export const RemoveButton = styled.button`
background-color: #ffffff;
cursor: pointer;
border-radius: 50%;
border: none;
padding: 10px 12px;
outline: none;
&:hover {
  color: #ffffff;
  background-color: #f3f3f3;
}
@media (min-width: 768px) {
}
`;
