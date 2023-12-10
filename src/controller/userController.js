const { PrismaClient } = require("@prisma/client");
const { toString } = require("express-validator/src/utils");
const prisma = new PrismaClient();

const getAllUser = async (req, res) => {
  const user = await prisma.users.findMany();
  res.status(200).json({
    success: false,
    data: user,
  });
};

const addUser = async (req, res) => {
  const { username, email, password, roleId } = req.body;

  if ((username, email, password, roleId)) {
    try {
      const user = await prisma.users.create({
        data: {
          username: toString(username),
          email: toString(email),
          password: toString(password),
          roleId: parseInt(roleId),
        },
      });
      res.status(201).json(user);
    } catch (e) {
      res.status(400).json({
        success: false,
        error: e,
      });
    }
  } else {
    res.status(400).json({
      success: false,
      error: "All fields are required to be filled in",
    });
  }
};

const getDetailUser = async (req, res) => {
  const idUser = req.params.id;
  const user = await prisma.users.findFirst({
    where: { id: parseInt(idUser) },
  });

  if (user) {
    res.send(user);
  } else {
    res.send("data tidak ditemukan");
  }
};

const updateUser = async (req, res) => {
  const { username, email, roleId } = req.body;
  const idUser = req.params.id;

  if ((username, email, roleId)) {
    try {
      const user = await prisma.users.update({
        where: {
          id: parseInt(idUser),
        },
        data: {
          username: username,
          email: email,
          roleId: parseInt(roleId),
        },
      });
      res.status(200).json(user);
    } catch (e) {
      res.status(400).json({
        success: false,
        error: e,
      });
    }
  } else {
    res.status(400).json({
      success: false,
      error: "All fields are required to be filled in",
    });
  }
};

const deleteUser = async (req, res) => {
  const idUser = req.params.id;

  try {
    const user = await prisma.users.delete({
      where: {
        id: parseInt(idUser),
      },
    });

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e,
    });
  }
};

module.exports = {
  getAllUser,
  addUser,
  getDetailUser,
  updateUser,
  deleteUser,
};
