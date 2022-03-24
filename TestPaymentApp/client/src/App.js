import { ReactChild, useState} from 'react'
import useStyles from "./styles"


import PaymentForm from './components/PaymentForm/PaymentForm';
import SuccessForm from './components/Success/SuccessForm';


const App = () => {
    const classes = useStyles();
    const [currWindow, setCurrWindow] = useState(true);
    const [currPayment, setCurrPayment] = useState({});
    
    return (
        <div>
            {currWindow ? (
                
                <PaymentForm  setCurrWindow={setCurrWindow} setCurrPayment={setCurrPayment}/>
            ) : (
                
                <SuccessForm  setCurrWindow={setCurrWindow} currPayment={currPayment} currWindow={currWindow}/>
            )}
        </div>
    )
}

export default App