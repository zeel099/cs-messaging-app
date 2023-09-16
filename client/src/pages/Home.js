import React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useHistory } from "react-router-dom";

export const Home = () => {
  const theme = useTheme();
  let history = useHistory();

  function handleSubmitAgent() {
    history.push("/select-agent");
  }

  function handleSubmitCustomer() {
    history.push("/select-customer");
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "white",
      }}
    >
      <Box
        display="flex"
        borderRadius={theme.shape.borderRadius}
        justifyContent="center"
        alignItems="center"
        flexDirection={"column"}
        sx={{
          width: 400,
          height: 400,
          bgcolor: "#99cfff73",
          padding: "2rem 2rem",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
          }}
        >
          Select User Type
        </Typography>

        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          sx={{
            marginTop: 2,
          }}
          onClick={() => {
            handleSubmitAgent();
          }}
        >
          Agent
        </Button>
        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          sx={{
            marginTop: 2,
          }}
          onClick={() => {
            handleSubmitCustomer();
          }}
        >
         <b> Customer</b>
        </Button>
      </Box>
    </Box>
  );
};
export default Home;
