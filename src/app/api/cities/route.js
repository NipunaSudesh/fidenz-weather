import cities from "@/data/cities.json";

export async function GET() {
  const cityCodes = cities.List
    .map((city) => city.CityCode)
    .slice(0, 10);

  return Response.json(cityCodes);
}