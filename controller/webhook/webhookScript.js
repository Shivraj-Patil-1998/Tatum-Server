const fetch = require('node-fetch');

const webhookServer = async (req, res, next) => {
    console.log('Received webhook data:', req.body);

    // Respond to the webhook request
    res.status(200).send('Webhook received successfully.');
};

module.exports = { webhookServer };
