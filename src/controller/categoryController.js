const { PrismaClient } = require("@prisma/client");
const { validationResult } = require("express-validator");
const prisma = new PrismaClient();

const getCategory = async (req, res) => {
  const categories = await prisma.categories.findMany();

  return res.status(200).json({
    status: true,
    error: null,
    data: categories,
  });
};

const getDetailCategory = async (req, res) => {
  const id = req.params.id;
  const category = await prisma.categories.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!category) {
    return res.status(404).json({
      status: false,
      error: "Data not found",
      data: null,
    });
  } else {
    return res.status(200).json({
      status: true,
      error: null,
      data: category,
    });
  }
};

const addCategory = async (req, res) => {
  const { categoryName } = req.body;

  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({
      status: true,
      error: error,
      data: null,
    });
  }

  try {
    const category = await prisma.categories.create({
      data: {
        categoryName,
      },
    });
    return res.status(201).json({
      status: true,
      error: null,
      data: category,
    });
  } catch (e) {
    return res.status(400).json({
      status: false,
      error: e,
      data: null,
    });
  }
};

const updateCategory = async (req, res) => {
  const id = req.params.id;
  const error = validationResult(req);
  const { categoryName } = req.body;

  if (!error.isEmpty()) {
    return res.status(400).json({
      status: false,
      error: error,
      data: null,
    });
  }

  try {
    const category = await prisma.categories.update({
      where: {
        id: parseInt(id),
      },
      data: {
        categoryName,
      },
    });
    return res.status(200).json({
      status: true,
      error: null,
      data: category,
    });
  } catch (e) {
    return res.status(400).json({
      status: false,
      error: e,
      data: null,
    });
  }
};

const deleteCategory = async (req, res) => {
  const id = req.params.id;

  try {
    const category = await prisma.categories.delete({
      where: {
        id: parseInt(id),
      },
    });

    return res.status(200).json({
      satus: true,
      error: null,
      data: category,
    });
  } catch (e) {
    return res.status(400).json({
      status: false,
      error: e,
      data: null,
    });
  }
};

module.exports = {
  getCategory,
  getDetailCategory,
  addCategory,
  updateCategory,
  deleteCategory,
};
