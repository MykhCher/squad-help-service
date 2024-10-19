const { Op } = require('sequelize');
const moment = require('moment');
// =====
const db = require('../models');


class SQLController {
    countUsersByRoles(req, res, next) {
        db.Users.findAll({
            attributes: ['role', [db.Sequelize.fn('count', db.Sequelize.col('role')), 'count']],
            group: 'role',
        })
            .then(output => {
                const result = {};
                output.forEach(item => {
                    result[item.role] = item.dataValues.count;
                });
                res.status(200).json(result)
            })
            .catch(err => console.log(err));
    }

    payCashback(req, res, next) {
        const currentYear = moment().year();

        const dec25To31 = {
            [Op.between]: [
                moment(`${currentYear-1}-12-25`).startOf('day').toDate(),
                moment(`${currentYear-1}-12-31`).endOf('day').toDate()
            ]
        };
        
        const jan1To14 = {
            [Op.between]: [
                moment(`${currentYear}-01-01`).startOf('day').toDate(),
                moment(`${currentYear}-01-14`).endOf('day').toDate()
            ]
        };

        db.Contests.findAll({
            where: {
               createdAt: {
                    [Op.or]: [dec25To31, jan1To14]
               } 
            },
            attributes: ['userId', [db.Sequelize.fn('sum', db.Sequelize.col('prize')), 'prize']],
            group: 'userId'
        })
            .then(output => {
                const result = {}
                output.forEach(({ dataValues: { userId, prize }}) => {
                    const cashback = Math.round(prize/10);
                    db.Users.increment({ balance: cashback }, { where: {id: userId}, returning: true });
                    result[userId] = cashback;
                })
                res.status(200).json(result)
            })
            .catch(err => console.log(err));
    }

    payAward(req, res, next) {
        db.Users.findAll({
            where: { role: 'creator' },
            attributes: ['id', 'rating'],
            order: [['rating', 'DESC']],
            limit: 3
        })
            .then(result => {
                const idArr = result.map(item => item.dataValues.id);
                db.Users.increment(
                    { balance: 10 }, 
                    {
                        where: {
                            id: {
                                [Op.in]: idArr
                            }
                        }
                    });
                res.json({awardedUsers: idArr});
            })
            .catch(err => console.log(err));
    }
}

module.exports = new SQLController();