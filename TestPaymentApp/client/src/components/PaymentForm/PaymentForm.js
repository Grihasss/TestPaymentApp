import { React, useState, useEffect } from 'react';
import { Button, Grid, Typography, Paper, Container } from '@material-ui/core';
import useStyles from "./styles"
import Input from './Input';
import * as api from '../api/index';

import * as yup from 'yup';
import lodash from 'lodash';
import { format } from 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

const PaymentForm = ({setCurrWindow, setCurrPayment}) => {
    const classes = useStyles();
    const [showCvv, setShowCvv] = useState(false);
    const [formValues, setFormValues] = useState({ cardNumber: '', cvv: '', amount: '', expirationDate: '' });
    const [errors, setErrors] = useState({});
    const [ready, setReady] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const validationSchema = yup.object().shape({
        cardNumber: yup.string().required('Card Number is required')
            .matches(/^[0-9]+$/, "Must be only digits")
            .min(16, 'Card Number must be 16 characters long')
            .max(16, 'Card Number must be 16 characters long'),
        cvv: yup.string()
            .required('CVV is required')
            .matches(/^[0-9]+$/, "Must be only digits")
            .min(3, 'Must be exactly 3 digits')
            .max(3, 'Must be exactly 3 digits'),
        amount: yup.string()
            .required('Amount is required')
            .matches(/^[0-9]+$/, "Must be only digits"),
        expirationDate: yup.string()
            .required('Expiration Date is required')
            .min(7, 'Please enter valid expiration date'),
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        const finalValue = { ...formValues, expirationDate: format(selectedDate, 'MM/yyyy') };
        api.createPayment(finalValue)
            .then(async () => {
                const { data } = await api.searchPayment(finalValue);
                setCurrPayment(data);
                setCurrWindow(false);
            })
            .catch();
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        setErrors(lodash.pickBy(errors, (value, key) => key !== name));
    };
    
    useEffect(() => {
        let ero = {};
        const finalValue = { ...formValues, expirationDate: format(selectedDate, 'MM/yyyy') };

        validationSchema.validate(finalValue, { abortEarly: false })
            .then((valid) => {
                if (valid) {
                    setReady(true);
                }
            })
            .catch((erro) => {
                erro.inner.forEach((e) => {
                    lodash.merge(ero, { [e.path]: e.message })
                });
                setErrors(ero);
                setReady(false);
            })
    }, [formValues]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleShowCvv = (e) => {
        setShowCvv((prevShowCvv) => !prevShowCvv);
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Typography variant="h5">
                    Please Enter Your Payment Info
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Input name="cardNumber" label="Card Number" handleChange={handleChange} error={errors.cardNumber && errors.cardNumber !== ""} helperText={errors.cardNumber} autoFocus />
                        <Grid item xs={12} sm={6}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    name='expirationDate'
                                    inputVariant="outlined"
                                    views={['year', 'month']}
                                    format="MM/yyyy"
                                    label="Expiration Date"
                                    value={selectedDate}
                                    required
                                    onChange={handleDateChange}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Input name="cvv" label="CVV" type={showCvv ? "text" : "password"} handleShowCvv={handleShowCvv} handleChange={handleChange} error={errors.cvv && errors.cvv !== ""} helperText={errors.cvv} half />
                    </Grid>
                    <Grid container className={classes.amount}>
                        <Input name="amount" label="Amount" handleChange={handleChange} error={errors.amount && errors.amount !== ""} helperText={errors.amount} />
                    </Grid>
                    <Button type="submit" variant='contained' fullWidth color="primary" className={classes.submit} disabled={!ready} >
                        Submit
                    </Button>
                </form>
            </Paper>
        </Container>
    )
}

export default PaymentForm;