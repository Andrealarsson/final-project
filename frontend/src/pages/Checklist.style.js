import styled from "styled-components/macro";
import italycoast from "../assets/italycoast.jpg";
import santorini from "../assets/santorini.jpg";

export const TodoSection = styled.section`
background-image: url("${italycoast}");
background-size: cover;
overflow-x: hidden;
height: 100vh;
display: flex;
align-items: center;
flex-direction: column;

@media (min-width: 1024px) {
  background-image: url("${santorini}");
}
`;

export const TitleContainer = styled.div`
width: 80%;
margin-top: 60px;
margin-bottom: 10px;
display: flex;
flex-direction: row;
align-items: center;

@media (min-width: 768px) {
  max-width: 800px;
}
`;

export const TodoIcon = styled.img`
margin-right: 2px;
`;

export const TodoTitle = styled.h2`
color: #ffffff;
font-size: 15px;
margin: 0px;

@media (min-width: 768px) {
  font-size: 17px;
}
`;

export const TodoListContainer = styled.div`
width: 80%;
min-height: 300px;

@media (min-width: 768px) {
  max-width: 800px;
  margin-top: 20px;
}
`;

export const TodoItem = styled.div`
background: #ffffff;
color: black;
margin: 3px;
padding: 5px;
border-radius: 2px;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

export const TodoDescription = styled.p`
color: #414344;
font-size: 14px;
margin: 0px;

@media (min-width: 768px) {
  font-size: 16px;
}
`;

export const RemoveButton = styled.button`
background-color: #ffffff;
margin-right: 8px;
padding: 10px 12px;
cursor: pointer;
border-radius: 50%;
border: none;
outline: none;
&:hover {
  color: #ffffff;
  background-color: #f3f3f3;
}
`;
