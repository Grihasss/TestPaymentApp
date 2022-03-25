import { React, useState} from 'react';
import PaymentForm from './components/PaymentForm/PaymentForm';
import SuccessForm from './components/Success/SuccessForm';

const App = () => {

    const [currWindow, setCurrWindow] = useState(true);
    const [currPayment, setCurrPayment] = useState({});
    
    return (
        <div>
            {currWindow ? (  
                <PaymentForm  setCurrWindow={setCurrWindow} setCurrPayment={setCurrPayment} />
            ) : (
                <SuccessForm  setCurrWindow={setCurrWindow} currPayment={currPayment} />
            )}
        </div>
    )
}

export default App