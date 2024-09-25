const getCart = async (req,res) =>{ 
    try {
        res
      .status(200)
      .json({
        error: "Failed to retrieve collection names",
        errorMessage: error.message,
      });
    } catch (error) {
        res.status(401).json({
            error: error,
        })
    }
    
}

module.exports = {
    getCart
}