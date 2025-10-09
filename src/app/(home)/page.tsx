/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import Editor from "@monaco-editor/react";
import { useState } from "react";
import { GoDependabot } from "react-icons/go";
import style from "./style.module.css";
import Person from "@/components/person";

export default function football() {
  const [open, setOpen] = useState(false);
  const [selected, useSelected] = useState({
    label: "Bot padrão",
    value: "default",
  });

  const options = [
    {
      label: "Bot padrão",
      value: "default",
    },
    {
      label: "Bot tático",
      value: "12d32d232d2d232d2d",
    },
  ];

  const map = [32, 62];

  const elementFixed = [
    {
      x: 0,
      y: 0,
      element: <div className="bg-gray-950 w-full h-full"></div>,
    },
  ];

  const getElement = (x: number, y: number) => {
    const elem = elementFixed.filter(
      (item) => item.x === x && item.y === y && item
    );
    if (elem.length) {
      return elem[0].element;
    }

    return null;
  };

  return (
    <main className="w-full h-screen grid grid-cols-12 bg-gray-950">
      <section className="col-span-9 px-2 flex flex-col justify-center bg-gray-950">
        <div
          className={`relative bg-gray-300 w-full aspect-[2048/1080] border-4 border-gray-700 flex justify-center items-center`}
        >
          <div className="w-full h-full flex justify-center items-center flex-col">
            {Array(map[0])
              .fill("")
              .map((item, i1) => (
                <div key={i1} className="flex w-full h-full">
                  {Array(map[1])
                    .fill("")
                    .map((item, i2) => (
                      <div
                        key={i2}
                        className="border border-gray-200 h-full w-full"
                      >
                        {getElement(i1, i2) !== null && getElement(i1, i2)}
                      </div>
                    ))}
                </div>
              ))}
          </div>
        </div>
      </section>
      <section className="col-span-3 bg-gray-800">
        <form className="flex flex-col p-4 h-screen">
          <div className="relative w-full">
            <div
              onClick={() => setOpen((prev) => !prev)}
              className="flex items-center bg-gray-700 rounded-lg"
            >
              <span className="pl-3 pr-1">
                <GoDependabot />
              </span>
              <div className="w-full px-2 py-3 focus:outline-none rounded-lg cursor-pointer">
                {selected.label}
              </div>
            </div>

            {open && (
              <div
                className={`${style.scroll2} absolute z-10 top-full left-0 bg-gray-700 w-full p-2 h-60 overflow-y-auto mt-1 rounded-lg`}
              >
                <div className="mb-2 border-b border-gray-400 pb-2">
                  <input
                    type="text"
                    placeholder="Pesquisar"
                    className="w-full p-2 rounded-md focus:outline-none bg-gray-600"
                  />
                </div>

                {options.map((item, index) => (
                  <ul key={index}>
                    <li
                      className={`${
                        selected.value === item.value
                          ? "bg-gray-500 cursor-not-allowed"
                          : "hover:bg-gray-600 cursor-pointer"
                      } p-2 rounded-lg mb-1`}
                    >
                      {item.label}
                    </li>
                  </ul>
                ))}
              </div>
            )}
          </div>
          <div className="w-full h-full flex mt-4">
            <Editor
              height="98%"
              defaultLanguage="javascript"
              defaultValue="// Escreva seu código aqui"
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: "on",
                wordWrap: "on",
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          </div>

          <button className="bg-green-600 py-4 w-full flex justify-center items-center rounded-2xl">
            Salvar
          </button>
        </form>
      </section>
    </main>
  );
}
