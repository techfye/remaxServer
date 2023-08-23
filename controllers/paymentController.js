const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(
    "sk_test_51LsnKsLJYQ2VsU7txdfZ76iN7aqLCrckOiv9SDW21ehAd43cq7uVgQZBibVtUoPF3yiAMxdIIzIpYU7TxQlh6KZw00HvVwP8Ns"
);

let globalClientSecret;

const cardPayment = asyncHandler(async (req, res) => {
    const { amount } = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            currency: "USD",
            amount: (amount * 100).toFixed(2).split(".")[0],
            payment_method_types: ["card"],
        });

        globalClientSecret = paymentIntent.client_secret; // Assign the client secret to the global variable

        if (!globalClientSecret)
            return res.status(400).json({ message: "Something went wrong" });
        res.send({
            clientSecret: globalClientSecret,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

const getClientSecret = () => {
    if (!globalClientSecret) return null; // If the global variable is not set, return null
    return globalClientSecret; // Return the client
};


module.exports = { cardPayment, getClientSecret  };

