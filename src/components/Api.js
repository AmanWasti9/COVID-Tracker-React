import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Api({ searchValue }) {
  const [covidData, setCovidData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    async function fetchCovidData() {
      const options = {
        method: 'GET',
        url: 'https://covid-19-statistics.p.rapidapi.com/reports',
        headers: {
          'X-RapidAPI-Key': '45a4e7d8e6msh8baaf3821825b91p109847jsne05debaabdbd',
          'X-RapidAPI-Host': 'covid-19-statistics.p.rapidapi.com',
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
      const countryName = report.region.name.toLowerCase();
      return countryName.includes(searchValue.toLowerCase());
    });
    setFilteredData(filtered);
  };

  return (
    <Box sx={{ maxWidth: 1000, margin: '0 auto', marginTop: 10 }}>
      <Grid container spacing={3}>
        {filteredData.length > 0 ? (
          filteredData.map((report, ind) => (
            <Grid item xs={12} sm={4} key={ind}>
              <Item elevation={3}>
                <h3 style={{ color: 'blue', textTransform: 'uppercase' }}>{report.region.name}</h3>
                <p>Active Cases: {report.active}</p>
                <p>Confirmed Cases: {report.confirmed}</p>
                <p>Date: {report.date}</p>
                <p>Total Deaths: {report.deaths}</p>
                <p>Recovered: {report.recovered}</p>
                {/* Display other properties as needed */}
              </Item>
            </Grid>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </Grid>
    </Box>
  );
}
