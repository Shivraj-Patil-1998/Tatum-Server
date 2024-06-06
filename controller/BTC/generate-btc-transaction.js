const fetch = require('node-fetch');
const { endUrl } = require('../../utils/url');
const models = require("../../models/index");
const { Transactions } = models;

const createBtcTransaction = async (req, res, next) => {
  const request = req.body;
  const url = `${process.env.TATUM_GENERAL_API}${endUrl.btcTransaction}`;
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'x-api-key': `${process.env.TATUM_API_KEY}`
    },
    body: JSON.stringify({
      fromAddress: [
        {
          address: request.fromAddress,
          privateKey: request.privateKey
        }
      ],
      to: [{address: request.toAddress, value: request.value}]
    }),
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();
    if(json){
      const transactionDetailSave = await Transactions.create({
        transactionId: json.txId,
        transactionType: 'OUTGOING',
        assetId: 'BTC',
        senderAddress: request.fromAddress,
        recieverAddress: request.toAddress,
        amount: request.value,
        fee: 'none',
        hash: json.txId,
        transactionStatus: 'PENDING'
      })
      console.log("transactionDetailSave", transactionDetailSave)
    }
    return res.json(json);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      statusCode: 500,
      message: 'An unknown error occurred while processing your request.',
      error: error.message
    });
    next();
  }
};

module.exports = { createBtcTransaction };
