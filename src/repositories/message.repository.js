import prisma from '../config/prisma.js'; // ← обязательно .js в конце

export const createMessage = async (data) => {
  return prisma.message.create({
    data,
  });
};

export const findByUserId = async (userId) => {
  return prisma.message.findMany({
    where: { userId },
  });
};

export const getLastFiveMessages = async (userId) => {
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
