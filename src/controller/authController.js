const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const prisma = new PrismaClient();

const register = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    res.status(400).json({
      status: false,
      error,
      data: null,
    });
  } else {
    const { username, email, roleId, password } = req.body;

    const hashPassword = bcrypt.hashSync(password, 10);

    const user = await prisma.users.create({
      data: {
        username,
        email,
        password: hashPassword,
        roleId: parseInt(roleId),
      },
    });
    res.status(201).json({
      status: true,
      error: null,
      data: user,
    });
  }
};

const login = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    res.status(400).json({
      status: false,
      error,
    });
  }
  const { email, password } = req.body;

  const user = await prisma.users.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    res.status(400).json({
      status: false,
      error: "user not found",
      data: null,
    });
  } else {
    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) {
      res.status(400).json({
        status: false,
        error: "Password Invalid",
        data: null,
      });
    } else {
      const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
        roleId: user.roleId,
      };
      const secret = process.env.JWT_SECRET;
      const exp = 60 * 60 * 12;
      const token = jwt.sign(payload, secret, { expiresIn: exp });
      res.status(200).json({
        status: true,
        error: null,
        data: user,
        token: token,
      });
    }
  }
};

const logout = async (req, res) => {
  req.userData = null;

  if (!req.userData) {
    res.status(200).json({
      status: true,
      error: null,
      data: "You are logged out",
    });
  } else {
    res.statu(400).json({
      status: false,
      error: null,
      data: "Logout failed",
    });
  }
};

module.exports = {
  register,
  login,
  logout,
};
