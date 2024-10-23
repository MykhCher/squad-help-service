const { conversation, usersConversations, Users, message, Sequelize: { Op } } = require("../../models");

const findConvoByUsers = async (participants) => {
  const [senderConvos, receiverConvos] = await Promise.all(participants.map(async id => {
    return await conversation.findAll({
      include: [{model: Users, through: { attributes: [] }, where: { id }}]
    });
  }));

  if (!senderConvos[0] || !receiverConvos[0]) return null;

  const [[convo]] = senderConvos.map(item => {
    return receiverConvos.filter(value => {
      return item.dataValues.id === value.dataValues.id;
    })
  })

  return convo;
}

module.exports.findConvoByUsers = findConvoByUsers;

module.exports.upsertConvos = async (participants) => {

  const convo = await findConvoByUsers(participants);

  if (convo) {
    return convo;
  }

  const newConvo = await conversation.create({});

  await Promise.all(
    participants.map(async userId => {
      await usersConversations.create({
        userId,
        conversationId: newConvo.id,
        blackList: false,
        favoriteList: false,
      });
    })
  );

  return newConvo;

}

module.exports.findMessages = async (participants) => {
  const convo = await findConvoByUsers(participants);
  if (!convo) {
    return [];
  }
  const messages = await message.findAll({
    where: {conversationId: convo.dataValues.id},
    order: [['createdAt', 'ASC']]
  });

  return messages;
} 

module.exports.getPreviews = async (userId) => {
  // const previews = await message.findAll({
  //   include: [
  //     {
  //       model: conversation,
  //       attributes: [], 
  //       include: [
  //         {
  //           model: Users,
  //           where: {
  //             id: userId, 
  //           },
  //           through: {
  //             model: usersConversations,
  //             attributes: ['blackList', 'favoriteList'], 
  //           },
  //           attributes: [], 
  //         },
  //       ],
  //     },
  //   ],
  //   order: [['createdAt', 'DESC']], 
  // });
  const conversations = await conversation.findAll({
    include: [{
      model: Users,
      where: {
        id: userId
      },
      through: { attributes: [] },
      attributes: [],
    }],
    attributes: ['id']
  });

  const convoIds = conversations.map(convo => convo.id);

  const previews = await message.findAll({
    attributes: ['conversationId', 'body', 'createdAt', 'sender'],
    where: {
      conversationId: { [Op.in]: convoIds },
    },
    include: [{
      model: conversation,
      attributes: ['id'],
      include: [{
        model: Users,
        through: { attributes: ['blackList', 'favoriteList'] },
        attributes: ['id']
      }]
    }],
    order: [['createdAt', 'DESC'], ['conversationId', 'DESC']],
    limit: convoIds.length
  });

  return previews;
}