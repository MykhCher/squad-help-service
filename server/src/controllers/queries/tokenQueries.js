const jwt = require('jsonwebtoken');
const { Token } = require('../../models');
// =====
const { JWT_SECRET, REFRESH_SECRET } = require('../../constants');

module.exports.generateTokens = async (userData) => {
  const accessToken = jwt.sign(userData, JWT_SECRET, { expiresIn: '2s' });
  const refreshToken = jwt.sign(userData, REFRESH_SECRET, { expiresIn: '30d' });
 
  return {
    accessToken,
    refreshToken
  }
}

module.exports.validateToken = async (token, type) => {
  try {
    let key;
    switch (type) {
      case 'refresh':
        key = REFRESH_SECRET;
      case 'access':
        key = JWT_SECRET;
    }
    const userData = jwt.verify(token, REFRESH_SECRET);
    return userData;
  } catch (error) {
    console.log('Validation error:', error)
    return null;
  } 
}

module.exports.saveToken = async (userId, refreshToken) => {
  const tokenData = await Token.findOne({ where: { userId } });
  if (tokenData) {
    tokenData.refreshToken = refreshToken;
    return tokenData.save()
  }

  const token = await Token.create({ userId, refreshToken });
  return token;
}

