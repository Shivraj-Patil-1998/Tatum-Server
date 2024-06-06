const schedule = require('node-schedule');
const fetch = require('node-fetch');
const { endUrl } = require('../../utils/url');
const models = require("../../models/index");
const { Transactions } = models;

const job = schedule.scheduleJob('*/1 * * * *', async function() {
  try {
    const transactions = await Transactions.findAll({
      where: {
        transactionStatus: 'PENDING'
      }
    });

    const transactionIds = transactions.map(transaction => transaction.hash);

    const btcTransactionStatus = await BtcTransactionStatus([transactionIds]);

    
    for (const transaction of transactions) {
      const btcTransaction = btcTransactionStatus.find(item => item.hash === transaction.hash);
      if (btcTransaction && btcTransaction.blockNumber !== null) {
        await transaction.update({ transactionStatus: 'COMPLETED' });
      } else {
        await transaction.update({ transactionStatus: 'PENDING' });
      }
    }
  } catch (error) {
    console.error('Error retrieving or updating transactions:', error);
  }
});

const BtcTransactionStatus = async (transactionIds) => {
  const url = `${process.env.TATUM_GENERAL_API}${endUrl.btcTransaction}/${transactionIds}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'x-api-key': `${process.env.TATUM_API_KEY}`
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();
    console.log("shiJobs", json)
    return [json]; 
  } catch (error) {
    console.error('Error:', error);
    return []; 
  }
};


module.exports = { BtcTransactionStatus };
