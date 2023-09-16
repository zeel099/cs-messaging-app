import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Popover from '@mui/material/Popover';
import { allotQuery } from '../utils/api'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function MessageCard({ item, con, setSelectedConvo, isAgent, update, selectedConvo, customerData }) {
  const [bgColor, setBgColor] = useState(false);
  const location = useLocation()
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [update1, setUpdate1] = React.useState(0)
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    if (selectedConvo && Object.keys(selectedConvo).length !== 0) {
      if (selectedConvo.conversation._id !== item._id) {
        setBgColor(false)
      } else {
        setBgColor(true)
      }
    }// eslint-disable-next-line
  }, [selectedConvo])

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const [diaOpen, setDiaOpen] = React.useState(false);

  const handleClickOpenDia = () => {
    setDiaOpen(true);
  };

  const handleCloseDia = () => {
    setDiaOpen(false);
  };

  const handleAllotQuery = async () => {

    const res = await allotQuery({ conversationId: item._id, agentId: location.state.agentId })
    if (res) {
      handleCloseDia()
      update(Math.random())
    }

  }

  
  const showUserDetails = (item) => {
    var foundItem = customerData.find(obj => {
      return obj.custId === item.custId
    })
  
    return(
      foundItem!==undefined ?
    <>
    <Typography variant="body2">{"CustomerId: " + foundItem.custId}</Typography>

    <Typography variant="body2">{"Address: " + foundItem.address}</Typography>

    <Typography variant="body2">{"Phone: " + foundItem.phone}</Typography>
    </>
    :<>
    <Typography variant="body2">Loading</Typography>
    </>
    )
  }
  return (
    <>
      <Box
        padding="1rem"
        sx={{
          "&:hover": {
            backgroundColor: bgColor ? null : "#e1e1e18f",
          },
          backgroundColor: bgColor ? "#b7b7b77f" : null
        }}
        onClick={() => {
          // console.log("item",{userData:item})
          if (item.agentId === "empty") {
            handleClickOpenDia()
          } else {

            setSelectedConvo({ conversation: item })

          }

        }}
      >
        <Grid container
        >
          <Grid item>
          </Grid>
          <Grid item flexGrow="1">
            <Box>
              <Grid
                container
              >
                <Grid
                  container
                  flexWrap="nowrap"
                  justifyContent="space-between"
                // lg={12}
                >
                  <Grid item
                    sx={{
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingLeft: 0
                      }}
                    >
                      <Avatar
                        fontSize={"small"}
                        aria-owns={open ? 'mouse-over-popover' : undefined}
                        aria-haspopup="true"
                        onMouseEnter={handlePopoverOpen}
                        onMouseLeave={handlePopoverClose}
                      >
                        <AccountCircleIcon />
                      </Avatar>
                      {
                        isAgent?
                        
                        <Popover
                        id="mouse-over-popover"
                        sx={{
                          pointerEvents: 'none',
                        }}
                        open={open}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'left',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}
                        onClose={handlePopoverClose}
                        disableRestoreFocus
                      >
                        <Box
                          sx={{
                            p: 1
                          }}
                        >
                          <Typography variant="body2" sx={{ fontWeight: "bold" }}>User Details</Typography>
                          {showUserDetails(item)}
                        </Box>
                      </Popover> :<></>
                      }
                      

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          ml: 1
                        }}
                      >
                        <Typography
                          sx={{ fontSize: "28px", fontWeight: 'bold' }}
                        >
                          {
                            !isAgent ?
                              <>
                                <Typography variant="body2">{item.agentId !== "empty" ? item.agentId : "unalloted query"}</Typography>

                              </>
                              :
                              <>
                                <Typography variant="body2">{item.custId}</Typography>

                              </>
                          }
                        </Typography>

                        <Box>
                          {
                            item.latestMsg === null || item.latestMsg === undefined ?
                              <Typography
                                variant="caption"
                              >
                                Msg Not Available
                              </Typography>
                              :
                              <>
                                <Typography
                                  variant="caption"
                                >
                                  {item.latestMsg.isAgent ? item.agentId : item.custId}
                                  {": "}
                                </Typography>

                                <Typography
                                  variant="caption"
                                >
                                  {item.latestMsg.text}
                                </Typography>
                              </>
                          }

                        </Box>
                      </Box>


                      {
                        item.isUrgent
                          ?
                          <Box
                            sx={{
                              width: 50,
                              height: 10,
                              backgroundColor: "red",
                              color: "white",
                              textAlign: "center",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              p: 1,
                              borderRadius: 2,
                              ml: 8
                            }}
                          >

                            <Typography
                              variant={"overline"}
                            >
                              Urgent
                            </Typography>

                          </Box>
                          : <>
                          </>
                      }

                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Dialog
        open={diaOpen}
        onClose={handleCloseDia}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Alert!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {
              isAgent ? "Do you want to allot this query to you" : " This Query is Un Alloted. Please Wait!!"
            }
          </DialogContentText>
        </DialogContent>
        {
          isAgent ? <>
            <DialogActions>
              <Button onClick={handleCloseDia}>Disagree</Button>
              <Button onClick={() => { handleAllotQuery() }} autoFocus>
                Agree
              </Button>
            </DialogActions>
          </>
            :
            <>

            </>
        }

      </Dialog>
    </>
  );
}
