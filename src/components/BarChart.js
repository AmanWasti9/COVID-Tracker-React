import React, { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Doughnut } from "react-chartjs-2";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Api({ searchValue }) {
  const [covidData, setCovidData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    async function fetchCovidData() {
      const options = {
        method: "GET",
        url: "https://covid-19-statistics.p.rapidapi.com/reports",
        headers: {
          "X-RapidAPI-Key":
            "45a4e7d8e6msh8baaf3821825b91p109847jsne05debaabdbd",
          "X-RapidAPI-Host": "covid-19-statistics.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        console.log(response.data);
        setCovidData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCovidData();
  }, []);

  useEffect(() => {
    filterData();
  }, [searchValue, covidData]);

  const filterData = () => {
    const filtered = covidData.filter((report) => {
      const countryName =
        report.region && report.region.name
          ? report.region.name.toLowerCase()
          : "";
      return countryName.includes(searchValue.toLowerCase());
    });
    setFilteredData(filtered);
  };

  return (
    <Box sx={{ maxWidth: 1000, margin: "0 auto", marginTop: 10 }}>
      <Grid container spacing={3} style={{
        display: 'flex',
        justifyContent:"center",
      }}>
        {filteredData.map((report, ind) => {
          const { active, confirmed, deaths, recovered, region } = report;

          return (
            <Grid item xs={10} sm={6} md={4} key={ind}>
              <Item elevation={3}>
                <h3 style={{ color: "blue", textTransform: "uppercase" }}>
                  {region?.province ? (
                    <>
                      <span
                        style={{ color: "black", textTransform: "capitalize" }}
                      >
                        {region?.province},{" "}
                      </span>
                    </>
                  ) : null}
                  {region?.name}
                </h3>
                <Doughnut
                  data={{
                    labels: ["Active", "Confirmed", "Deaths", "Recovered"],
                    datasets: [
                      {
                        data: [active, confirmed, deaths, recovered],
                        backgroundColor: [
                          "#FF6384",
                          "#36A2EB",
                          "red",
                          "#00CC99",
                        ],
                        hoverBackgroundColor: [
                          "#FF6384",
                          "#36A2EB",
                          "red",
                          "#00CC99",
                        ],
                      },
                    ],
                  }}
                />
                <p>Active Cases: {active}</p>
                <p>Confirmed Cases: {confirmed}</p>
                <p>Total Deaths: {deaths}</p>
                <p>Recovered: {recovered}</p>
                {/* Display other properties as needed */}
              </Item>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
