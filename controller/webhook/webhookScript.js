const fetch = require('node-fetch');
const models = require("../../models/index");
const { Transactions } = models;

const webhookServer = async (req, res, next) => {
    try {
        const webhookData = req.body;

        if (!isValidWebhookData(webhookData)) {
            res.status(400).send('Invalid webhook data.');
            return;
        }

        const existingTransaction = await Transactions.findOne({
            where: { transactionId: webhookData.txId }
        });

        if (existingTransaction) {
            console.log('Transaction already exists in the database:', existingTransaction.toJSON());
            res.status(200).send('Webhook received but transaction already exists.');
            return;
        }

        const transactionStatus = webhookData.blockNumber ? 'completed' : 'failed';

        const transaction = await Transactions.create({
            transactionId: webhookData.txId,
            assetId: webhookData.currency,
            transactionType: webhookData.subscriptionType,
            hash: webhookData.txId,
            senderAddress: webhookData.counterAddress,
            receiverAddress: webhookData.address,
            amount: webhookData.amount,
            transactionStatus: transactionStatus
        });

        console.log('Transaction saved to database:', transaction.toJSON());

        res.status(200).send('Webhook received and transaction saved successfully.');
    } catch (error) {
        console.error('Error saving transaction:', error);
        res.status(500).send('Internal server error.');
        next(error);
    }
};

const isValidWebhookData = (data) => {
    return !!data && typeof data === 'object' && data.txId && data.currency && data.subscriptionType && data.counterAddress && data.address && typeof data.amount === 'number';
};

module.exports = { webhookServer };
