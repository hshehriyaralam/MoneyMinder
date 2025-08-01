import React from 'react';
import styled from 'styled-components';

const CancellButton = ({handleBack, value}) => {
  return (
    <StyledWrapper>
      <button className="button"  onClick={handleBack} >
        {value}
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .button {
    position: relative;
    padding: 8px 16px;
    border-radius: 50px;
    border: none;
    color:rgb(217, 225, 233);
    cursor: pointer;
    background-color:#2d5385;
    transition: all 0.2s ease;
  }

  .button:active {
    transform: scale(0.96);
  }

  .button:before,
  .button:after {
    position: absolute;
    content: "";
    width: 150%;
    left: 50%;
    height: 100%;
    transform: translateX(-50%);
    z-index: -1000;
    background-repeat: no-repeat;
  }

  .button:hover:before {
    top: -70%;
    background-image: radial-gradient(circle, #325788 20%, transparent 20%),
      radial-gradient(circle, transparent 20%, #325788 20%, transparent 30%),
      radial-gradient(circle, #325788 20%, transparent 20%),
      radial-gradient(circle, #325788 20%, transparent 20%),
      radial-gradient(circle, transparent 10%, #325788 15%, transparent 20%),
      radial-gradient(circle, #325788 20%, transparent 20%),
      radial-gradient(circle, #325788 20%, transparent 20%),
      radial-gradient(circle, #325788 20%, transparent 20%),
      radial-gradient(circle, #325788 20%, transparent 20%);
    background-size: 10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%, 15% 15%,
      10% 10%, 18% 18%;
    background-position: 50% 120%;
    animation: greentopBubbles 0.6s ease;
  }

  @keyframes greentopBubbles {
    0% {
      background-position: 5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%,
        40% 90%, 55% 90%, 70% 90%;
    }

    50% {
      background-position: 0% 80%, 0% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%,
        50% 50%, 65% 20%, 90% 30%;
    }

    100% {
      background-position: 0% 70%, 0% 10%, 10% 30%, 20% -10%, 30% 20%, 22% 40%,
        50% 40%, 65% 10%, 90% 20%;
      background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
    }
  }

  .button:hover::after {
    bottom: -70%;
    background-image: radial-gradient(circle, #325788 20%, transparent 20%),
      radial-gradient(circle, #325788 20%, transparent 20%),
      radial-gradient(circle, transparent 10%, #325788 15%, transparent 20%),
      radial-gradient(circle, #325788 20%, transparent 20%),
      radial-gradient(circle, #325788 20%, transparent 20%),
      radial-gradient(circle, #325788 20%, transparent 20%),
      radial-gradient(circle, #325788 20%, transparent 20%);
    background-size: 15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 20% 20%, 18% 18%;
    background-position: 50% 0%;
    animation: greenbottomBubbles 0.6s ease;
  }

  @keyframes greenbottomBubbles {
    0% {
      background-position: 10% -10%, 30% 10%, 55% -10%, 70% -10%, 85% -10%,
        70% -10%, 70% 0%;
    }

    50% {
      background-position: 0% 80%, 20% 80%, 45% 60%, 60% 100%, 75% 70%, 95% 60%,
        105% 0%;
    }

    100% {
      background-position: 0% 90%, 20% 90%, 45% 70%, 60% 110%, 75% 80%, 95% 70%,
        110% 10%;
      background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
    }
  }`;

export default CancellButton;
