import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import MessageCard from "../components/MessageCard.js";
// import { io } from "socket.io-client";
import { getCustomerDetails } from '../utils/api'

export default function ConvSideBar({
  data,
  setSelectedConvo,
  isAgent,
  update,
  selectedConvo,
  setCustomerList,
  customerData,
  customerList,
  setCustomerData
}) {
  const [convData, setConvData] = useState(data);

  useEffect(() => {
    setConvData(data);
  }, [data]);
  
  
  useEffect(() => {
    if(isAgent){
      async function customerDataFetch(){
        console.log(customerList, customerData, convData)
        for (const item of convData ){
          if (!customerList.includes(item.custId)){
            const res = await getCustomerDetails(item.custId)
            setCustomerList(prev => [...prev, item.custId])
            setCustomerData(prev => [...prev, res])
          }
        }
      }
      customerDataFetch()
    }
    // eslint-disable-next-line
  }, [convData]);



  return (
    <Box
      sx={{
        overflow: "hidden",
        overflowY: "scroll",
        maxHeight: "430px",
      }}
    >
      {convData.length > 0 ? (
        <>
          {convData.map((item, index) => (
            <MessageCard
              key={index}
              item={item}
              isAgent={isAgent}
              update={update}
              selectedConvo={selectedConvo}
              customerData={customerData}
              // con = {item.conversation}
              setSelectedConvo={setSelectedConvo}
            />
          ))}
        </>
      ) : (
        <Box textAlign="center">
          <CircularProgress size={20} color="primary" />
        </Box>
      )}
    </Box>
  );
}
