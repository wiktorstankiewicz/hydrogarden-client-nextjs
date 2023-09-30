"use client"
import React from "react";
import Navbar from "./navbar";
import { BottomNavigation, Container, Stack } from "@mui/material";

type Props = {};

function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Stack display={"flex"} >
        <nav style={{minHeight:50}}>
        <Navbar />
        </nav>
        <div style={{ flex: 1}}>
        {children}
        </div>

        
      </Stack>
    </>
  );
}

export default HomeLayout;
