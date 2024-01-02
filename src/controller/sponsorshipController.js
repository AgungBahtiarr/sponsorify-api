const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { validationResult } = require("express-validator");
const fs = require("fs");

const getAllSponsorship = async (req, res) => {
  const sponsorship = await prisma.sponsorships.findMany();

  return res.status(200).json({
    status: true,
    error: null,
    data: sponsorship,
  });
};

const getDetailSponsorship = async (req, res) => {
  const id = req.params.id;

  try {
    const sponsorship = await prisma.sponsorships.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (sponsorship) {
      return res.status(200).json({
        status: true,
        error: null,
        data: sponsorship,
      });
    } else {
      return res.status(404).json({
        status: false,
        error: "Not Found",
        data: sponsorship,
      });
    }
  } catch (e) {
    return res.status(400).json({
      status: false,
      error: e,
      data: null,
    });
  }
};

const addSponsorship = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      status: false,
      error: Error("Image required").message,
      data: null,
    });
  }
  const image = req.file.path;
  const {
    companyName,
    companyDesc,
    province,
    city,
    district,
    completeAddress,
    categoryId,
    withDrawalTimeId,
    limitEventSubmission,
    applicationExpired,
    reportDeadline,
    usersId,
  } = req.body;
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({
      status: false,
      error: error,
      data: null,
    });
  }

  try {
    const sponsorship = await prisma.sponsorships.create({
      data: {
        companyName,
        companyDesc,
        profilePhoto: image,
        province,
        city,
        district,
        completeAddress,
        categoryId: parseInt(categoryId),
        withDrawalTimeId: parseInt(withDrawalTimeId),
        limitEventSubmission: parseInt(limitEventSubmission),
        applicationExpired: parseInt(applicationExpired),
        reportDeadline: parseInt(reportDeadline),
        usersId: parseInt(usersId),
      },
    });

    return res.status(201).json({
      status: true,
      error: null,
      data: sponsorship,
    });
  } catch (e) {
    return res.status(400).json({
      status: false,
      error: e,
      data: null,
    });
  }
};

const editSponsorship = async (req, res) => {
  var image;
  if (!req.file) {
    image = req.body.file;
  } else {
    image = req.file.path;
  }
  const id = req.params.id;
  const {
    companyName,
    companyDesc,
    province,
    city,
    district,
    completeAddress,
    categoryId,
    withDrawalTimeId,
    limitEventSubmission,
    applicationExpired,
    reportDeadline,
    usersId,
  } = req.body;
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({
      status: false,
      error: error,
      data: null,
    });
  }
  try {
    const sponsorship = await prisma.sponsorships.update({
      where: {
        id: parseInt(id),
      },
      data: {
        companyName,
        companyDesc,
        profilePhoto: image,
        province,
        city,
        district,
        completeAddress,
        categoryId: parseInt(categoryId),
        withDrawalTimeId: parseInt(withDrawalTimeId),
        limitEventSubmission: parseInt(limitEventSubmission),
        applicationExpired: parseInt(applicationExpired),
        reportDeadline: parseInt(reportDeadline),
        usersId: parseInt(usersId),
      },
    });

    return res.status(200).json({
      status: true,
      error: null,
      data: sponsorship,
    });
  } catch (e) {
    return res.status(400).json({
      status: false,
      error: e,
      data: null,
    });
  }
};

const deleteSponsorship = async (req, res) => {
  const id = req.params.id;

  const sponsorship = await prisma.sponsorships.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!sponsorship) {
    return res.status(404).json({
      status: false,
      error: "data not found",
      data: null,
    });
  } else {
    const path = sponsorship.profilePhoto;
    fs.unlink(path, (e) => {
      if (e) {
        return res.status(500).json({
          status: false,
          error: "Server error, failed to delete resources",
          data: null,
        });
      } else {
        console.info("Resource succesfuly deleted");
      }
    });
    const deletedSponsorship = await prisma.sponsorships.delete({
      where: { id: parseInt(id) },
    });

    return res.status(200).json({
      status: true,
      error: null,
      data: deletedSponsorship,
    });
  }
};
module.exports = {
  getAllSponsorship,
  getDetailSponsorship,
  addSponsorship,
  editSponsorship,
  deleteSponsorship,
};
