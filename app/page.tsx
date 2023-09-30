import { Box, Button, Card, Container, Divider, Link, Paper, Stack, Typography } from "@mui/material";
import React from "react";

type Props = {};

function IndexPage({}: Props) {
  return (
    <>
      <Container>
        <Stack>
        <Typography variant="h3" gutterBottom my={5} textAlign={"center"}>
        Witaj na stronie głównej systemu podlewania!
        </Typography>

        <Button variant="contained" href="/login" size="medium">
          <Typography variant="h5" gutterBottom my={5} textAlign={"center"}>
            Zaloguj się
          </Typography>
        </Button>
        </Stack>

      </Container>
    
    </>
  )
}

export default IndexPage;
