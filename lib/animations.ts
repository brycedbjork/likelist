import { css, keyframes } from "styled-components";

const fadeInKeyframe = keyframes`
  from: {
    opacity: 0;
    transform: translate(-5px)
  }
  to {
    opacity: 1;
    transform: translate(0px)
  }
`;

export const fadeIn = css`
  opacity: 0;
  transform: translate(-5px);
  animation: ${fadeInKeyframe} 500ms forwards;
`;

const fadeOutKeyframe = keyframes`
  from: {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const fadeOut = css`
  opacity: 1;
  animation-delay: 3s;
  animation: ${fadeOutKeyframe} 100ms forwards;
`;

const spinKeyframe = keyframes`
  from: {
    -webkit-transform: rotate(0deg); transform:rotate(0deg);
  }
  to {
    -webkit-transform: rotate(-360deg); transform:rotate(-360deg);
  }
`;

export const spin = css`
  -webkit-animation: ${spinKeyframe} 10s linear infinite;
  -moz-animation: ${spinKeyframe} 10s linear infinite;
  animation: ${spinKeyframe} 10s linear infinite;
`;
