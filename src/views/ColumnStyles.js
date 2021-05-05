import styled from "styled-components";

const ColumnWrapper = styled.div`
  margin: 10px;
  padding: 10px;
  border: 1px solid #dbdbdb;
  border-radius: 2px;
  min-width: 300px;
  max-height: 830px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background-color: #cfcbcb38;
  overflow-y: auto;
  border-radius: 8px;
  box-shadow: 0px 0px 7px 1px rgba(0, 0, 0, 0.2);
`;

const Container = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

export { ColumnWrapper, Container };
