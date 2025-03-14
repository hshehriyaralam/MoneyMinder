import React from 'react';
import styled from 'styled-components';

const Input = ({label}) => {
  return (
    <StyledWrapper>
      <div className="form-control">
        <input required type="number" />
        <label>
          <span style={{transitionDelay: '350ms'}}>{label[0]}</span>
          <span style={{transitionDelay: '300ms'}}>{label[1]}</span>
          <span style={{transitionDelay: '250ms'}}>{label[2]}</span>
          <span style={{transitionDelay: '200ms'}}>{label[3]}</span>
          <span style={{transitionDelay: '150ms'}}>{label[4]}</span>
          <span style={{transitionDelay: '100ms'}}>{label[5]}</span>
          <span style={{transitionDelay: '50ms'}}>{label[6]}</span>
          <span style={{transitionDelay: '0ms'}}>{label[7]}</span>
          <span style={{transitionDelay: '0ms'}}>{label[8]}</span>
          <span style={{transitionDelay: '0ms'}}>{label[9]}</span>
          <span style={{transitionDelay: '0ms'}}>{label[10]}</span>
        </label>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .form-control {
    position: relative;
    margin: 20px 0 40px;
    width: 190px;
  }

  .form-control input {
    background-color: transparent;
    border: 0;
    border-bottom: 2px #fff solid;
    display: block;
    width: 100%;
    padding: 15px 0;
    font-size: 18px;
    color: #fff;
  }

  .form-control input:focus,
  .form-control input:valid {
    outline: 0;
    border-bottom-color: lightblue;
  }

  .form-control label {
    position: absolute;
    top: 15px;
    left: 0;
    pointer-events: none;
  }

  .form-control label span {
    display: inline-block;
    font-size: 18px;
    min-width: 5px;
    color: #fff;
    transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .form-control input:focus+label span,
  .form-control input:valid+label span {
    color: lightblue;
    transform: translateY(-30px);
  }`;

export default Input;
