const express = require('express');
const { pong } = require('../controller/ping');
const { createWallet } = require('../controller/create-wallet/walletController');
const { createMasterWallet } = require('../controller/create-wallet/createMasterWalletController');
const { creategaspumpAddress } = require('../controller/gas-pump/create-gaspump-address');
const { activategaspumpAddress } = require('../controller/gas-pump/activate-gas-address');
const { getwalletPrivatekey } = require('../controller/create-wallet/getWalletPrivateKey');
const { createNotification } = require('../controller/notification/create-subscription');
const { createBtcTransaction } = require('../controller/BTC/generate-btc-transaction');
const { webhookServer } = require('../controller/webhook/webhookScript');
const router = express.Router();

router.get('/ping', pong);
router.post('/generate-custodial-managed-wallet', createWallet)
router.get('/generate-master-wallet', createMasterWallet)
router.post('/create-gas-address', creategaspumpAddress)
router.post('/activate-gas-address', activategaspumpAddress)
router.get('/custodial/wallet-pKey', getwalletPrivatekey)
router.post('/create/notification', createNotification)
router.post('/create/btcTransaction', createBtcTransaction)
router.post('/webhook', webhookServer)



module.exports = router;
