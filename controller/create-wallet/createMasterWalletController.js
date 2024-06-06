const fetch = require("node-fetch");
const { endUrl } = require("../../utils/url");

const createMasterWallet = async (req, res, next) => {
  const request = req.body;
  const url = `${process.env.TATUM_GENERAL_API}/${request.wallet}${endUrl.masterwallet}?mnemonic=${process.env.MNEMONIC}&testnetType=${request.testnet}`;
  const options = {
    method: "get",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "x-testnet-type": `${require.testnetType}`,
      "x-api-key": `${process.env.TATUM_API_KEY}`,
    },
  };
  try {
    const response = await fetch(url, options);
    const json = await response.json();
    return res.json(json);
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: "An unknown error occurred while processing your request.",
      error: error.message,
    });
    next();
  }
};

module.exports = { createMasterWallet };
