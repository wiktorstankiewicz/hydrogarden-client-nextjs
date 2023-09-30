"use client";
import CircuitCard from "@/components/CircuitCard";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import axiosInstance from "@/app/axios-instance";
import { Circuit } from "../(types)/types";
import dayjs from "dayjs";
type Props = {};

async function fetchAllCircuits()  {
  let circuits: Circuit[] = [];
  try{
    circuits =  (await axiosInstance.get("/circuit")).data;
  }catch(e){
    console.log(e)
    return []
  }
  
return circuits;
}

function Page({}: Props) {
  const [circuits, setCircuits] = React.useState<Circuit[]>([]);

  function updateCircuit(updateCircuit: Circuit) {
    setCircuits((prevCircuits) => {
      const index = prevCircuits.findIndex((circuit) => circuit.id === updateCircuit.id);
      prevCircuits[index] = updateCircuit;
      return [...prevCircuits];
    });
  }

  React.useEffect(() => {
    fetchAllCircuits().then((circuits) => {
      setCircuits(circuits);
    });
  }, []);

  if(circuits.length === 0) return (<Typography variant="h4" sx={{textAlign: "center"}}>Nie odnaleziono żadnych obwodów</Typography>)

  return (
    <>
      <Container sx={{marginTop: 5}}>
        <Grid container columnSpacing={2} rowSpacing={2}>
          {circuits.map((circuit, index) => (
            <Grid key={index} item xs={12} sm={4} lg={3}>
              <CircuitCard  circuit={circuit} setYourself={(circuit) => updateCircuit(circuit)} />
          </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default Page;
