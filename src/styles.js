import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  width: auto;
  margin: 30px 20px;
  /* background-color: #fff; */

  canvas {
    border: 2px solid #ff0000;
    background: linear-gradient(-90deg, #1b1b1b, #323232);
    /* background-color: #323232; */
    /* background-color: #1b1b1b; */
    margin-bottom: 5px;
  }

  .gameover {
    color: #ff0000;
    font-size: 24px;
    font-weight: bold;
    /* margin: 5px 0px; */
  }

  .below {
    display: flex;
    margin-top: 10px;
    justify-content: space-between;
    align-items: center;
  }

  button {
    /* margin-top: 10px; */
    padding: 5px;
    font-weight: bold;
    border: 2px solid #ff0000;
    color: #000;
    border-radius: 4px;
    font-size: 24px;
    background: #009a53;
  }

  .title {
    margin-top: -10px;
    font-weight: bold;
    font-size: 28px;
    color: #009a53;
    border: 2px solid #000;
    padding: 0 5px;
    border-radius: 4px;
  }

  .author {
    display: flex;
    font-weight: bold;
    font-size: 12px;
    justify-content: center;
    color: #ff0000;
  }

  .score {
    display: flex;
    font-weight: bold;
    font-size: 24px;
    border: 2px solid #000;
    color: #d12b2b;
    padding: 0 5px;
    border-radius: 4px;
  }
`;
