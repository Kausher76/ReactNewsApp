import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Grid, Card, CardMedia, CardContent, Typography, CardActions, Button, CircularProgress, Alert } from "@mui/material";

function News({ category }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = `https://newsdata.io/api/1/latest?apikey=pub_62221c4ad3a88df018881345d778efb8d5137&category=${category}&country=in`;

  async function getNewsData() {
    try {
      const response = await axios.get(url);
      setData(response.data.results);
      setError(null);
    } catch (error) {
      setError(error.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true); // Set loading to true when the category changes
    getNewsData();
  }, [category]); // Re-fetch data whenever `category` changes

  if (loading)
    return (
      <Container style={{ textAlign: "center", marginTop: "2rem" }}>
        <CircularProgress />
        <Typography variant="h6" style={{ marginTop: "1rem" }}>
          Loading...
        </Typography>
      </Container>
    );

  if (error)
    return (
      <Container style={{ textAlign: "center", marginTop: "2rem" }}>
        <Alert severity="error">Error: {error}</Alert>
      </Container>
    );

  return (
    <Container maxWidth="lg" style={{ marginTop: "2rem" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Latest News
      </Typography>
      <Grid container spacing={4}>
        {data &&
          data.map((article, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card elevation={3} style={{ height: "100%" }}>
                <CardMedia
                  component="img"
                  image={
                    article.image_url ||
                    "https://via.placeholder.com/300x200?text=No+Image"
                  }
                  alt={article.title}
                  style={{ height: 200, objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {article.title ? article.title.slice(0, 75) : "No Title"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {article.description
                      ? article.description.slice(0, 80) + "..."
                      : "No description available."}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}

export default News;
