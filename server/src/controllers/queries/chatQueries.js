const { conversation, usersConversations, Users, message } = require("../../models");

module.exports.upsertConvos = async (participants) => {

  const convo = await conversation.findOne({
    include: {
      model: Users,
      through: { attributes: ['blackList', 'favoriteList'] },
      where: {
        id: participants
      }
    }
  });

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
  const messages = await message.findAll({
    include: {
      model: conversation,
      include: {
        model: Users,
        through: { attributes: [] },
        where: {
          id: participants
        }
      }
    },
    order: [['createdAt', 'ASC']]
  });

  return messages;
} 