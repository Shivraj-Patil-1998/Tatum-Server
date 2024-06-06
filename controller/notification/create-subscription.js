const fetch = require("node-fetch");
const { endUrl } = require("../../utils/url");
const models = require("../../models/index");
const { Subscriptions } = models;

const createNotification = async (req, res, next) => {
  const request = req.body;
  console.log("My request",request)
  const url = `${process.env.TATUM_GENERAL_API_NOTIFICATION}${endUrl.notificationSub}?testnetType=ethereum-sepolia`;
  console.log(url)
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "x-api-key": `${process.env.TATUM_API_KEY}`,
    },
    body: JSON.stringify({
        type: request.type,
        attr: {
          chain: request.chain,
          address: request.address,
          url: process.env.WEBHOOK,
      },
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

const createNotificationInternal = async (address, chain, type) => {
  const addressData = address;
  const chainData = chain;
  const url = `${process.env.TATUM_GENERAL_API_NOTIFICATION}${endUrl.notificationSub}?testnetType=ethereum-sepolia`;
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "x-api-key": `${process.env.TATUM_API_KEY}`,
    },
    body: JSON.stringify({
      type: type,
      attr: {
        chain: chainData,
        address: addressData,
        url: process.env.WEBHOOK,
      },
    }),
  };
  try {
    const response = await fetch(url, options);
    const json = await response.json();
    console.log("updatedDatas",json)
    const tableCreate = await Subscriptions.create({
      subscriptionId: json.id,
      subscriptionNetwork: chainData,
      type: type,
      address: addressData,
      expired: 'test'
    });
    return json;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const createNotifications = async (address, chain) => {
  const types = [
    "INCOMING_NATIVE_TX",
    "ADDRESS_EVENT",
    "FAILED_TXS_PER_BLOCK",
    "OUTGOING_FAILED_TX"
  ];

  try {
    const promises = types.map(type => createNotificationInternal(address, chain, type));
    await Promise.all(promises);
    
    console.log("All notifications created successfully.", promises);
  } catch (error) {
    console.error("Error creating notifications:", error);
  }
};


module.exports = { createNotification, createNotificationInternal, createNotifications };
