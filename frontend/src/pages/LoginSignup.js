import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";

import { API_URL } from "../reusable/urls";
import user from "../reducers/user";
import bali from "../assets/bali.jpg";
import beach from "../assets/beach.jpg";
import logowhite from "../assets/logowhite.png";

const LoginSignup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState(null);

  const history = useHistory();
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.accessToken);
  const userId = useSelector((store) => store.user.userId);

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken)
      history.push("/users/trip");
    }
  }, [accessToken, history]);

  const onFormSubmit = (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, username, password }),
    };

    fetch(API_URL(mode), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(
            user.actions.setUser({
              userId: data.userId,
              username: data.username,
              accessToken: data.accessToken,
            })
          );
          dispatch(user.actions.setErrors(null));
          localStorage.setItem("accessToken", data.accessToken);
        } else {
          dispatch(user.actions.setErrors(data));
        }
      })
      .catch();
  };

  return (
    <Wrapper>
      <InformationContainer>
        <InformationTitle>
          TRAVEL<span>POCKET</span>
        </InformationTitle>
        <LogoWhite src={logowhite} width="100" height="75" alt="logo" />
        <InformationText>
          Har du bokat en resa och tycker det är jobbigt att planera allt inför
          avresa? Här kan du registrera dina kommande resor, lista allt som
          behöver fixas innan avresa och hitta viktig info om pass, visum och
          försäkringar. Allt på ett och samma ställe.
        </InformationText>
      </InformationContainer>
      <Form onSubmit={onFormSubmit}>
        <InputContainer>
          <InputTitle>VÄLKOMMEN TILL TRAVEL POCKET</InputTitle>
          <InputText>
            Logga in eller registrera dig för att börja din planering
          </InputText>
          <InputRow
            type="text"
            value={username}
            title="Username"
            onChange={(e) => setUsername(e.target.value)}
            minLength="4"
            maxLength="20"
            required
            placeholder="Användarnamn"
          />
          <InputRow
            type="password"
            value={password}
            title="Password"
            onChange={(e) => setPassword(e.target.value)}
            minLength="4"
            maxLength="20"
            required
            placeholder="Lösenord"
          />
        </InputContainer>
        <ButtonContainer>
          <SubmitButton type="submit" onClick={() => setMode("login")}>
            LOGGA IN
          </SubmitButton>
          <SubmitButton type="submit" onClick={() => setMode("signup")}>
            REGISTRERA DIG
          </SubmitButton>
        </ButtonContainer>
      </Form>
    </Wrapper>
  );
};

export default LoginSignup;

const Wrapper = styled.div`
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

const InformationContainer = styled.div`
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

const InformationTitle = styled.h2`
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

const LogoWhite = styled.img``;

const InformationText = styled.p`
  color: #ffffff;
  font-size: 14px;
  margin: 2px 25px;

  @media (min-width: 768px) {
    font-size:16px;
    margin-top: 40px;
  }
`;

const Form = styled.form`
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

const InputTitle = styled.h3`
  color: #414344;
  font-size: 15px;
  margin: 15px 10px 0px;display: flex;
  justify-content: center;

  @media (min-width: 768px) {
    font-size: 18px;
    margin-top: 40px;
  }
`;

const InputText = styled(InputTitle)`
  font-size: 14px;
  margin-bottom: 15px;

  @media (min-width: 768px) {
    font-size: 16px;
    margin-top: 10px;
  }
`;

const InputContainer = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const InputRow = styled.input`
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

const ButtonContainer = styled(InputContainer)``;

const SubmitButton = styled.button`
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
