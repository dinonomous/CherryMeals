// controllers/imageController.js
const s3 = require('../aws/s3Client')
const getSignedImageUrl = (restaurantId, foodId = null) => {
    // Define the default key (folder structure) based on the presence of foodId
    const key = foodId 
      ? `CherryMeals/${restaurantId}/${foodId}.png` 
      : `CherryMeals/${restaurantId}/hotelImages/1.png`; // Use default image for restaurant
  
    const params = {
      Bucket: 'dineshwar',
      Key: key, // Use the key built dynamically based on inputs
      Expires: 60 * 60, // URL expires in 1 hour
    };
  
    return s3.getSignedUrl('getObject', params);
  };
  

const generateSignedUrl = async (req, res) => {
  const { restaurantId, foodId } = req.params;

  try {
    const imageUrl = getSignedImageUrl(restaurantId, foodId);
    res.status(200).json({ imageUrl });
  } catch (error) {
    res.status(500).json({ message: 'Error generating signed URL', error: error.message });
  }
};

module.exports = {
  generateSignedUrl,
  getSignedImageUrl
};
