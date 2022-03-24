import PaymentInfo from "../models/paymentInfo.js";

export const getPayment = async (req, res) => {
    try {
        const  {searchQuery}  = req.query
        const title = JSON.parse(searchQuery)
        const payment = await PaymentInfo.find(title)

        let result = payment.map(({ id, amount }) => ({ id, amount }));
        console.log(result);

        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({messgae: error});
    }
}

export const createPayment = async (req, res) => {
    const payment = req.body;

    const newPayment = new PaymentInfo(payment);
    try {
        await newPayment.save();

        res.status(201).json(newPayment);
    } catch (error) {
        res.status(409).json({message: error});
    }
}