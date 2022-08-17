import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import "./styles.scss"
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_DELETE = "ERROR_DELETE";
const ERROR_SAVE = "ERROR_SAVE";

export default function Appointment(props) {


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    console.log('interview', interview)

    props.bookInterview(props.id, interview)
    .then(()=>
      transition(SHOW)
    )
    .catch(error => transition(ERROR_SAVE, true))
  }

  function deleteInterview() {
    transition(DELETING);
    props.cancelInterview(props.id)
    .then(()=>
      transition(EMPTY)
    )
    .catch(error => transition(ERROR_DELETE, true))
  }
  console.log('props.interview', props.interview)
  console.log('MODE', mode)
  return (
    <article className="appointment" data-testid="appointment">
      <Header
        time={props.time}
      />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={()=> transition(CONFIRM)}
        />
      )}
      {mode === CREATE && (
        <Form
        interviewers={props.interviewers}
        onSave={save}
        onCancel={()=>back(EMPTY)}
        />
      )}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM &&
        <Confirm
          message={props.message}
          onCancel={()=>{back(SHOW)}}
          onConfirm={()=>deleteInterview()}
        />
      }
      {mode === EDIT &&
        <Form
          name={props.interview.student}
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          onSave={save}
          onCancel={()=> back(SHOW)}
        />
      }
      {mode === ERROR_SAVE &&  (
       <Error
       message="Could not save this appointment."
       onClose={() => back(SHOW)}
      />
      )}
       {mode === ERROR_DELETE &&  (
       <Error
       message="Could not cancel this appointment."
       onClose={() => back(SHOW)}
      />
      )}
    </article>
  );
}