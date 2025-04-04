import React from 'react';
import styled from 'styled-components';

const DeleteButton = ({Name, onClick}) => {
  return (
    <StyledWrapper>
      <button className="button"  onClick={onClick} >
        <span className="button-text">{Name}</span>
        <svg viewBox="0 0 448 512" className="svgIcon"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .button {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: rgb(255, 69, 69);
    border: none;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 0px 5px rgb(255, 69, 69);
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .svgIcon {
    width: 12px;
    transition: opacity 0.3s ease;
  }

  .svgIcon path {
    fill: white;
  }

  .button-text {
    position: absolute;
    color: white;
    font-size: 0px;
    transition: font-size 0.3s ease, opacity 0.3s ease;
    opacity: 0;
  }

  .button:hover {
    width: 60px;
    border-radius: 20px;
    background-color: rgb(216, 18, 18);
  }

  .button:hover .svgIcon {
    opacity: 0;
  }

  .button:hover .button-text {
    font-size: 12px;
    opacity: 1;
  }
`;

export default DeleteButton;
