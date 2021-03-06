import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { API_URL } from "../reusable/urls";
import user from "../reducers/user";
import logowhite from "../assets/logowhite.png";
import { 
  Wrapper, 
  InformationContainer, 
  InformationTitle, 
  LogoWhite, 
  InformationText, 
  Form, 
  InputTitle, 
  InputText, 
  InputContainer, 
  InputRow, 
  ButtonContainer, 
  SubmitButton 
} from "./LoginSignup.style";

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
          Har du bokat en resa och tycker det ??r jobbigt att planera allt inf??r
          avresa? H??r kan du registrera dina kommande resor, lista allt som
          beh??ver fixas innan avresa och hitta viktig info om pass, visum och
          f??rs??kringar. Allt p?? ett och samma st??lle.
        </InformationText>
      </InformationContainer>
      <Form onSubmit={onFormSubmit}>
        <InputContainer>
          <InputTitle>V??LKOMMEN TILL TRAVEL POCKET</InputTitle>
          <InputText>
            Logga in eller registrera dig f??r att b??rja din planering
          </InputText>
          <InputRow
            type="text"
            value={username}
            title="Username"
            onChange={(e) => setUsername(e.target.value)}
            minLength="4"
            maxLength="20"
            required
            placeholder="Anv??ndarnamn"
          />
          <InputRow
            type="password"
            value={password}
            title="Password"
            onChange={(e) => setPassword(e.target.value)}
            minLength="4"
            maxLength="20"
            required
            placeholder="L??senord"
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