const s3 = require('../aws/s3Client');

// Generate a signed URL for a food image based on the `foodId`
const getSignedImageUrl = (foodId) => {
  // Define the default key based on the foodId
  console.log(foodId);
  const key = `CherryMeals/food/${foodId}.png`;

  const params = {
    Bucket: 'dineshwar', // Your S3 bucket name
    Key: key,           // Path to the image in the S3 bucket
    Expires: 60 * 60,   // URL expires in 1 hour
  };

  // Generate the signed URL
  return s3.getSignedUrl('getObject', params);
};

// Controller to generate signed URL for a specific food/restaurant image
const generateSignedUrl = (req, res) => {
  const { restaurantId, foodId } = req.params;

  try {
    // Get the signed URL for the food image
    const imageUrl = getSignedImageUrl(foodId);
    
    // Send the URL back in the response
    res.status(200).json({ imageUrl });
  } catch (error) {
    // Error handling if something goes wrong
    res.status(500).json({ message: 'Error generating signed URL', error: error.message });
  }
};

module.exports = {
  generateSignedUrl,
  getSignedImageUrl
};

