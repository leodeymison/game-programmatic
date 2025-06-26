"use client";

import Editor from '@monaco-editor/react'

export default function Home() {
  return (
    <main className="w-full h-screen grid grid-cols-12 bg-gray-300">
      <section className="col-span-9 bg-gray-300"></section>
      <section className="col-span-3 bg-gray-800">
        <form className="flex flex-col p-4 h-screen">
          <div className="w-full h-full flex">
            <Editor
              height="98%"
              defaultLanguage="javascript"
              defaultValue="// Escreva seu código aqui"
              theme='vs-dark'
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                wordWrap: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          </div>

          <button className="bg-green-600 py-4 w-full flex justify-center items-center rounded-2xl">Salvar</button>
        </form>
      </section>
    </main>
  );
}
