import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import '../App.css';

export default function CountryHeading() {
  return (
    <div>
        <Box sx={{ maxWidth: 1000, margin: '0 auto', marginTop: 10 }}>

            <Grid>
                <Paper elevation={3}>
                    <h3 className='h3_head'>Country Wise Covid 19 Data</h3>
                </Paper>
            </Grid>

        </Box>
    </div>
  );
}
