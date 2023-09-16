import React, { useEffect } from "react";
import { CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import { DropDown } from "../components/Dropdown";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useHistory } from "react-router-dom";
import { getAllCustomers } from "../utils/api";

export const CustomerSelection = () => {
  const theme = useTheme();
  let history = useHistory();
  const [agentIds, setAgentIds] = React.useState([]);
  const [selectedId, setSelectedId] = React.useState("");

  useEffect(() => {
    async function getData() {
      const data = await getAllCustomers();
      if (data.length !== 0) {
        var arr = data.map((e) => e.custId);
        setAgentIds(arr);
      }
    }
    getData();
  }, []);

  function handleSubmit() {
    console.log(selectedId);
    history.push(`/customer-home/${selectedId}`, { custId: selectedId });
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
          Select a Customer
        </Typography>
        {agentIds.length !== 0 ? (
          <DropDown
            label={"CustId"}
            menuItems={agentIds}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
          />
        ) : (
          <>
            <CircularProgress />
          </>
        )}
        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          sx={{
            marginTop: 2,
          }}
          onClick={() => {
            handleSubmit();
          }}
        >
          Proceed
        </Button>
      </Box>
    </Box>
  );
};
export default CustomerSelection;
