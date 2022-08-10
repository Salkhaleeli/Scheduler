import React from "react";
import classNames from "classnames";
import "components/InterviewerList.scss"
import InterviewerListItem from "components/InterviewerListItem";

function InterviewerList(props) {
  const intr = props.interviewers.map(interviewer=>{
    return(
      <InterviewerListItem
        key={interviewer.id}
        name = {interviewer.name}
        avatar={interviewer.avatar}
        setInterviewer={() => props.setInterviewer(interviewer.id)}
        selected={interviewer.id === props.interviewer}
      />
    );
  })
  return(
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{intr}</ul>
    </section>
  );
}

export default InterviewerList;