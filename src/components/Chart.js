import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import gif301 from "./301.gif";
import { Grid } from "@mui/material";
import Chartts from 'chart.js/auto';

export default function Chart() {
  const [covidData, setCovidData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Chartts.register({
  //   type: 'arc',
  //   // ... other configurations for the 'arc' element
  // });


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
        const data = {
          labels: response.data.data.map(
            (individualData) => individualData.region.name
          ),
          datasets: [
            {
              label: "Total Deaths",
              data: response.data.data.map(
                (individualData) => individualData.deaths
              ),
            },
          ],
        };
        setCovidData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCovidData();
  }, []);

  return (
    <div>
      <center>
        {/* <Grid container xs={10} sm={10} md={10} > */}
        {isLoading ? (
          <div>
            <br />
            <br />
            <img src={gif301} alt="Loading..." />
          </div>
        ) : (
          // <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
          //   <div style={{ width: '80%' }}>
          //     {covidData ? (
          //       <Line data={covidData} />
          //     ) : (
          //       <div>Error: Failed to fetch data</div>
          //     )}
          //   </div>
          // </div>
          <>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              style={{ display: 'flex', justifyContent:"center" }}
            >
              <Grid xs={10} sm={10} md={10}>
                {covidData ? (
                  <Line data={covidData} />
                ) : (
                  <div>Error: Failed to fetch data</div>
                )}
              </Grid>
            </Grid>
          </>
        )}

        {/* </Grid> */}
      </center>
    </div>
  );
}
