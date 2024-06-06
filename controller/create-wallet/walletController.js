const fetch = require("node-fetch");
const { endUrl } = require("../../utils/url");
const { createNotifications } = require("../notification/create-subscription");
const models = require("../../models/index");
const { getwalletPrivatekey } = require("./getWalletPrivateKey");

const { TatumWallets } = models;

const createWallet = async (req, res, next) => {
  const url = `${process.env.TATUM_GENERAL_API}${endUrl.custowallet}`;
  const request = req.body;
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "x-api-key": `${process.env.TATUM_API_KEY}`,
    },
    body: JSON.stringify({ chain: request.chain }),
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorDetails = await response.json();
      console.error("Error details:", errorDetails);

      if (!response.ok) {
        return res.status(403).json({
          statusCode: 403,
          message:
            "You have reached the limit of wallet creation for your plan. Please upgrade your plan or contact support for more information.",
          details: errorDetails.message,
          dashboardLog: errorDetails.dashboardLog,
        });
      }

      return res.status(response.status).json({
        statusCode: response.status,
        message: response.statusText,
        details: errorDetails.message,
      });
    }

    const json = await response.json();
    await createNotifications(json.address, request.chain);
    const privateKey = await getwalletPrivatekey(json.walletId);
    const tableCreate = await TatumWallets.create({
      assetId: privateKey.chain,
      address: privateKey.address,
      privateKey: privateKey.privateKey,
      walletId: privateKey.walletId,
      available: "true",
    });

    return res.json({ body: json });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      statusCode: 500,
      message: "An unknown error occurred while processing your request.",
      error: error.message,
    });
    next();
  }
};

module.exports = { createWallet };
