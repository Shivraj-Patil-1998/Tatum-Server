const fetch = require("node-fetch");
const { endUrl } = require("../../utils/url");

const getwalletPrivatekey = async (privateKey) => {
  const url = `${process.env.TATUM_GENERAL_API}${endUrl.getPrivateKey}/${privateKey}?export=${true}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "x-api-key": `${process.env.TATUM_API_KEY}`,
    }
  };
  try {
    const response = await fetch(url, options);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

module.exports = { getwalletPrivatekey };
