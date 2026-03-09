const prisma = require('../config/prisma');

exports.createMessage = async (data) => {
  return prisma.message.create({
    data,
  });
};

exports.findByUserId = async (userId) => {
  return prisma.message.findMany({
    where: { userId },
  });
};

exports.getLastFiveMessages = async (userId) => {
  return prisma.message.findMany({
    where: { userId },
    orderBy: {
      createdAt: 'desc',
    },
    take: 5,
  });
};

// Альтернатива: если хочешь от старых к новым (как в чате обычно показывают)
//exports.getLastFiveMessagesOldestFirst = async (userId) => {
//return prisma.message.findMany({
//where: { userId },
//orderBy: {
///  createdAt: 'asc', // от старых к новым
//},
// take: 5,
// });
//};
