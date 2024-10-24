const Conversation = require('../models/mongoModels/conversation');
const { message, conversation } = require('../models');
const Message = require('../models/mongoModels/Message');
const Catalog = require('../models/mongoModels/Catalog');
const db = require('../models');
const userQueries = require('./queries/userQueries');
const chatQueries = require('./queries/chatQueries');
const controller = require('../socketInit');


module.exports.addMessage = async (req, res, next) => {

  const { tokenData: { userId: sender }, body: { recipient, messageBody }} = req;
  const participants = [sender, recipient];

  try {
    const convo = await chatQueries.upsertConvos(participants);
  
    const blackList = [];
    const favoriteList = [];
    convo.Users.forEach(async user => {
      const rel = await db.usersConversations.findOne({
        where: {
          userId: user.dataValues.id, 
          conversationId: convo.dataValues.id
        }});

      blackList.push(rel.blackList);
      favoriteList.push(rel.favoriteList);
    });
  
    const msg = new message({
      sender,
      body: messageBody,
      conversationId: convo.id,
    });
  
    await msg.save();
  
    msg.dataValues.participants = participants; 
  
    const preview = {
      _id: convo.id,
      sender: req.tokenData.userId,
      text: messageBody,
      createdAt: msg.dataValues.createdAt,
      participants,
      blackList,
      favoriteList,
    };
  
    controller.getChatController().emitNewMessage(recipient, {
      message: msg,
      preview: {
        _id: convo.id,
        sender: req.tokenData.userId,
        text: messageBody,
        createAt: msg.dataValues.createdAt,
        participants,
        blackList,
        favoriteList,
        interlocutor: {
          id: req.tokenData.userId,
          firstName: req.tokenData.firstName,
          lastName: req.tokenData.lastName,
          displayName: req.tokenData.displayName,
          avatar: req.tokenData.avatar,
          email: req.tokenData.email,
        },
      },
    });
  
    res.send({
      message: msg,
      preview: Object.assign(preview, { interlocutor: req.body.interlocutor }),
    });
  } catch (err) {
    console.log(err);
  }

}

module.exports.getChat = async (req, res, next) => {

  const { tokenData: {userId: sender}, body: { interlocutorId: recipient } } = req;
  const participants = [sender, recipient];

  try {

    const msgs = await chatQueries.findMessages(participants);
    const interlocutor = await userQueries.findUser({ id: recipient });

    res.send({
      messages: msgs,
      interlocutor: {
        firstName: interlocutor.firstName,
        lastName: interlocutor.lastName,
        displayName: interlocutor.displayName,
        id: interlocutor.id,
        avatar: interlocutor.avatar,
      },
    });

  } catch (error) {
    console.log(error);
  }

}


module.exports.getPreview = async (req, res, next) => {
  try {

    // Get list of first messages from every conversation
    const conversations = await chatQueries.getPreviews(req.tokenData.userId);
    // console.log(conversations)

    // Set list of senders
    const interlocutors = [];
    conversations.forEach(item => {
      const participants = [];
      const blackList = [];
      const favoriteList = [];

      item.conversation.Users.forEach(user => {
          participants.push(user.id); 
          blackList.push(user.usersConversations.blackList);
          favoriteList.push(user.usersConversations.favoriteList);
      });

      item.dataValues.participants = participants;
      item.dataValues.blackList = blackList;
      item.dataValues.favoriteList = favoriteList;
      item.dataValues.text = item.dataValues.body;
       
      interlocutors.push(
        participants.find(participant => participant !== req.tokenData.userId)
      );
    });

    const senders = await db.Users.findAll({
      where: {
        id: interlocutors,
      },
      attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar'],
    });

    // Set sender info into response
    conversations.forEach(item => {
      const participants = item.conversation.Users.map(user => user.id);
      item.dataValues.participants = participants;
      senders.forEach(sender => {
        if (participants.includes(sender.dataValues.id)) {
          item.dataValues.interlocutor = {
            id: sender.dataValues.id,
            firstName: sender.dataValues.firstName,
            lastName: sender.dataValues.lastName,
            displayName: sender.dataValues.displayName,
            avatar: sender.dataValues.avatar,
          };
        }
      });
    });

    res.send(conversations);

  } catch (error) {
    console.log(error)
  }
  
}

