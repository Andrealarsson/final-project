import styled from "styled-components/macro";
import rome from "../assets/rome.jpg";
import madrid from "../assets/madrid.jpg";

export const InfoSection = styled.section`
background-image: url("${rome}");
background-size: cover;
overflow: hidden;
height: 100%;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;

@media (min-width: 1024px) {
  background-image: url("${madrid}");
}
`;

export const InfoContainer = styled.div`
background-color: #ffffff;
width: 80%;
text-decoration: none;
margin: 60px 0px;
padding: 20px;

@media (min-width: 768px) {
  max-width: 800px;
}
`;

export const Link = styled.a`
text-decoration: none;
`;

export const InfoTitle = styled.h1`
color: #414344;
font-size: 20px;
margin-top: 0px;

`;

export const Title = styled.h2`
color: #414344;
font-size: 17px;
margin-top: 20px;
`;

export const Text = styled.p`
color: #414344;
font-size: 14px;
span {
  color: #7497ad;
  font-weight: bold;
  font-size: 14px;
}
`;
