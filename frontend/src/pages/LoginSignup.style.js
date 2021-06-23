import styled from "styled-components/macro";
import bali from "../assets/bali.jpg";
import beach from "../assets/beach.jpg";

export const Wrapper = styled.div`
background-image: url("${bali}");
background-size: cover;
overflow: scroll;
height: 100vh;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;

@media (min-width: 768px) {
  flex-direction: row;
}

@media (min-width: 1024px) {
  background-image: url("${beach}");
}
`;

export const InformationContainer = styled.div`
background-color: rgba(0, 0, 0, 0.56);
width: 75%;
height: 300px;
margin-top: 20px;
border-radius: 2px 2px 0px 0px;
text-align: center;

@media (min-width: 768px) {
  height: 400px;
  max-width: 400px;
  margin-bottom: 20px;
  margin-left: 40px;
  border-radius: 2px 0px 0px 2px;
}
`;

export const InformationTitle = styled.h2`
color: #ffffff;
font-size: 28px;
margin: 25px 0px 10px 0px;
span {
  color: #7497ad;
}
@media (min-width: 768px) {
  margin-top: 40px;
}
`;

export const LogoWhite = styled.img``;

export const InformationText = styled.p`
color: #ffffff;
font-size: 14px;
margin: 2px 25px;

@media (min-width: 768px) {
  font-size:16px;
  margin-top: 40px;
}
`;

export const Form = styled.form`
background: white;
width: 75%;
height: 330px;
margin-bottom: 20px;
border-radius: 0px 0px 2px 2px;
text-align: center;

@media (min-width: 768px) {
  height: 400px;
  max-width: 400px;
  margin-top: 20px;
  margin-right: 40px;
}
`;

export const InputTitle = styled.h3`
color: #414344;
font-size: 15px;
margin: 15px 10px 0px;display: flex;
justify-content: center;

@media (min-width: 768px) {
  font-size: 18px;
  margin-top: 40px;
}
`;

export const InputText = styled(InputTitle)`
font-size: 14px;
margin-bottom: 15px;

@media (min-width: 768px) {
  font-size: 16px;
  margin-top: 10px;
}
`;

export const InputContainer = styled.div`
margin: 10px;
display: flex;
flex-direction: column;
justify-content: center;
`;

export const InputRow = styled.input`
background: #ffffff;
color: #414344;
border-radius: 2px;
border: solid 3px #f3f3f3;
outline: none;
padding: 5px;
margin: 5px 15px;
text-align: center;
::placeholder,
::-webkit-input-placeholder {
  text-align: center;
  color: #a4a3a3;
}
:-ms-input-placeholder {
  color: #a4a3a3;
}
`;

export const ButtonContainer = styled(InputContainer)``;

export const SubmitButton = styled.button`
background-color: #414344;
font-family: 'Sarabun', sans-serif;
color: #ffffff;
border-radius: 2px;
border: none;
padding: 5px;
margin: 10px 15px;

&:hover {
  background: #7497ad;
  color: white;
  &:active {
    box-shadow: none;
    transform: translateY(2px);
    transform: translateX(2px);
  }
}
`;