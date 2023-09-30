"use client";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  IconButton,
  Menu,
  MenuItem,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import EventIcon from "@mui/icons-material/Event";
import Image from "next/image";
import { Clear, Edit, EditCalendar, EventBusy } from "@mui/icons-material";
import { Circuit, CircuitSchedule } from "@/app/(types)/types";
import dayjs from "dayjs";
import axiosInstance from "@/app/axios-instance";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { rename } from "fs";
import EditScheduleModal from "./EditScheduleModal";
import RenameScheduleModal from "./RenameScheduleModal";
import ClearScheduleDialog from "./ClearScheduleDialog";

function CircuitCard(props: {
  circuit: Circuit;
  setYourself: (arg: Circuit) => void;
}) {
  const [clearScheduleModalOpen, setClearScheduleModalOpen] = useState(false);
  const [editScheduleModalOpen, setEditScheduleModalOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [renameCircuitModalOpen, setRenameCircuitModalOpen] = useState(false);
  const handleEditScheduleModalClose = () => {
    setEditScheduleModalOpen(false);
  };

  const handleClearScheduleSubmit = () => {
    //delete schedule
    const circuitSchedule = props.circuit.circuitSchedule;
    if (circuitSchedule == undefined) {
      return;
    }
    console.log(circuitSchedule);

    axiosInstance
      .delete(`/circuit-schedule/${circuitSchedule.id}`)
      .then((response) => {
        console.log(response.data);
        props.setYourself({ ...props.circuit, circuitSchedule: undefined });
      });
    setClearScheduleModalOpen(false);
  };

  const handleEditScheduleSubmit = (
    event: any
  ) => {
    event.preventDefault();
    const startDate = event.target.startDate.value;
    const endDate = event.target.endDate.value;
    const frequencyDays = event.target.frequencyDays.value;
    const wateringTime = event.target.wateringTime.value;
    const circuitScheduleId = props.circuit.circuitSchedule?.id;
    const startTime = event.target.startTime.value;

    const circuitSchedule = {
      id: circuitScheduleId,
      startDate: startDate,
      startTime: startTime,
      endDate: endDate,
      frequencyDays: frequencyDays,
      wateringTime: wateringTime * 60,
    };
    axiosInstance
      .put("/circuit-schedule/update", circuitSchedule)
      .then((response) => {
        console.log(response.data);
        props.setYourself({
          ...props.circuit,
          circuitSchedule: { ...response.data },
        });
      });

    //props.setYourself({...props.circuit, circuitSchedule: {...circuitSchedule, deactivated: props.circuit.circuitSchedule.deactivated, }});
    setEditScheduleModalOpen(false);
  };

  const handleDeactivateSchedule = () => {
    //deactivate schedule
    const circuitSchedule = props.circuit.circuitSchedule;
    if (circuitSchedule == undefined) {
      return;
    }

    axiosInstance
      .patch(`/circuit-schedule/deactivate/${circuitSchedule.id}`)
      .then((response) => {
        console.log(response.data);
        props.setYourself({
          ...props.circuit,
          circuitSchedule: { ...circuitSchedule, deactivated: true },
        });
      });
  };

  const handleActivateSchedule = () => {
    //deactivate schedule
    const circuitSchedule = props.circuit.circuitSchedule;
    if (circuitSchedule == undefined) {
      return;
    }

    axiosInstance
      .patch(`/circuit-schedule/activate/${circuitSchedule.id}`)
      .then((response) => {
        console.log(response.data);
        props.setYourself({
          ...props.circuit,
          circuitSchedule: { ...circuitSchedule, deactivated: false },
        });
      });
  };

  const handleMenuOpen = (event: any) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleRenameCircuitSubmit = (
    event: any
  ) => {
    event.preventDefault();
    const circuitName = event.target.circuitName.value;
    const circuitId = props.circuit.id;
    axiosInstance
      .post(`/circuit/rename`, { id: circuitId, circuitName: circuitName })
      .then((response) => {
        console.log(response.data);
        props.setYourself({ ...props.circuit, circuitName: circuitName });
      });
    setRenameCircuitModalOpen(false);
  };

  const handleToggleCircuit = () => {
    const circuit = props.circuit;
    axiosInstance
      .post(`/hydroponic/${circuit.circuitState == 1? "off": "on"}`, circuit.circuitCode )
      .then((response) => {
        console.log(response.data);
        props.setYourself({ ...props.circuit, circuitState: circuit.circuitState == 1? 0: 1 });
      });
  };

  return (
    <>
      <Card>
        <CardHeader
          title={props.circuit.circuitName}
          subheader={(() => {
            return `Obieg ${props.circuit.circuitCode}`;
          })()}
          action={
            <IconButton onClick={handleMenuOpen}>
              <MoreHorizIcon />
            </IconButton>
          }
        />

        <CardContent>
          {props.circuit.circuitSchedule?.deactivated ? (
            <>
              <Typography variant="body2" color="text.subtitle1">
                <b>Harmonogram jest zawieszony!</b>
              </Typography>
            </>
          ) : (
            <></>
          )}
          {true ? (
            <>
              <Image
                src="/led-green-black.svg"
                width={10}
                height={10}
                alt="Włączony"
              />
              <Box display={"inline-block"} ml={1}>
                <Typography variant="body2" color="text.secondary">
                  Włączony
                </Typography>
              </Box>
            </>
          ) : (
            <>
              <Image
                src="/led-red-black.svg"
                width={10}
                height={10}
                alt="Wyłączony"
              />
              <Box display={"inline-block"} ml={1}>
                <Typography variant="body2" color="text.secondary">
                  Wyłączony
                </Typography>
              </Box>
            </>
          )}

          {props.circuit.circuitSchedule ? (
            <>
              <Typography variant="body2" color="text.secondary">
                Harmonogram od {props.circuit.circuitSchedule.startDate} do{" "}
                {props.circuit.circuitSchedule.endDate} podlewać{" "}
                {new String(
                  props.circuit.circuitSchedule.wateringTime / 60
                ).substring(0, 3)}{" "}
                minut co {props.circuit.circuitSchedule.frequencyDays} dni o{" "}
                {props.circuit.circuitSchedule.startTime}
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="body2" color="text.secondary">
                Brak harmonogramu
              </Typography>
            </>
          )}
        </CardContent>
        <CardActions>
          {props.circuit.circuitSchedule == undefined ? (
            <>
              <IconButton>
                <EventIcon />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton onClick={() => setEditScheduleModalOpen(true)}>
                <EditCalendar />
              </IconButton>
              <IconButton onClick={() => setClearScheduleModalOpen(true)}>
                <EventBusy />
              </IconButton>
            </>
          )}

          <IconButton>
            <FormControlLabel
              control={<Switch onClick={handleToggleCircuit} checked={props.circuit.circuitState == 1?true:false} />}
              label={props.circuit.circuitState == 1 ? "Wyłącz" : "Włącz"}
            />
          </IconButton>
        </CardActions>
      </Card>

      <RenameScheduleModal
        open={renameCircuitModalOpen}
        onClose={() => setRenameCircuitModalOpen(false)}
        onSubmit={handleRenameCircuitSubmit}
        circuit={props.circuit}
      />
      {props.circuit.circuitSchedule ? (
        <EditScheduleModal
          open={editScheduleModalOpen}
          onClose={() => setEditScheduleModalOpen(false)}
          onSubmit={handleEditScheduleSubmit}
          circuit={props.circuit}
        />
      ) : (
        <></>
      )}
      <ClearScheduleDialog
        open={clearScheduleModalOpen}
        onClose={() => setClearScheduleModalOpen(false)}
        onSubmit={handleClearScheduleSubmit}
      />

      <Menu
        open={Boolean(menuAnchor)}
        anchorEl={menuAnchor}
        onClose={handleMenuClose}
      >
        {props.circuit.circuitSchedule?.deactivated && (
          <MenuItem
            onClick={() => {
              handleActivateSchedule();
              handleMenuClose();
            }}
          >
            Wznów harmonogram
          </MenuItem>
        )}
        {props.circuit.circuitSchedule ? (
          <>
            <MenuItem
              onClick={() => {
                setEditScheduleModalOpen(true);
                handleMenuClose();
              }}
            >
              Edytuj harmonogram
            </MenuItem>
            <MenuItem
              onClick={() => {
                setClearScheduleModalOpen(true);
                handleMenuClose();
              }}
            >
              Wyczyść harmonogram
            </MenuItem>
          </>
        ) : (
          <></>
        )}
        {props.circuit.circuitSchedule &&
        !props.circuit.circuitSchedule?.deactivated ? (
          <>
            <MenuItem
              onClick={() => {
                handleDeactivateSchedule();
                handleMenuClose();
              }}
            >
              Zawieś harmonogram
            </MenuItem>
          </>
        ) : (
          <></>
        )}
        <MenuItem
          onClick={() => {
            setRenameCircuitModalOpen(true);
            handleMenuClose();
          }}
        >
          Zmień nazwę obiegu
        </MenuItem>
      </Menu>
    </>
  );
}

export default CircuitCard;
