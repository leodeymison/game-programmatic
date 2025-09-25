export default function Home() {
  return (
    <main className="w-full h-screen grid grid-cols-12 bg-gray-300">
      <section className="col-span-9 bg-gray-300"></section>
      <section className="col-span-3 bg-gray-800 rounded-l-2xl">
        <form className="flex flex-col p-4 h-screen">
          <textarea className="w-full h-full rounded-2xl mb-4 border border-gray-300 focus:outline-none" name="code" id=""></textarea>

          <button className="bg-green-600 py-4 w-full flex justify-center items-center rounded-2xl">Salvar</button>
        </form>
      </section>
    </main>
  );
}
