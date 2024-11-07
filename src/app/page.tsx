import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-dvh w-full flex flex-col items-center justify-center gap-2">
      <p>My Next App</p>

      <Link href={"/tasks"}>
        <button
          type="button"
          id="btn-tasks"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Go to Tasks
        </button>
      </Link>
    </main>
  );
}
