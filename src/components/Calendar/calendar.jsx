import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import style from "./calendar.module.css";
import esLocale from "@fullcalendar/core/locales/es";
import { useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";

export default function Calendar() {
  const calendarRef = useRef(null);
  const [value, setValue] = useState(dayjs(new Date()));
  const [open, setOpen] = useState(false);
  const [horas, setHoras] = useState(1);
  const now = new Date();
  const validRange = {
    start: now.toISOString().slice(0, 10), // Fecha actual en formato ISO string
    end: "9999-12-31", // Fecha máxima en el futuro
  };
  const selectConstraint = (arg) => {
    const selectedStart = arg.start;
    const currentDateTime = new Date();
    return selectedStart > currentDateTime;
  };
  const [eventos, setEventos] = useState([
    {
      title: "Reservado",
      start: "2023-07-24T08:00:00",
      end: "2023-07-24T10:00:00",
      backgroundColor: "#0E6655",
      borderColor: "#0E6655",
      textColor: "#F2F3F4",
    },
  ]);
  const handleClickOpen = (info) => {
    setOpen(true);
    const fechaHoraInicio = info.date;
    const fechaHoraFin = new Date(fechaHoraInicio);
    fechaHoraFin.setHours(fechaHoraFin.getHours() + horas);
    setValue(dayjs(fechaHoraInicio));
  };

  const handleClose = () => {
    setOpen(false);
    setHoras(1);
  };
  // const handleReset = () => {
  //   handleClose();
  //   setHoras(1);
  // };
  const renderEventContent = (eventInfo) => {
    return (
      <div className={style.containerEvent}>
        <strong className={style.titleEvent}>{eventInfo.event.title}</strong>
        <strong className={style.titleEvent}>{eventInfo.timeText}</strong>
      </div>
    );
  };

  const handleDateClick = (e) => {
    e.preventDefault();

    // Aquí obtienes la fecha y hora del clic del usuario
    const fechaHoraInicio = value["$d"];
    const fechaHoraFin = new Date(fechaHoraInicio);
    const sumaHoras = parseInt(fechaHoraFin.getHours()) + parseInt(horas);
    fechaHoraFin.setHours(sumaHoras);

    const eventosExistente = calendarRef.current.getApi().getEvents();
    const eventoSuperpuesto = eventosExistente.find((evento) => {
      return (
        (fechaHoraInicio >= evento.start && fechaHoraInicio < evento.end) ||
        (fechaHoraFin > evento.start && fechaHoraFin <= evento.end) ||
        (fechaHoraInicio <= evento.start && fechaHoraFin >= evento.end)
      );
    });

    // Si hay un evento existente que se cruza, no agregamos el nuevo evento
    if (eventoSuperpuesto) {
      alert(
        "La nueva fecha y hora se cruza con un evento existente. Elije otra hora."
      );
      return;
    }

    // Aquí creas el nuevo evento con los detalles obtenidos
    setEventos([
      ...eventos,
      {
        title: "Reservado",
        start: fechaHoraInicio,
        end: fechaHoraFin,
        backgroundColor: "#0E6655",
        borderColor: "#0E6655",
        textColor: "#F2F3F4",
      },
    ]);

    // Aquí agregas el nuevo evento a la lista de eventos
    calendarRef.current.getApi().addEvent(eventos);
    handleClose();
  };

  return (
    <div className={style.containerDate}>
      <FullCalendar
        ref={calendarRef}
        locale={esLocale}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        slotDuration="01:00:00" // Establece la duración de cada ranura en 1 hora
        slotMinTime="08:00:00" // La hora mínima que se mostrará (en este caso, 8:00 AM)
        slotMaxTime="23:00:00"
        allDaySlot={false}
        events={eventos}
        contentHeight="auto"
        validRange={validRange}
        selectConstraint={selectConstraint}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "",
        }}
        eventContent={renderEventContent}
        dateClick={handleClickOpen}
        eventOverlap={false}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Realizar Reserva</DialogTitle>
        <Box component="form" onSubmit={handleDateClick}>
          <DialogContent>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoItem label="Fecha de la Reservas">
                <DesktopDatePicker
                  value={value}
                  format="DD/MM/YY"
                  required
                  sx={{ width: "95%" }}
                />
              </DemoItem>
              <DemoItem label="Hora de la Resera">
                <StaticTimePicker defaultValue={value} />
              </DemoItem>
            </LocalizationProvider>
            <TextField
              autoFocus
              margin="dense"
              id="horas"
              label="Horas"
              value={horas}
              minLength="0"
              onChange={(e) => {
                setHoras(e.target.value);
              }}
              type="number"
              sx={{ width: "95%" }}
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Guardar</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}
