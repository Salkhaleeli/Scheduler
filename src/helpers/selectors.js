import React from "react";


export function getAppointmentsForDay(state, day) {
  let array = state.days
  let app=[];
  let result = [];
  for (const i of array) {
    if (i.name === day) {
      app = i.appointments;
    }
  }
  for (const appointmentId of app) {
    result.push(state.appointments[appointmentId])
  }
   return result
}