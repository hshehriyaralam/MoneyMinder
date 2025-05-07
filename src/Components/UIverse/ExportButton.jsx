import React from 'react';
import styled from 'styled-components';

const ExportButton = ({onClick}) => {
  return (
    <StyledWrapper>
      <button className="button"   onClick={onClick}>
        <span className="button-content">Export</span>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .button {
    position: relative;
    overflow: hidden;
    height: 2.5rem;
    padding: 0 1.8rem;
    border-radius: 1.5rem;
    background: #149a65;
    background-size: 400%;
    color: #fff;
    border: none;
    cursor: pointer;
    font-size: 15px;
  }

  .button:hover::before {
    transform: scaleX(1);
  }

  .button-content {
    position: relative;
    z-index: 1;
  }

  .button::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    transform: scaleX(0);
    transform-origin: 0 50%;
    width: 100%;
    height: inherit;
    border-radius: inherit;
    background: #1d4ed8;
    transition: all 0.475s;
  }`;

export default ExportButton;
