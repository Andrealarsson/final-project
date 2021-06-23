import styled from "styled-components/macro";

export const TodoForm = styled.form`
  position: absolute;
  bottom: 20px;
  width: 80%;
  padding: 5px 10px 20px 10px;
  margin: 20px 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  
  @media (min-width: 768px) {
    max-width: 800px;
    margin-top: 20px;
  }
`;
export const TodoInput = styled.input`
  background-color: rgba(0, 0, 0, 0.56);
  font-size: 14px;
  color: #ffffff;
  resize: none;
  height: 55px;
  width: 100vw;
  border-radius: 2px;
  border: none;
  padding: 0px;
  overflow-wrap: break-word;
  outline: none;
  @media (min-width: 768px) {
    height: 60px;
    min-width: 313px;
    font-size: 16px;
  }
`;
export const AddButton = styled.button`
  background-color: rgba(0, 0, 0, 0.56);
  color: #ffffff;
  height: 55px;
  resize: none;
  width: 65px;
  font-size: 40px;
  border-radius: 2px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  outline: none;
  &:hover {
  color: #7497AD;}
    
  @media (min-width: 768px) {
    height: 60px;
    width: 65px;
  } 
  `;
