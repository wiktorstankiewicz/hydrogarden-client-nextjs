import { Circuit } from '@/app/(types)/types'
import { Dialog, DialogTitle, DialogContent, DialogContentText, Typography, Box, FormGroup, TextField, Button } from '@mui/material'
import dayjs from 'dayjs'
import React from 'react'

type Props = {open: boolean,onClose: ()=> void,onSubmit: (event:any)=>void,  circuit: Circuit}

function EditScheduleModal(props: Props) {
  return (
    <>
    <Dialog
        open={props.open}
        onClose={props.onClose}
      >
        <DialogTitle>Edytuj harmonogram</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="body2" color="text.secondary">
              Podaj dane dotyczące harmonogramu
            </Typography>
          </DialogContentText>
          <form onSubmit={props.onSubmit}>
            <Box>
              <FormGroup>
                <TextField
                  label="Początek"
                  name="startDate"
                  defaultValue={
                    props.circuit.circuitSchedule
                      ? props.circuit.circuitSchedule.startDate
                      : dayjs().format("YYYY-MM-DD")
                  }
                  margin="normal"
                  type="date"
                />
                <TextField
                  label="Koniec"
                  name="endDate"
                  defaultValue={
                    props.circuit.circuitSchedule
                      ? props.circuit.circuitSchedule.endDate
                      : dayjs().add(5, "M").format("YYYY-MM-DD")
                  }
                  margin="normal"
                  type="date"
                />
              </FormGroup>
              <FormGroup>
                <TextField
                  label="Częstotliwość(dni)"
                  name="frequencyDays"
                  defaultValue={
                    props.circuit.circuitSchedule
                      ? props.circuit.circuitSchedule.frequencyDays
                      : 1
                  }
                  margin="normal"
                  type="number"
                  InputProps={{
                    inputProps: {
                      min: 1,
                      max: 100,
                    },
                  }}
                />
                <TextField
                  label="Godzina podlewania"
                  name="startTime"
                  defaultValue={
                    props.circuit.circuitSchedule
                      ? props.circuit.circuitSchedule.startTime
                      : "08:00"
                  }
                  margin="normal"
                  type="time"
                />

                <TextField
                  label="Czas podlewania(min)"
                  name="wateringTime"
                  defaultValue={
                    props.circuit.circuitSchedule
                      ? Math.round(
                          props.circuit.circuitSchedule.wateringTime / 60
                        )
                      : 10
                  }
                  margin="normal"
                  type="number"
                />
              </FormGroup>

              <Button color="primary" type="submit">
                Zatwierdź
              </Button>
              <Button
                color="primary"
                onClick={props.onClose}
              >
                Anuluj
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default EditScheduleModal