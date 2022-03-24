import mongoose from "mongoose";

const paymentSchema = mongoose.Schema({
    cardNumber: { type: String, required: true},
    cvv: {type: String, required: true},
    amount: { type: String, required: true },
    expirationDate: { type: String, required: true},
});

const PaymentInfo = mongoose.model('PaymentInfo', paymentSchema);

export default PaymentInfo;