const pong = async (req, res, next) => {
    try {
      const response = { data: 'pong', isError: false };
      res.send(response);
    } catch (error) {
      next(error);
    }
  };
  
  module.exports = { pong };