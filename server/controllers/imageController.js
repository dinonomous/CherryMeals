// controllers/imageController.js
const s3 = require('../aws/s3Client')
const getSignedImageUrl = (restaurantId, foodId) => {
  const params = {
    Bucket: 'dineshwar',
    Key: `CherryMeals/${restaurantId}/${foodId}.png`,
    Expires: 60 * 60,
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
