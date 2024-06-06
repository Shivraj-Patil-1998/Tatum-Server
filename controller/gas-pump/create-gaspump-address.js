const fetch = require("node-fetch");
const { endUrl } = require("../../utils/url");
const { createNotification, createNotificationInternal, createNotifications } = require("../notification/create-subscription");

const creategaspumpAddress = async (req, res, next) => {
  const request = req.body;
  console.log(request)
  const url = `${process.env.TATUM_GENERAL_API}${endUrl.creategaspump}`;
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "x-api-key": `${process.env.TATUM_API_KEY}`,
    },
    body: JSON.stringify({ 
        chain: request.chain,
        owner: process.env.MASTER_OWNER,
        from: request.from,
        to: request.to,
    }),
  };
  try {
    const response = await fetch(url, options);
    const json = await response.json();

      const address = json[0]
      await createNotifications(address, request.chain);
      console.log("adressssers", address)
      console.log("adressssersqq", request.chain)
    return res.json({body: json});
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

module.exports = { creategaspumpAddress };
