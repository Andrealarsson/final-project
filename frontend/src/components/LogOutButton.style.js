import styled from "styled-components/macro";

export const Button = styled.button`
background: none;
color: #ffffff;
font-family: 'Sarabun', sans-serif;
font-size: 16px;
border: none;
padding: 0px;

&:hover {
  color: #7497AD;
}
@media (min-width: 768px) {
  margin-right: 70px;
}

@media (min-width: 1025px) {
  margin-right: 100px;
  font-size: 17px;
}
`;