module.exports.blackList = async (req, res) => {
  const convo = await chatQueries.findConvoByUsers(req.body.participants)
  await db.usersConversations.update(
    {blackList: req.body.blackListFlag}, 
    {
      where: {
        conversationId: convo.dataValues.id,
        userId: req.tokenData.userId
      }
    }
  );

  const interlocutorId = req.body.participants.filter(
    (participant) => participant !== req.tokenData.userId)[ 0 ];

  convo.dataValues.blackList = [req.body.blackListFlag];
  convo.dataValues.participants = req.body.participants;
  convo.Users.forEach(user => {
    convo.dataValues.blackList.push(user.usersConversations.blackList)
  })

  controller.getChatController().emitChangeBlockStatus(interlocutorId, convo);

  res.send(convo);
}


module.exports.favoriteChat = async (req, res, next) => {
  const convo = await chatQueries.findConvoByUsers(req.body.participants)
  await db.usersConversations.update(
    {favoriteList: req.body.favoriteFlag}, 
    {
      where: {
        conversationId: convo.dataValues.id,
        userId: req.tokenData.userId
      }
    }
  );

  convo.dataValues.favoriteList = [req.body.favoriteFlag];
  convo.dataValues.participants = req.body.participants;
  convo.Users.forEach(user => {
    convo.dataValues.favoriteList.push(user.usersConversations.favoriteList)
  });

  res.send(convo);
};

module.exports.createCatalog = async (req, res, next) => {
  const { body: { catalogName, chatId }, tokenData: { userId } } = req;

  try {
    const newCatalog = await db.catalog.create({
      catalogName,
      userId
    });

    const chat = await db.conversation.findOne({ where: { id: chatId } });
    newCatalog.addConversation(chat);
    newCatalog.save();
    
    newCatalog.dataValues.conversations = [chat];
  
    res.json(newCatalog);
  } catch (error) {
    console.log(error)
  }
};

module.exports.updateNameCatalog = async (req, res, next) => {
  const { body: { catalogId, catalogName }, tokenData: { userId } } = req;
  try {
    const catalog = await db.catalog.findOne({
      where: {
        id: catalogId,
        userId
      },
      include: [
        {
          model: db.conversation,
          attributes: ['id'],
          through: { attributes: [] }
        }
      ]
    });
    catalog.catalogName = catalogName;
    await catalog.save();

    res.send(catalog);
  } catch (error) {
    
  }
};

module.exports.addNewChatToCatalog = async (req, res, next) => {
  try {
    // const folder = await db.catalog.findAll({where: {userId: req.tokenData.userId}, include: [{model: db.conversation, through: {attributes: []}}]});
    const folder = await db.catalog.findOne({
      where: { 
        id: req.body.catalogId,
        userId: req.tokenData.userId
       },
       include: [
        {
          model: db.conversation,
          attributes: ['id'],
          through: { attributes: [] }
        }
       ]
    });
    const chat = await db.conversation.findOne({where: { id: req.body.chatId }, attributes: ['id']});

    folder.addConversation(chat);
    await folder.save();

    folder.conversations.push(chat);
    res.status(200).json(folder);
  } catch (err) {
    next(err);
  }
};

module.exports.removeChatFromCatalog = async (req, res, next) => {
  try {
    // const folder = await db.catalog.findAll({where: {userId: req.tokenData.userId}, include: [{model: db.conversation, through: {attributes: []}}]});
    const folder = await db.catalog.findOne({
      where: { 
        id: req.body.catalogId,
        userId: req.tokenData.userId
       },
       include: [
        {
          model: db.conversation,
          attributes: ['id'],
          through: { attributes: [] }
        }
       ]
    });
    const chat = await db.conversation.findOne({where: { id: req.body.chatId }, attributes: ['id']});

    folder.removeConversation(chat);
    await folder.save();

    folder.conversations = folder.conversations.filter(c => c.id !== chat.id);
    console.log(folder.conversations)
    res.status(200).json(folder);
  } catch (err) {
    next(err);
  }
};

module.exports.test = async (req, res, next) => {
  try {
    const catalog = await Catalog.findOneAndUpdate({
      _id: req.body.catalogId,
      userId: req.tokenData.userId,
    }, { $pull: { chats: req.body.chatId } }, { new: true });
    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteCatalog = async (req, res, next) => {
  const { body: { catalogId }, tokenData: {userId} } = req;
  try {
    await db.catalog.destroy({
      where: {
        id: catalogId,
        userId
      }
    });
    res.end();
  } catch (err) {
    console.log(err);
  }
};

module.exports.getCatalogs = async (req, res) => {
  try {
    const catalogs = await db.catalog.findAll({
      where: {userId: req.tokenData.userId},
      include: [
        {
          model: db.conversation,
          attributes: ['id']
        }
      ]
    });
    
    res.send(catalogs);
  } catch (error) {
    console.log(error)
    next(error)
  }
}
