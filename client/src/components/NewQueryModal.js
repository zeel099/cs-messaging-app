import React, { useState } from 'react'
import { Box } from "@mui/system";
import { Button, Typography, TextField, Modal } from "@mui/material";
import { createNewMessage, createConversation } from '../utils/api.js'

export const NewQueryModal = ({ open, handleClose, convData, isAgent, custId, setUpdate,socket }) => {
    const [msg, setMsg] = useState("");

    const handleSearch = async () => {
      try {
        const msgBody = {
          text: msg,
          isAgent: false,
          fm: true,
        };
        const resConv = await createConversation({ custId });
        if (resConv) {
          msgBody.conversationId = resConv._id;
          const res = await createNewMessage(msgBody);
          if (res) {
            if (socket.current !== undefined) {
              socket.current.emit("newQuery", {
                conversationId: resConv._id,
                isUrgent: res.isUrgent,
                text: msg,
                custId: custId,
              });
            }

            setUpdate(Math.random());
            setMsg("");
            handleClose();
          }
        }
      } catch (e) {
        console.log(e);
      }
    };

    return (
      <>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Create Query
            </Typography>
            <Box>
              <Box
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                {
                  <TextField
                    id="filled-search"
                    label="Enter Message"
                    type="text"
                    variant="filled"
                    size={"small"}
                    value={msg}
                    sx={{
                      width: "70%",
                    }}
                    onChange={(e) => {
                      setMsg(e.target.value);
                    }}
                  />
                }
                <Button
                  variant="contained"
                  sx={{
                    ml: 2,
                  }}
                  onClick={() => {
                    handleSearch();
                  }}
                >
                  Create
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>
      </>
    );
}
export default NewQueryModal

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
