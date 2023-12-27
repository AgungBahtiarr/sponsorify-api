const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { validationResult } = require("express-validator");

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

const addEvent = async (req, res) => {
  const error = validationResult(req);
  const eventDate = new Date(req.body.eventDate);
  const authUserRole = req.userData.roleId;

  if (authUserRole != 1) {
    return res.status(401).json({
      status: false,
      error: "Unauthorized role",
      data: null,
    });
  }
  const {
    eventName,
    eventDesc,
    completeAddress,
    mapsLink,
    userId,
    city,
    district,
    province,
  } = req.body;

  if (!error.isEmpty()) {
    res.status(400).json({
      status: false,
      error: error,
      data: null,
    });
  } else {
    try {
      const event = await prisma.events.create({
        data: {
          eventName,
          eventDesc,
          eventDate,
          completeAddress,
          mapsLink,
          userId: parseInt(userId),
          city,
          district,
          province,
        },
      });
      res.status(201).json({
        status: true,
        error: null,
        data: event,
      });
    } catch (e) {
      res.status(400).json({
        status: false,
        error: e,
        data: null,
      });
    }
  }
};

const updateEvent = async (req, res) => {
  const error = validationResult(req);
  const idEvent = req.params.id;
  const authUserRole = req.userData.roleId;
  const eventDate = new Date(req.body.eventDate);

  const {
    eventName,
    eventDesc,
    completeAddress,
    mapsLink,
    userId,
    city,
    district,
    province,
  } = req.body;

  if (authUserRole != 1) {
    return res.status(401).json({
      status: false,
      error: "Unauthorized role",
      data: null,
    });
  }

  if (!error.isEmpty()) {
    return res.status(400).json({
      status: false,
      error: error,
      data: null,
    });
  } else {
    const event = await prisma.events.update({
      where: {
        id: parseInt(idEvent),
      },
      data: {
        eventName,
        eventDesc,
        eventDate,
        completeAddress,
        mapsLink,
        userId: parseInt(userId),
        city,
        district,
        province,
      },
    });
    return res.status(200).json({
      status: true,
      error: null,
      data: event,
    });
  }
};

const deleteEvent = async (req, res) => {
  const idEvent = req.params.id;

  try {
    const event = await prisma.events.delete({
      where: {
        id: parseInt(idEvent),
      },
    });

    return res.status(200).json({
      status: true,
      error: null,
      data: event,
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
  getAllEvent,
  getDetailEvent,
  addEvent,
  updateEvent,
  deleteEvent,
};
