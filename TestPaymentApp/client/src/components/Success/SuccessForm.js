import {React, useEffect, useState} from 'react'
import useStyles from "./styles"
import * as api from '../api/index';
import { Button, Grid, Typography, Paper, Container} from '@material-ui/core';

const SuccessForm = ({setCurrWindow, currPayment, currWindow}) => {
    const classes = useStyles();
  

    const handleClick = (e) => {
        setCurrWindow(true)
    }

  return (
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Grid className={classes.list}>
            <Typography variant="h5">
                ID:
            </Typography>
            <Typography variant="h5" className={classes.number}>
                {currPayment[0].id}
            </Typography>

            </Grid> 
            <Grid className={classes.list}>
            <Typography variant="h5">
                Amount:
            </Typography>
            <Typography variant="h5" className={classes.number}>
                {currPayment[0].amount}
            </Typography>

            </Grid>

            <Button variant='contained' fullWidth color="primary" className={classes.submit} onClick={handleClick} >
                Back To Form
            </Button>

        </Paper>
    </Container>
  )
}

export default SuccessForm