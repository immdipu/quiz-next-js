"use client";
import React from "react";
import { Input, Select, Button } from "@chakra-ui/react";
import useSWR from "swr";
import Link from "next/link";
import { useUserContext } from "./userProvider";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const Inputform = () => {
  const { data } = useSWR("https://opentdb.com/api_category.php", fetcher);
  const { setSelection, setHome } = useUserContext();

  const HandleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelection((prev) => ({ ...prev, amount: event.target.value }));
  };

  const HandleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setSelection((prev) => ({ ...prev, [name]: value }));
  };

  const HandleSubmit = () => {
    setHome(false);
  };

  return (
    <div className="max-w-xl w-full bg-white rounded-lg border-black p-20 ">
      <h1 className="font-bold text-3xl text-blue-950">Setup Quiz</h1>
      <section className="mt-6 flex flex-col gap-5">
        <div>
          <label htmlFor="question-number" className="font-semibold text-lg">
            Number of Questions
          </label>
          <Input
            mt={2}
            defaultValue={10}
            max={50}
            min={2}
            name="num"
            onChange={HandleInputChange}
          />
        </div>
        <div>
          <label htmlFor="question-number" className="font-semibold text-lg">
            Select Category:
          </label>
          <Select
            onChange={HandleSelectChange}
            name="category"
            placeholder="Any Category"
          >
            {data?.trivia_categories &&
              data.trivia_categories.map(
                (item: { id: string; name: string }) => {
                  return (
                    <option value={item.id} key={item.id}>
                      {item.name}
                    </option>
                  );
                }
              )}
          </Select>
        </div>
        <div>
          <label htmlFor="question-number" className="font-semibold text-lg">
            Select Difficulty:
          </label>
          <Select
            name="difficulty"
            onChange={HandleSelectChange}
            placeholder="Any Difficulty"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </Select>
        </div>
      </section>
      <div className="w-full grid place-items-center mt-3">
        <Link href={"/question"}>
          <Button colorScheme="messenger" onClick={HandleSubmit}>
            Submit
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Inputform;
