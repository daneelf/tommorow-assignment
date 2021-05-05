import React from "react";
import { Box, Button } from "@material-ui/core";
import { Header, Title } from "./HeaderStyles";

const HeaderContainer = ({ handledAddColumn, handleClearBoard }) => (
  
  <Header>
    <Title> Tasks Board 5000</Title>
    <Box>
      <Button
        variant="outlined"
        size="small"
        color="primary"
        style={{ marginRight: "10px" }}
        onClick={handledAddColumn}
      >
        Add column
      </Button>
      <Button
        variant="outlined"
        size="small"
        color="secondary"
        onClick={handleClearBoard}
      >
        Clear board
      </Button>
    </Box>
  </Header>
);

export default HeaderContainer;
