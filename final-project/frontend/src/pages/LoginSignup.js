import React , { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import styled from 'styled-components/macro'
import user from '../reducers/user'
import { API_URL } from '../reusable/urls'
import mobile from '../assets/mobile.jpg'
import logowhite from '../assets/logowhite.png'

const LoginSignup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState(null);

  const history = useHistory();
  const dispatch = useDispatch();
  const accessToken = useSelector(store => store.user.accessToken)
  const userId = useSelector(store => store.user.userId)
  
  useEffect(() => {
    if(accessToken) {
    history.push(`/users/${userId}/trip`);
  }
}, [ accessToken, history, userId]);

    const onFormSubmit = (e) => {
      e.preventDefault()

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'                
        },  
        body: JSON.stringify({ userId, username, password })
        }

    fetch(API_URL(mode), options)
      .then((res) => res.json())
      .then(data => {
        console.log(data)
        if (data.success) {
          dispatch(user.actions.setUser({userId: data.userId, username: data.username, accessToken: data.accessToken}))
          dispatch(user.actions.setErrors(null))
        } else {
          dispatch(user.actions.setErrors(data))
        }})
        .catch()
      }

  return (
    <Wrapper>
      <InformationContainer>
        <InformationTitle>TRAVEL POCKET</InformationTitle>
        <LogoWhite src= {logowhite} width='100' height='75' alt='logo'/> 
        <InformationText>Har du bokat en resa och tycker det är jobbigt att planera allt inför avresa? 
          Här kan du registrera dina kommande resor, få hjälp med din packlista och få viktig info om pass, 
          visum och försäkringar. Allt på ett och samma ställe.</InformationText>
      </InformationContainer>
      <Form onSubmit={onFormSubmit}>
        <InputContainer>
        <InputTitle>VÄLKOMMEN TILL TRAVEL POCKET</InputTitle>
        {/* <img src= {logored} alt='logo'/> */}
        <InputText>Logga in eller registrera dig för att börja din planering</InputText>
          <InputRow
              type='text'
              value={username}
              title='Username'
              onChange={(e) => setUsername(e.target.value)}
              minLength='4'
              maxLength='20'
              required
              placeholder='Användarnamn'
            />
            <InputRow
              type='password'
              value={password}
              title='Password'
              onChange={(e) => setPassword(e.target.value)}
              minLength='4'
              maxLength='20'
              required
              placeholder='Lösenord'
            />
        </InputContainer>
        <ButtonContainer>
          <SubmitButton type="submit" onClick={() => setMode('login')}>LOGGA IN</SubmitButton>
          <SubmitButton type="submit" onClick={() => setMode('signup')}>REGISTRERA DIG</SubmitButton>
        </ButtonContainer>
      </Form>
    </Wrapper>
    )
  }

export default LoginSignup

const Wrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
margin: 20px;

@media (min-width: 768px) {
  flex-direction: row;
}
`
const InformationContainer = styled.div`
background-image: url('${mobile}');
background-color: #EC3B37;
background-blend-mode: soft-light;
width: 75%;
height: 300px;
border-radius: 30px 30px 0px 0px;
text-align: center;
box-shadow: 3px 40px 30px 2px #ccc;

@media (min-width: 768px) {
  border-radius: 30px 0px 0px 30px;
  height: 400px;
  max-width: 400px;

}
`
const InformationTitle = styled.h2`
color: #ffffff; 
font-size: 20px;
margin: 30px 0px 10px 0px;`

const LogoWhite = styled.img`
`
const InformationText = styled.p`
color: #ffffff;
font-size: 12px;
margin: 20px;`

const Form = styled.form`
width: 75%;
height: 330px;
background: white;
border-radius: 0px 0px 30px 30px;
box-shadow: 3px 40px 30px 2px #ccc;
text-align: center;

@media (min-width: 768px) {
  border-radius: 0px 30px  30px 0px;
  height: 400px;
  max-width: 400px;
}
`
const InputTitle = styled.h3`
display: flex;
justify-content: center;
color: #EC3B37;
font-size: 15px;
margin: 15px 10px 0px;
`
const InputText = styled(InputTitle)`
font-size: 12px;
margin-bottom: 15px;
`
const InputContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
margin: 10px;
`
const InputRow = styled.input`
border-radius: 15px;
border: solid 3px #F3F3F3;
color: #000000;
outline: none;
padding: 5px;
margin: 5px 15px;
background: #ffffff;
::placeholder,
::-webkit-input-placeholder {
  text-align: center;
  color: #A4A3A3;
}
:-ms-input-placeholder {
   color: #A4A3A3;
}
`
const ButtonContainer = styled(InputContainer)`
`
const SubmitButton = styled.button`
background: linear-gradient(to right, #EC3B37 30%, #CB1A16 90%);
color: #ffffff;
border-radius: 15px;
padding: 5px;
margin: 10px 15px;
border: none;
box-shadow: 0px 3px 6px 3px #FFB1A6;
&:hover{
  background: pink;
  color: white;
&:active {
  box-shadow: none;
  transform: translateY(2px);
  transform: translateX(2px);
}
}
`