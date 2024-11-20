const bd = require('../../models');
const NotFound = require('../../errors/UserNotFoundError');
const ServerError = require('../../errors/ServerError');
const bcrypt = require('bcrypt');
const tokenQueries = require('./tokenQueries');

const updateUser = async (data, userId, transaction) => {
  const [updatedCount, [updatedUser]] = await bd.Users.update(data,
    { where: { id: userId }, returning: true, transaction });
    if (updatedCount !== 1) {
      throw new ServerError('cannot update user');
    }
    return updatedUser.dataValues;
  };

module.exports.updateUser = updateUser;

const findUser = async (predicate, transaction) => {
  const result = await bd.Users.findOne({ where: predicate, transaction });
  if (!result) {
    throw new NotFound('user with this data didn`t exist');
  } else {
    return result.get({ plain: true });
  }
};

module.exports.findUser = findUser;

module.exports.userCreation = async (data) => {
  const newUser = await bd.Users.create(data);
  if (!newUser) {
    throw new ServerError('server error on user creation');
  } else {
    return newUser.get({ plain: true });
  }
};

const passwordCompare = async (pass1, pass2) => {
  const passwordCompare = await bcrypt.compare(pass1, pass2);
  if (!passwordCompare) {
    throw new NotFound('Wrong password');
  }
};
module.exports.passwordCompare = passwordCompare

module.exports.login = async (email, password) => {

  const foundUser = await findUser({ email });
  await passwordCompare(password, foundUser.password);

  const tokens = await tokenQueries.generateTokens({
    userId: foundUser.id,
    displayName: foundUser.displayName,
    email: foundUser.email,
  });

  await tokenQueries.saveToken(foundUser.id, tokens.refreshToken);
  await updateUser({ accessToken: tokens.accessToken }, foundUser.id);

  return {
    ...tokens,
    user: foundUser
  }
  
  // const foundUser = await userQueries.findUser({ email: req.body.email });
  // await userQueries.passwordCompare(req.body.password, foundUser.password);
  // const accessToken = jwt.sign({
  //   firstName: foundUser.firstName,
  //   userId: foundUser.id,
  //   role: foundUser.role,
  //   lastName: foundUser.lastName,
  //   avatar: foundUser.avatar,
  //   displayName: foundUser.displayName,
  //   balance: foundUser.balance,
  //   email: foundUser.email,
  //   rating: foundUser.rating,
  // }, CONSTANTS.JWT_SECRET, { expiresIn: CONSTANTS.ACCESS_TOKEN_TIME });
  // await userQueries.updateUser({ accessToken }, foundUser.id);
}

module.exports.refresh = async token => {
  if (!token) {
    throw new Error('No token received!');
  }
  const userData = await tokenQueries.validateToken(token, 'refresh');
  const tokenData = await bd.Token.findOne({ where: { refreshToken: token } });
  if (!userData || !tokenData) {
    throw new Error('No token received!');
  }

  const foundUser = await findUser({ id: userData.userId });
  const tokens = await tokenQueries.generateTokens({
    userId: foundUser.id,
    displayName: foundUser.displayName,
    email: foundUser.email,
  });

  await tokenQueries.saveToken(foundUser.id, tokens.refreshToken);
  await updateUser({ accessToken: tokens.accessToken }, foundUser.id);

  return {
    ...tokens,
    user: foundUser
  }
}