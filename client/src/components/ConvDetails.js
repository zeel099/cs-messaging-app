import { Button, Grid, Typography, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState, useRef } from "react";
import SendIcon from "@mui/icons-material/Send";
import { EachMessage } from "./EachMessage.js";
import axios from "axios";
import { unAllot } from '../utils/api'
// import { io } from "socket.io-client";

export default function ConvDetails({
  convo,
  isAgent,
  update,
  setSelectedConvo,
  socket,
}) {
  const temp = Object.keys(convo).length !== 0 ? convo.conversation : {};
  // console.log("selectedConvo", temp)
  const [currentChat, setCurrentChat] = useState(temp);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const scrollRef = useRef();

  useEffect(() => {
    const temp = Object.keys(convo).length ? convo.conversation : {};
    // console.log("temp", temp)
    setCurrentChat(temp);
  }, [convo]);

  const userId = isAgent ? currentChat.agentId : currentChat.custId;

  useEffect(() => {
    // socket.current = io(axios.defaults.baseURL);
    if (socket.current !== undefined) {
      socket.current.on("getMessage", (data) => {
        console.log(data);
        setArrivalMessage({
          sender: data.senderId,
          text: data.text,
          createdAt: Date.now(),
          isAgent: data.senderId.includes("A") ? true : false,
        });
      });
    } // eslint-disable-next-line
  }, [arrivalMessage]);

  useEffect(() => {
    arrivalMessage &&
      (currentChat.agentId === arrivalMessage.sender ||
        currentChat.custId === arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  // useEffect(() => {
  //     socket.current.emit("addUser", userId);
  // }, [userId]);

  // useEffect(() => {
  //   dispatch(getPostDetails(id));
  //   dispatch(getComments(id));
  // }, [dispatch, id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        // console.log(currentChat?._id)
        const res = await axios.get("/api/messages/" + currentChat?._id);

        // console.log(res.data)
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async () => {
    // e.preventDefault();
    const message = {
      text: newMessage,
      conversationId: currentChat._id,
      isAgent: userId === currentChat.agentId ? true : false,
    };

    const receiverId =
      userId === currentChat.agentId ? currentChat.custId : currentChat.agentId;
    console.log({
      senderId: userId,
      receiverId,
      text: newMessage,
    });
    if (socket.current !== undefined) {
      socket.current.emit("sendMessage", {
        senderId: userId,
        receiverId,
        text: newMessage,
      });
    }
    try {
      const res = await axios.post("/api/messages", message);
      console.log("res", res);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleUnAllotClick = async () => {
    await unAllot({ conversationId: currentChat._id })
    update(Math.random);
    setSelectedConvo({});
    setCurrentChat({});
  };

  return (
    <Box>
      {Object.keys(currentChat).length ? (
        <>
          <Box borderBottom="1px solid #ccc" padding="8px 20px">
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="h6">
                  {isAgent
                    ? convo.conversation.custId
                    : convo.conversation.agentId}
                </Typography>
              </Grid>

              <Grid item>
                {isAgent ? (
                  <>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={handleUnAllotClick}
                    >
                      UnAllot
                    </Button>
                  </>
                ) : (
                  <></>
                )}
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              // alignItems: 'stretch',
              justifyContent: "space-between",
              // backgroundColor: 'blue',
              height: "92vh",
            }}
          >
            <Box
              sx={{
                // backgroundColor: "red",
                display: "flex",
                flexDirection: "column",
                padding: "1% 3% 0 3%",
                // justifyContent: "center"
                flex: 1,
                overflowX: "hidden",
                overflowY: "auto",
                // width: "100%",
              }}
            >
              {messages.map((item, index) => (
                <div ref={scrollRef}>
                  <EachMessage
                    _id={userId}
                    type={index}
                    key={index}
                    msg={item.text}
                    // senderId={item.sender}
                    // isAgent={item.isAgent}
                    senderCheck={
                      (item.isAgent && userId === currentChat.agentId) ||
                      (!item.isAgent && userId === currentChat.custId)
                    }
                    // currentChat = {currentChat}
                  />
                </div>
              ))}

            </Box>
            <Box
              sx={{
                // backgroundColor: "red",
                px: 2,
                // margin: "auto auto auto 0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // position: "fixed",
                // bottom: 0,
                // width: "100%",
              }}
            >
              <TextField
                id="outlined-multiline-flexible" // label="Multiline"
                multiline
                maxRows={3}
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
                sx={{
                  backgroundColor: "white",
                  // padding:"-2%",
                  width: "100%",
                }}
                // value={value}
                // onChange={handleChange}
                // variant="standard"
              />
              <Button
                variant="contained"
                size="medium"
                onClick={() => {
                  handleSubmit();
                }}
                sx={{
                  marginLeft: "1%",
                }}
                endIcon={<SendIcon />}
              >
                Send
              </Button>
            </Box>
          </Box>
        </>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              // backgroundColor: 'blue',
              height: "92vh",
            }}
          >
            <Typography variant="h5">Select a Chat to get started</Typography>
          </Box>
        </>
      )}
    </Box>
  );
}
