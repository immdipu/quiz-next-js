"use client";
import React from "react";
import { questiType } from "./userProvider";

const Singlequestion = ({
  category,
  correct_answer,
  difficulty,
  incorrect_answers,
  question,
}: questiType) => {
  return (
    <div>
      <h1 dangerouslySetInnerHTML={{ __html: question }} />
      <section className="flex flex-col">
        {incorrect_answers.map((item, index) => {
          return <p dangerouslySetInnerHTML={{ __html: item }} key={index} />;
        })}
      </section>
    </div>
  );
};

export default Singlequestion;
