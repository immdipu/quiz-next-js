"use client";
import useSWR from "swr";
import React from "react";
import { useUserContext } from "./userProvider";
import Singlequestion from "./singlequestion";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Questions = () => {
  const { selection, setQuestions, questions } = useUserContext();
  let Link = `https://opentdb.com/api.php?amount=${selection.amount}&type=multiple`;
  if (!selection.category.trim() && selection.difficulty.trim()) {
    Link = `https://opentdb.com/api.php?amount=${
      selection.amount
    }&difficulty=${selection.difficulty.trim()} &type=multiple`;
  } else if (selection.category && !selection.difficulty) {
    Link = `https://opentdb.com/api.php?amount=${
      selection.amount
    }&category=${selection.category.trim()}&type=multiple`;
  } else if (selection.category && selection.difficulty) {
    Link = `https://opentdb.com/api.php?amount=${
      selection.amount
    }&difficulty=${selection.category.trim()}&difficulty=${selection.difficulty.trim()} &type=multiple`;
  }

  const { data } = useSWR(Link, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateOnMount: true,
  });

  if (!data) return <h1>Loading...</h1>;
  setQuestions(data.results);

  return <div>{questions && <Singlequestion {...questions[0]} />}</div>;
};

export default Questions;
