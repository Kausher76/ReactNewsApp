import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import axios from "axios";

function NavBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const categories = [
    { name: "Sports", path: "/sports" },
    { name: "Technology", path: "/technology" },
    { name: "Health", path: "/health" },
    { name: "Business", path: "/business" },
  ];

  const weatherUrl = `https://api.weatherstack.com/current?access_key=a627da5258c592be2584c4d9bcf2b25d&query=Mumbai`;

  useEffect(() => {
    async function fetchWeather() {
      try {
        const response = await axios.get(weatherUrl);
        const { location, current } = response.data;

        if (current && location) {
          setWeather({
            city: location.name,
            temperature: current.temperature,
            description: current.weather_descriptions[0],
            icon: current.weather_icons[0],
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
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Mobile View: Left Menu Icon */}
          {isMobile && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Center "News" Typography with Categories */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexGrow: isMobile ? 1 : 0,
              textAlign: isMobile ? "center" : "left",
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{
                textAlign: isMobile ? "center" : "left",
                position: "relative",
                marginRight: 2,
              }}
            >
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                News
              </Link>
            </Typography>
            {!isMobile && (
              <Box sx={{ display: "flex", gap: 2 }}>
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    to={category.path}
                    style={{
                      textDecoration: "none",
                      color: "white",
                      fontSize: "16px",
                      fontWeight: "500",
                    }}
                  >
                    {category.name}
                  </Link>
                ))}
              </Box>
            )}
          </Box>

          {/* Weather Section */}
          {!loading && !error && weather && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <img
                src={weather.icon}
                alt={weather.description}
                style={{ width: 30, height: 30, borderRadius: "50%" }}
              />
              <Typography
                variant="body2"
                sx={{ color: "white", fontSize: "14px" }}
              >
                {weather.city} - {weather.temperature}°C
              </Typography>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile Menu */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box
          sx={{
            width: 250,
          }}
          role="presentation"
          onClick={() => setDrawerOpen(false)}
          onKeyDown={() => setDrawerOpen(false)}
        >
          <List>
            {categories.map((category) => (
              <ListItem key={category.name} disablePadding>
                <ListItemButton>
                  <Link
                    to={category.path}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      width: "100%",
                    }}
                  >
                    <ListItemText primary={category.name} />
                  </Link>
                </ListItemButton>
              </ListItem>
            ))}
            {/* Weather in Drawer for Mobile View */}
            {isMobile && !loading && !error && weather && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  margin: 2,
                }}
              >
                <img
                  src={weather.icon}
                  alt={weather.description}
                  style={{ width: 30, height: 30, borderRadius: "50%" }}
                />
                <Typography
                  variant="body2"
                  sx={{ color: "black", fontSize: "14px" }}
                >
                  {weather.city} - {weather.temperature}°C
                </Typography>
              </Box>
            )}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}

export default NavBar;
