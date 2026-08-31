export function calculateComfortIndex({  temperature,
  humidity,
  windSpeed,
  cloudiness,}) {
//temperature
 const tempScore = Math.max(0,100 - Math.abs(temperature - 22)*5);
 const humidityScore  = Math.max(0,100 - Math.abs(humidity - 50)*2);
 const windspeedScore = Math.max(0,100 - Math.abs(windSpeed - 2)*20);
  const cloudinessScore = 100 - cloudiness;


    const score =
    tempScore * 0.40 +
    humidityScore  * 0.30 +
    windspeedScore * 0.20 +
    cloudinessScore * 0.10;


  return Math.round(Math.max(0, Math.min(100, score)));
}