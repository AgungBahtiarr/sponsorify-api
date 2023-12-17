const { PrismaClient } = require("@prisma/client");
const { toString } = require("express-validator/src/utils");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

const getAllUser = async (req, res) => {
  const user = await prisma.users.findMany();
  res.status(200).json({
    status: false,
    error: null,
    data: user,
  });
};

const addUser = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    res.status(400).json({
      status: false,
      error,
      data: null,
    });
  } else {
    const { username, email, password, roleId } = req.body;

    const hashPassword = bcrypt.hashSync(password, 10);

    const user = await prisma.users.create({
      data: {
        username: toString(username),
        email: toString(email),
        password: hashPassword,
        roleId: parseInt(roleId),
      },
    });
    res.status(201).json(user);
  }
};

const getDetailUser = async (req, res) => {
  const idUser = req.params.id;
  const user = await prisma.users.findFirst({
    where: { id: parseInt(idUser) },
  });

  if (user) {
    res.status(200).json({
      status: true,
      erorr: null,
      data: user,
    });
  } else {
    res.status(400).json({
      status: false,
      erorr: "Data tidak ditemukan",
      data: null,
    });
  }
};

const updateUser = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    res.status(400).json({
      status: false,
      error,
      data: null,
    });
  } else {
    const { username, email, password, roleId } = req.body;
    const idUser = req.params.id;
    const hashPassword = bcrypt.hashSync(password, 10);

    try {
      const user = await prisma.users.update({
        where: {
          id: parseInt(idUser),
        },
        data: {
          username: username,
          email: email,
          password: hashPassword,
          roleId: parseInt(roleId),
        },
      });

      res.status(200).json({
        status: true,
        error: null,
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        status: false,
        error: error,
        data: null,
      });
    }
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
      status: true,
      erorr: null,
      data: user,
    });
  } catch (e) {
    res.status(400).json({
      status: false,
      error: e,
      data: null,
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
