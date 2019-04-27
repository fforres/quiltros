import { css } from '@emotion/core';

export const canvasStyle = css`
  display: flex;
  margin: 1rem;
  width: 35rem;
  justify-content: center;
  & .konvajs-content {
    background: ghostwhite;
    border: solid 1px lightgray;
  }
`;
