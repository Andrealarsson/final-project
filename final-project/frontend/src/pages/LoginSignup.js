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
    localStorage.setItem("accesstoken", accessToken);
    if (accessToken) {
      history.push(`/users/${userId}/trip`);
    }
  }, [accessToken, history, userId]);

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
        console.log(data);
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
          avresa? Här kan du registrera din kommande resa, lista allt som
          behöver fixas innan avresa och få viktig info om pass, visum och
          försäkringar. Allt på ett och samma ställe.
        </InformationText>
      </InformationContainer>
      <Form onSubmit={onFormSubmit}>
        <InputContainer>
          <InputTitle>VÄLKOMMEN TILL TRAVEL POCKET</InputTitle>
          {/* <img src= {logored} alt='logo'/> */}
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
  display: flex;
  height: 100vh;
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
  // box-shadow: 3px 40px 30px 2px #ccc;

  @media (min-width: 768px) {
    border-radius: 2px 0px 0px 2px;
    height: 400px;
    margin-bottom: 20px;
    margin-left: 40px;
    max-width: 400px;
  }
`;
const InformationTitle = styled.h2`
  color: #ffffff;
  font-size: 25px;
  margin: 25px 0px 10px 0px;
  span {
    color: #7497ad;
  }
`;

const LogoWhite = styled.img``;
const InformationText = styled.p`
  color: #ffffff;
  font-size: 13px;
  margin: 15px 25px;
`;

const Form = styled.form`
  width: 75%;
  height: 330px;
  background: white;
  margin-bottom: 20px;
  border-radius: 0px 0px 2px 2px;
  // box-shadow: 3px 40px 30px 2px #ccc;
  text-align: center;

  @media (min-width: 768px) {
    height: 400px;
    margin-top: 20px;
    margin-right: 40px;
    max-width: 400px;
  }
`;
const InputTitle = styled.h3`
  display: flex;
  justify-content: center;
  color: #414344;
  font-size: 15px;
  margin: 15px 10px 0px;
`;
const InputText = styled(InputTitle)`
  font-size: 12px;
  margin-bottom: 15px;
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10px;
`;
const InputRow = styled.input`
  border-radius: 2px;
  border: solid 3px #f3f3f3;
  color: #000000;
  outline: none;
  padding: 5px;
  margin: 5px 15px;
  background: #ffffff;
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
  font-family: "Open Sans", sans-serif;
  color: #ffffff;
  border-radius: 2px;
  padding: 5px;
  margin: 10px 15px;
  border: none;
  // box-shadow: 0px 3px 6px 3px #FFB1A6;
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
