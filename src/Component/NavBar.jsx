import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";

function NavBar() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const weatherUrl = `https://api.weatherstack.com/current?access_key=a627da5258c592be2584c4d9bcf2b25d&query=Mumbai`;

  useEffect(() => {
    async function fetchWeather() {
      try {
        const response = await axios.get(weatherUrl);
        const { location, current } = response.data;

        if (current && location) {
          setWeather({
            city: location.name, // City name (e.g., "Mumbai")
            temperature: current.temperature, // Temperature (e.g., "28")
            description: current.weather_descriptions[0], // Description (e.g., "Smoke")
            icon: current.weather_icons[0], // Weather icon URL
          });
        }
      } catch (err) {
        setError("Unable to fetch weather data.");
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>

          {/* Weather Section */}
          {!loading && !error && weather && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img
                src={weather.icon}
                alt={weather.description}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%", // Make the icon round
                  marginRight: 8,
                }}
              />
              <Typography variant="body1" sx={{ mr: 1 }}>
                {weather.city} - {weather.temperature}°C
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {weather.description}
              </Typography>
            </Box>
          )}

          {!loading && error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
