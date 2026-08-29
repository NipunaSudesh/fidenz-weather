import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900">
            Weather Dashboard
          </h1>

          <p className="mt-4 text-lg text-gray-600">
            Check the current weather and comfort level
            for cities around the world.
          </p>

          <div className="mt-8">
            <a
              href="/weather"
              className="inline-block rounded-lg bg-black px-6 py-3 font-medium text-white hover:bg-gray-800"
            >
              View Weather
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}