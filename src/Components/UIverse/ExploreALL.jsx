import React from 'react';
import styled from 'styled-components';

const Explore = ({ color = "#149a65", Name,onClick }) => {
  return (
    <StyledWrapper color={color}  onClick={onClick} >
      <button className="button">
        <span className="button__icon-wrapper">
          <svg viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="button__icon-svg" width={10}>
            <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" fill="currentColor" />
          </svg>
          <svg viewBox="0 0 14 15" fill="none" width={10} xmlns="http://www.w3.org/2000/svg" className="button__icon-svg button__icon-svg--copy">
            <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" fill="currentColor" />
          </svg>
        </span>
        {Name}
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  --clr: ${(props) => props.color};

  .button {
    line-height: 1;
    text-decoration: none;
    display: inline-flex;
    border: none;
    cursor: pointer;
    align-items: center;
    gap: 0.50rem;
    background-color: var(--clr);
    color: #fff;
    border-radius: 10rem;
    font-size:12px;
    font-weight: 600;
    padding: 0.60rem 1.5rem;
    padding-left: 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: background-color 0.3s;
  }

  .button__icon-wrapper {
    flex-shrink: 0;
    width: 22px;
    height: 22px;
    position: relative;
    color: var(--clr);
    background-color: #fff;
    border-radius: 50%;
    display: grid;
    place-items: center;
    overflow: hidden;
  }

  .button:hover {
    background-color: #1E3A5F;
  }

  .button:hover .button__icon-wrapper {
    color: #1E3A5F;
  }

  .button__icon-svg--copy {
    position: absolute;
    transform: translate(-150%, 150%);
  }

  .button:hover .button__icon-svg:first-child {
    transition: transform 0.3s ease-in-out;
    transform: translate(150%, -150%);
  }

  .button:hover .button__icon-svg--copy {
    transition: transform 0.3s ease-in-out 0.1s;
    transform: translate(0);
  }
`;

export default Explore;
