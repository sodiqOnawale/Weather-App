# WeatherNow ⛅

A modern, beautifully designed weather application built with React, TypeScript, and Material UI. Features real-time weather data from OpenWeatherMap API, stunning animations, and an aurora-themed dark mode design.

![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?style=flat-square&logo=typescript)
![Material UI](https://img.shields.io/badge/MUI-5.15-007FFF?style=flat-square&logo=mui)
![Jest](https://img.shields.io/badge/Jest-Testing-C21325?style=flat-square&logo=jest)

## ✨ Features

- **Real-time Weather Data** - Get current weather conditions for any city worldwide
- **Geolocation Support** - Automatically detect and display weather for your current location
- **Unit Toggle** - Switch between Celsius (°C) and Fahrenheit (°F)
- **Detailed Weather Highlights** - View wind speed, humidity, visibility, pressure, and more
- **Beautiful UI** - Aurora-themed dark mode with glassmorphism effects
- **Smooth Animations** - Subtle animations and transitions for a polished experience
- **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices
- **TypeScript** - Full type safety throughout the application
- **Comprehensive Tests** - Jest unit tests for all components

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- OpenWeatherMap API key (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/weather-now.git
   cd weather-now
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_OPEN_WEATHER_API_KEY=your_api_key_here
   ```
   
   Get your free API key from [OpenWeatherMap](https://openweathermap.org/api)

4. **Start the development server**
   ```bash
   npm start
   ```

   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 📁 Project Structure

```
src/
├── Components/
│   ├── WeatherApp/
│   │   ├── WeatherApp.tsx          # Main app component
│   │   └── WeatherApp.test.tsx     # Main app tests
│   ├── LeftSideWeatherApp/
│   │   ├── LeftSideWeatherApp.tsx  # Search & current weather panel
│   │   ├── SearchBar/
│   │   │   ├── SearchBar.tsx       # Search input & controls
│   │   │   └── SearchBar.test.tsx
│   │   └── CurrentDayWeatherForecast/
│   │       ├── CurrentDayWeatherForecast.tsx
│   │       └── CurrentDayWeatherForecast.test.tsx
│   └── RightSideWeatherApp/
│       ├── RightSideWeatherApp.tsx  # Weather highlights panel
│       ├── RightSideWeatherApp.test.tsx
│       └── WeatherForecastList/
│           ├── WeatherForecastList.tsx  # Weather detail cards
│           └── WeatherForecastList.test.tsx
├── types/
│   └── weather.ts                  # TypeScript interfaces
├── theme.ts                        # MUI custom theme
├── index.tsx                       # App entry point
└── index.css                       # Global styles
```

## 🧪 Testing

Run the test suite:

```bash
# Run tests in watch mode
npm test

# Run tests with coverage report
npm run test:coverage
```

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server |
| `npm build` | Build for production |
| `npm test` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage |
| `npm run type-check` | TypeScript type checking |
| `npm run lint` | ESLint code linting |

## 🎨 Design Features

### Aurora Theme
The app features a custom "Midnight Aurora" theme with:
- Deep navy backgrounds with subtle aurora gradient overlays
- Cyan-to-teal primary color palette
- Violet secondary accents
- Glassmorphism effects with backdrop blur
- Custom scrollbars and selection colors

### Animations
- Smooth page load animations with staggered reveals
- Floating weather icon animation
- Card hover effects with subtle scale transforms
- Loading skeletons for better perceived performance
- Fade transitions for error messages

### Responsive Design
- Two-column layout on desktop (≥768px)
- Single-column stacked layout on mobile
- Adaptive spacing and typography

## 🔧 Technologies Used

- **React 18** - UI library with hooks
- **TypeScript 5** - Static type checking
- **Material UI 5** - Component library & theming
- **Jest & React Testing Library** - Unit testing
- **OpenWeatherMap API** - Weather data provider

## 📄 API Reference

This app uses the [OpenWeatherMap API](https://openweathermap.org/api):

- **Current Weather Data** - `/data/2.5/weather`
- **Geocoding API** - `/geo/1.0/direct`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ by Onawale Sodiq

