import React, { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { Pie, Line } from 'react-chartjs-2';
import axios from "axios";
import virus from "./virus.png";

// Register the elements with Chart.js
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

export default function WorldWide() {
  const [covidData, setCovidData] = useState([]);

  useEffect(() => {
    async function fetchCovidData() {
      const options = {
        method: "GET",
        url: "https://covid-19-statistics.p.rapidapi.com/reports",
        headers: {
          "X-RapidAPI-Key": "45a4e7d8e6msh8baaf3821825b91p109847jsne05debaabdbd",
          "X-RapidAPI-Host": "covid-19-statistics.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        setCovidData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCovidData();
  }, []);

  // Calculate total deaths, active cases, and confirmed cases
  const totalDeaths = covidData.reduce((total, country) => total + country.deaths, 0);
  const totalActiveCases = covidData.reduce((total, country) => total + country.active, 0);
  const totalConfirmedCases = covidData.reduce((total, country) => total + country.confirmed, 0);
  const totalRecoveredCases = covidData.reduce((total, country) => total + (country.active - country.deaths), 0);
  const totalFatalityRate = ((totalDeaths / totalConfirmedCases) * 100).toFixed(7);

  return (
    <div className="main-world-wide-data">
      <div className="main-head">
        <div
          className="heading-world-wide"
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            padding: "50px",
          }}
        >
          <div className="heading-ww-logo" style={{ width: "30%" }}>
            <img
              src={virus}
              alt=""
              style={{
                width: "50%",
                display: "flex",
                justifyContent: "start",
              }}
            />
          </div>
          <div className="heading-ww-logo" style={{ width: "50" }}>
            <img src={virus} alt="" style={{ width: "100%" }} />
          </div>
          <div className="heading-ww-logo" style={{ width: "40%" }}>
            <img
              src={virus}
              alt=""
              style={{
                width: "50%",
                display: "flex",
                justifyContent: "start",
              }}
            />
          </div>
          <div className="heading-ww-h2" style={{ marginTop: "30px" }}>
            <h2>COVID-19</h2>
            <h2>World Wide Statistics</h2>
          </div>
        </div>
      </div>

      <div
        className="world-data"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid container>
          <Grid xs={12} sm={12} md={12}>
            <div
              className="Total-deaths"
              style={{
                background:
                  "linear-gradient(to bottom right, #ca0989c4 , #fd84cd)",
              }}
            >
              <h2>COVID-19</h2>
              <h2>World Wide Statistics</h2>
            </div>
          </Grid>
          <Grid xs={6} sm={6} md={4}>
            <div
              className="Total-deaths"
              style={{
                background:
                  "linear-gradient(to bottom right, #002293, #4a3dfec4)",
              }}
            >
              <p>{totalActiveCases}</p>
              <h3>Active Cases</h3>
            </div>
          </Grid>
          <Grid xs={6} sm={6} md={4}>
            <div
              className="Total-deaths"
              style={{
                background:
                  "linear-gradient(to bottom right, #5b5b5b, #877e7ec4)",
              }}
            >
              <p>{totalConfirmedCases}</p>
              <h3>Confirm Cases</h3>
            </div>
          </Grid>
          <Grid xs={6} sm={6} md={4}>
            <div
              className="Total-deaths"
              style={{
                background:
                  "linear-gradient(to bottom right, #930000, #fe3d3dc4)",
              }}
            >
              <p>{totalDeaths}</p>
              <h3>Deaths</h3>
            </div>
          </Grid>
          <Grid xs={6} sm={6} md={4}>
            <div
              className="Total-deaths"
              style={{
                background:
                  "linear-gradient(to bottom right, #009320, #3dfe6dc4)",
              }}
            >
              <p>{totalRecoveredCases}</p>
              <h3>Recoveries</h3>
            </div>
          </Grid>
          <Grid xs={6} sm={6} md={4}>
            <div
              className="Total-deaths"
              style={{
                background:
                  "linear-gradient(to bottom right, #780093, #d13dfec4)",
              }}
            >
              <p>{totalFatalityRate}</p>
              <h3>Fatality Rate</h3>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
