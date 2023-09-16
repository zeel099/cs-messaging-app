import React from 'react'
import { Typography } from "@mui/material";

export const EachMessage = ({ _id, type, msg, isAgent,currentChat,senderCheck }) => {
  // console.log(type%2==0)
  // console.log(type)
  return (
    <>
      {senderCheck ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
          }}
        >
          <Typography
            sx={{
              clear: "both",
              padding: "10px",
              boxSizing: "border-box",
              wordWrap: "break-word",
              marginTop: "10px",
              backgroundColor: "#3288cd",
              color: "white",
              minWidth: "200px",
              maxWidth: "400px",
              borderRadius: "10px",
            }}
          >
            {msg}
          </Typography>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            maxWidth: "50%",
          }}
        >
          <Typography
            sx={{
              clear: "both",
              padding: "10px",
              boxSizing: "border-box",
              wordWrap: "break-word",
              marginTop: "10px",
              backgroundColor: "#444ebb",
              color: "white",
              minWidth: "200px",
              maxWidth: "400px",
              borderRadius: "10px",
            }}
          >
            {msg}
          </Typography>
        </div>
      )}
    </>
  );
}
export default EachMessage