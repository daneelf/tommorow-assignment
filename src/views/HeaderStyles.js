import styled from "styled-components";

const Header = styled.nav`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 0 0.8rem;
  background-color: #cdcdcd2e;
  box-shadow: 0px 0px 7px 1px rgba(0,0,0,0.2);
  text-align:center;
`;

const Title = styled.h1`
  text-align: center;
  color: #f30772;
  font-family: 'VT323', monospace;
  font-size: 28px;
`;

export {
    Header,
    Title
}