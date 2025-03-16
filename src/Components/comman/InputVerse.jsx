import React from 'react';
import styled from 'styled-components';

const Input = ({label}) => {
  return (
    <StyledWrapper>
      <div className="form-control">
        <input type="value" required />
        <label>
      {label.split("").map((char, index) => (
        <span key={index} style={{ transitionDelay: `${index * 50}ms` }}>
          {char}
        </span>
      ))}
    </label>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .form-control {
    position: relative;
    margin: 20px 0 20px ;
    width: 260px;
    
  }

  .form-control input {
    background-color: transparent;
    border: 0;
    border-bottom: 2px #b3b6ba solid;
    display: block;
    width: 100%;
    padding: 10px 0;

    font-size: 15px;
    color: #dadde2;
    font-family: 'Lexend Deca', sans-serif;
  }

  .form-control input:focus,
  .form-control input:valid {
    outline: 0;
    border-bottom-color: #1E3A5F;
  }

  .form-control label {
    position: absolute;
    top: 15px;
    left: 0;
    pointer-events: none;
  }

  .form-control label span {
    display: inline-block;
    font-size: 16px;
    min-width: 5px;
    color:rgb(215, 219, 226);
    transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .form-control input:focus+label span,
  .form-control input:valid+label span {
    color: #fff;
    transform: translateY(-30px);
  }`;

export default Input;
