import React from 'react'
import styled from 'styled-components'

const Input = styled.input.attrs(props => ({ type: props.type}))`
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

const TextInput = ({value, handleChange, type}) => {

return( 
 <>
    <Input id={value} value={value} onChange={handleChange} type={type} />
 </>)
}

export default TextInput