## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/NipunaSudesh/Nexa-weather.git
cd <project-folder>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env

OPENWEATHER_API_KEY=your_openweather_api_key

AUTH0_DOMAIN=your_auth0_domain
AUTH0_CLIENT_ID=your_auth0_client_id
AUTH0_CLIENT_SECRET=your_auth0_client_secret
AUTH0_SECRET=your_auth0_secret

APP_BASE_URL=http://localhost:3000


Replace the placeholder values with the appropriate API and Auth0 credentials.

**Important:** Do not commit `.env.local` to GitHub. Environment variables containing API keys and secrets should remain private.

### 4. Start the Development Server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

### 5. Create a Production Build

```bash
npm run build
npm start
```

---

## Explanation of the Comfort Index Formula

The application uses a custom **Comfort Index ranging from 0 to 100**.

A score closer to **100** represents more comfortable weather conditions, while a score closer to **0** represents less comfortable conditions.

The calculation considers four weather parameters:

* Temperature
* Humidity
* Wind Speed
* Cloudiness

Each parameter is first converted into an individual score between 0 and 100.

### Temperature Score

```js
const tempScore = Math.max(
  0,
  100 - Math.abs(temperature - 22) * 5
);
```

The model considers **22°C** the ideal temperature.

The further the actual temperature moves away from 22°C, the lower the score becomes.

For example:

```text
22°C → 100
24°C → 90
28°C → 70
```

### Humidity Score

```js
const humidityScore = Math.max(
  0,
  100 - Math.abs(humidity - 50) * 2
);
```

The preferred humidity level is **50%**.

Humidity levels further away from 50% receive lower scores.

For example:

```text
50% → 100
60% → 80
30% → 60
```

### Wind Speed Score

```js
const windspeedScore = Math.max(
  0,
  100 - Math.abs(windSpeed - 2) * 20
);
```

The model considers **2 m/s** a comfortable wind speed.

Both very low and very high wind speeds reduce the score.

For example:

```text
2 m/s → 100
1 m/s → 80
3 m/s → 80
4 m/s → 60
```

### Cloudiness Score

```js
const cloudinessScore = 100 - cloudiness;
```

Cloudiness is represented as a percentage from 0–100.

Therefore:

```text
0% cloudiness → 100
20% cloudiness → 80
50% cloudiness → 50
100% cloudiness → 0
```

### Final Comfort Index

The individual scores are combined using weighted averages:

```js
const score =
  tempScore * 0.40 +
  humidityScore * 0.30 +
  windspeedScore * 0.20 +
  cloudinessScore * 0.10;
```

The final value is rounded and restricted to the 0–100 range:

```js
return Math.round(
  Math.max(0, Math.min(100, score))
);
```

---

## Reasoning Behind Variable Weights

The weights were selected based on the expected influence of each factor on general outdoor comfort.

### Temperature – 40%

Temperature has the highest weight because it is one of the most important factors determining whether weather feels comfortable.

### Humidity – 30%

Humidity receives the second-highest weight because it affects perceived temperature. High humidity can make warm weather feel hotter, while very low humidity can make conditions feel dry.

### Wind Speed – 20%

Wind has a moderate effect. A comfortable amount of wind can provide cooling, while strong winds can make outdoor conditions unpleasant.

### Cloudiness – 10%

Cloudiness has the lowest weight because its effect on comfort is less direct than temperature and humidity. It is included to provide additional environmental context without allowing it to dominate the overall score.

---

## Trade-offs Considered

### 1. Simplicity vs. Scientific Accuracy

A simple mathematical formula was chosen instead of a complex meteorological or physiological model.

**Advantages:**

* Easy to understand
* Easy to implement
* Fast to calculate
* Easy to maintain
* Suitable for real-time weather analysis

**Trade-off:**

The formula does not model every factor involved in human thermal comfort.

### 2. Fixed Ideal Values vs. Individual Preferences

The model uses fixed preferred values:

```text
Temperature → 22°C
Humidity → 50%
Wind Speed → 2 m/s
```

This makes the scores consistent when comparing different cities.

However, individual preferences differ. Someone may prefer 25°C instead of 22°C, for example.

### 3. Linear Scoring vs. Complex Relationships

Temperature, humidity, and wind speed use straightforward mathematical penalties.

This makes the behavior predictable, but real-world comfort does not always change linearly.

### 4. Including Cloudiness

Cloudiness was included because it is available from the weather data and provides useful environmental information.

However, cloudiness can have different effects depending on temperature. Cloud cover may reduce sunlight and improve comfort during very hot conditions.

Therefore, cloudiness was given only a **10% weight**.

---

## Cache Design Explanation

The application uses **server-side caching** to avoid repeatedly requesting the same weather information from the OpenWeather API.

The general process is:

```text
User Request
     ↓
Weather API Route
     ↓
Check Cache
     ↓
Is cached data available?
     ↓
 ┌─────────────┐
 │             │
YES           NO
 │             │
 ↓             ↓
Return      Request data
cached      from OpenWeather
data            ↓
                ↓
        Calculate Comfort Index
                ↓
           Store in Cache
                ↓
           Return Response
```

### Why Caching Is Used

Caching provides several benefits:

* Reduces unnecessary API requests
* Improves application response time
* Reduces dependency on the external API
* Helps avoid API rate limits
* Reduces repeated processing

Weather data is cached for a limited period because weather conditions can change.

After the cache expires, the application retrieves fresh data from OpenWeather and updates the cached value.

### Cache Key

Each city has its own cache entry.

For example:

```text
weather:1248991
weather:1850147
weather:2644210
```

This ensures that cached weather data for one city is not returned for another city.

---

## Known Limitations

The Comfort Index is a **custom metric designed for this application**. It is not an official meteorological or scientifically validated comfort standard.

### 1. Fixed Comfort Values

The model uses fixed ideal values of:

* 22°C temperature
* 50% humidity
* 2 m/s wind speed

These values may not be suitable for every person or climate.


### 2. External API Dependency

The application depends on the OpenWeather API for weather information. API availability, rate limits, or inaccurate source data can affect the application's results.

### Overall

Despite these limitations, the custom Comfort Index provides a **simple, transparent, consistent, and computationally efficient method for comparing weather comfort between cities**.
