import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loading">
        <span className="l">L</span>
        <span className="o">o</span>
        <span className="a">a</span>
        <span className="d">d</span>
        <span className="i">i</span>
        <span className="n">n</span>
        <span className="g">g</span>
        <span className="d1">.</span>
        <span className="d2">.</span>
        <div className="load">
          <div className="progress" />
          <div className="progress" />
          <div className="progress" />
          <div className="progress" />
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: #ffffff;

  .loading {
    font-size: 2rem;
    text-align: center;
  }

  span {
    color: black;
    opacity: 0;
    animation: op 2s ease-in-out infinite;
  }

  .l { animation-delay: 0.2s; }
  .o { animation-delay: 0.4s; }
  .a { animation-delay: 0.6s; }
  .d { animation-delay: 0.8s; }
  .i { animation-delay: 1s; }
  .n { animation-delay: 1.2s; }
  .g { animation-delay: 1.4s; }
  .d1 {
    animation: op1 2s ease-in-out infinite;
    animation-delay: 1.6s;
  }
  .d2 {
    animation: op1 2s ease-in-out infinite;
    animation-delay: 2s;
  }

  .load {
    position: relative;
    width: 2em;
    height: 2em;
    margin: 20px auto 0;
  }

  .progress {
    top: 50%;
    position: absolute;
    margin-top: 2em;
    transform: translate(10%, -50%);
    content: '';
    width: 4em;
    height: 4em;
    background: transparent;
    border-radius: 50%;
    animation: load 2s ease-in-out infinite;
    animation-delay: 1s;
  }

  .progress:nth-child(2) {
    left: 50%;
    animation-delay: 1.3s;
  }

  .progress:nth-child(3) {
    left: 180%;
    animation-delay: 1.7s;
  }

  .progress:nth-child(4) {
    left: 300%;
    animation-delay: 2s;
  }

  @keyframes load {
    0%   { background-color: #DB4437; }
    25%  { background-color: #F4B400; }
    75%  { background-color: #0F9D58; }
    100% { background-color: #4285F4; }
  }

  @keyframes op {
    0%   { color: black; opacity: 1; }
    50%  { color: green; opacity: 1; }
    100% { color: black; opacity: 1; }
  }

  @keyframes op1 {
    0%   { color: black; opacity: 1; }
    50%  { color: green; opacity: 0; }
    100% { color: black; opacity: 1; }
  }
`;

export default Loader;
