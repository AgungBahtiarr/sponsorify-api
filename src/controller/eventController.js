const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllEvent = async (req, res) => {
  const events = await prisma.events.findMany();

  res.status(200).json({
    status: true,
    error: null,
    data: events,
  });
};

const getDetailEvent = async (req, res) => {
  const idEvent = req.params.id;

  const event = await prisma.events.findUnique({
    where: {
      id: parseInt(idEvent),
    },
  });

  if (!event) {
    res.status(400).json({
      status: false,
      error: "Data tidak ditemukan",
      data: null,
    });
  } else {
    res.status(200).json({
      status: true,
      error: null,
      data: event,
    });
  }
};

module.exports = {
  getAllEvent,
  getDetailEvent,
};
