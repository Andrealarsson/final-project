import styled from "styled-components/macro";

export const AddButton = styled.button`
  position: absolute;
  bottom: 20px;
  background-color: rgba(0, 0, 0, 0.56);
  color: #ffffff;
  height: 65px;
  width: 65px;
  font-size: 40px;
  margin-top: 20px;
  border-radius: 50px;
  border: none;
  padding: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  outline: none;
  &:hover {
    color: #7497AD;
  }
  @media (min-width: 768px) {
    bottom: 40px;
    height: 75px;
    width: 75px;
  }`