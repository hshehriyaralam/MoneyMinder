import React from 'react';
import styled from 'styled-components';

const SignUpButton = ({Name}) => {
  return (
    <StyledWrapper>
      <button className="signupBtn">
        {Name}
        <span className="arrow">
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512" fill="rgb(183, 128, 255)"><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" /></svg>
        </span>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .signupBtn {
    width: 145px;
    height: 40px;
    border-radius: 30px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 20px;
    gap: 9px;
    color: white;
    background: #0D4D66;
    position: relative;
    cursor: pointer;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.212);
  }

  .arrow {
    position: absolute;
    right: 12.10px;
    background-color: rgb(255, 255, 255);
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }

  .signupBtn:hover .arrow {
    animation: slide-in-left 0.9s cubic-bezier(0.280, 0.490, 0.490, 0.980) both;
  }

  @keyframes slide-in-left {
    0% {
      transform: translateX(-10px);
      opacity: 0;
    }

    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }`;

export default SignUpButton;
