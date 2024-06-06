const fetch = require("node-fetch");
const { endUrl } = require("../../utils/url");

const activategaspumpAddress = async (req, res, next) => {
  const request = req.body;
  const url = `${process.env.TATUM_GENERAL_API}${endUrl.activategaspump}`;
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "x-api-key": `${process.env.TATUM_API_KEY}`,
    },
    body: JSON.stringify({ 
        chain: request.chain,
        feesCovered: request.feeCovered,
        fromPrivateKey: request.fromPrivateKey,
        from: request.from,
        to: request.to,
        owner: request.owner,
    }),
  };
  try {
    const response = await fetch(url, options);
    const json = await response.json();
    return res.json(json);
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

module.exports = { activategaspumpAddress };
