"use client";
import React, { useContext, useState } from "react";

export interface questiType {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
}

interface myObject {
  amount: string | 10;
  category: string;
  difficulty: string;
}

interface AppContextValue {
  Home: boolean;
  setHome: React.Dispatch<React.SetStateAction<boolean>>;
  selection: myObject;
  setSelection: React.Dispatch<React.SetStateAction<myObject>>;
  questions: questiType[] | null;
  setQuestions: React.Dispatch<React.SetStateAction<questiType[] | null>>;
}

const userContext = React.createContext<AppContextValue>({} as AppContextValue);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [selection, setSelection] = useState<myObject>({
    amount: 10,
    category: "",
    difficulty: "",
  });
  const [questions, setQuestions] = useState<questiType[] | null>(null);
  const [Home, setHome] = useState(true);

  const contextValue: AppContextValue = {
    Home,
    setHome,
    selection,
    questions,
    setSelection,
    setQuestions,
  };

  return (
    <userContext.Provider value={contextValue}>{children}</userContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(userContext);
};
