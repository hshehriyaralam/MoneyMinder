import React from 'react';
import styled from 'styled-components';

const TextArea = ({ label }) => {
  return (
    <StyledWrapper>
      <div className="form-control">
        <textarea required rows="3" />
        <label>
          {label.split('').map((char, index) => (
            <span key={index} style={{ transitionDelay: `${350 - index * 50}ms` }}>
              {char}
            </span>
          ))}
        </label>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .form-control {
    position: relative;
    margin: 20px 0 40px;
    width: 100%;
  }

  .form-control textarea {
    background-color: transparent;
    border: 2px solid #fff;
    width: 100%;
    padding: 10px;
    font-size: 18px;
    color: #fff;
    resize: none;
    min-height: 100px;
  }

  .form-control textarea:focus,
  .form-control textarea:valid {
    outline: 0;
    border-color: lightblue;
  }

  .form-control label {
    position: absolute;
    top: 10px;
    left: 10px;
    pointer-events: none;
  }

  .form-control label span {
    display: inline-block;
    font-size: 18px;
    min-width: 5px;
    color: #fff;
    transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .form-control textarea:focus + label span,
  .form-control textarea:valid + label span {
    color: lightblue;
    transform: translateY(-30px);
  }
`;

export default TextArea;