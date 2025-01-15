import styled from "styled-components";

export const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100vw;
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.textColor};
  transition: background 0.3s, color 0.3s;
`;
export const InputWrap = styled.div`
  position: relative;
  .input-btn {
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
    transition: all .3s;
  }
`

export const Input = styled.input`
  width: 300px;
  padding: 10px 15px;
  margin: 20px 0;
  border: none;
  border-radius: 25px;
  outline: none;
  font-size: 16px;
  color: ${(props) => props.theme.textColor};
  background: ${(props) => props.theme.cardBackground};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Button = styled.button`
  background: ${(props) => props.theme.buttonBackground};
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  margin: 10px 0;
  color: ${(props) => props.theme.textColor};
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;

  &:hover {
    background: rgba(255, 255, 255, 0.6);
    transform: scale(1.05);
  }
`;

export const WeatherCard = styled.div`
  background: rgba(255, 255, 255, 0.15);
  border-radius: 15px;
  padding: 20px;
  width: 350px;
  text-align: center;
  box-shadow: 0px 8px 32px rgba(0, 0, 0, 0.37);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: ${(props) => props.theme.textColor};
  margin-top: 20px;
`;

export const City = styled.h1`
  font-size: 24px;
  margin: 10px 0;
`;

export const Temperature = styled.p`
  font-size: 48px;
  font-weight: bold;
  margin: 10px 0;
`;

export const Sky = styled.p`
  font-size: 18px;
  margin: 10px 0;
  font-style: italic;
`;
export const RadioGroup = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

export const RadioOption = styled.div`
  display: flex;
  align-items: center;

  input {
    margin-right: 8px;
    cursor: pointer;
  }

  label {
    font-size: 14px;
    cursor: pointer;
    color: ${(props) => props.theme.textColor};
  }
`;