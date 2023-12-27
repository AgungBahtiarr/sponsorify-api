const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { validationResult } = require("express-validator");

const getAllRole = async (req, res) => {
  const role = await prisma.roles.findMany();

  return res.status(200).json({
    status: true,
    error: null,
    data: role,
  });
};

const getDetailRole = async (req, res) => {
  const id = req.params.id;
  try {
    const role = await prisma.roles.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    return res.status(200).json({
      status: true,
      error: null,
      data: role,
    });
  } catch (e) {
    return res.status(400).json({
      status: false,
      error: e,
      data: null,
    });
  }
};

const addRole = async (req, res) => {
  const { roleName } = req.body;
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({
      status: false,
      error: error,
      data: null,
    });
  }

  try {
    const role = await prisma.roles.create({
      data: {
        roleName,
      },
    });
    return res.status(201).json({
      status: true,
      error: null,
      data: role,
    });
  } catch (e) {
    return res.status(400).json({
      status: false,
      error: e,
      data: null,
    });
  }
};

const editRole = async (req, res) => {
  const id = req.params.id;
  const { roleName } = req.body;
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({
      status: false,
      error: error,
      data: null,
    });
  } else {
    try {
      const role = await prisma.roles.update({
        where: {
          id: parseInt(id),
        },
        data: {
          roleName,
        },
      });

      return res.status(200).json({
        status: true,
        error: null,
        data: role,
      });
    } catch (e) {
      return res.status(400).json({
        status: false,
        error: error,
        data: null,
      });
    }
  }
};

const deleteRole = async (req, res) => {
  const id = req.params.id;

  try {
    const role = await prisma.roles.delete({
      where: {
        id: parseInt(id),
      },
    });
    return res.status(200).json({
      status: true,
      error: null,
      data: role,
    });
  } catch (e) {
    return res.status(200).json({
      status: false,
      error: e,
      data: null,
    });
  }
};

module.exports = {
  getAllRole,
  getDetailRole,
  addRole,
  editRole,
  deleteRole,
};
