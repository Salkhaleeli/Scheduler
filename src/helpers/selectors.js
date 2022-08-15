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

export function getInterview(state, interview) {
  if (!interview){
    return null;
  };
  const id = interview.interviewer;
  const interviewer = state.interviewers[id];
  return {...interview, interviewer};
};

// export function getInterviewersForDay(state, day) {
//   const result = [];
//   state.days.forEach(data => {
//     if (data.name === day) {
//       data.interviewers.forEach(id => {
//         if ( state.interviewers[id]) {
//           result.push(state.interviewers[id])
//         };
//       });
//     };
//   });
//   return result;
// };

export function getInterviewersForDay(state, day) {
  let array = state.days
  let app=[];
  let result = [];
  for (const i of array) {
    if (i.name === day) {
      app = i.interviewers;
    }
  }
  for (const id of app) {
    result.push(state.interviewers[id])
  }
   return result
}