const prisma = require('../config/prisma');

exports.findByEmail = async (email) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

exports.createUser = async (data) => {
  return prisma.user.create({
    data,
  });
};

exports.findById = async (id) => {
  return prisma.user.findUnique({
    where: { id },
  });
};
