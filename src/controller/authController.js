const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const prisma = new PrismaClient();

const register = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({
      status: false,
      error,
      data: null,
    });
  } else {
    try {
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
      return res.status(201).json({
        status: true,
        error: null,
        data: user,
      });
    } catch (e) {
      return res.status(400).json({
        status: false,
        error: e,
        data: null,
      });
    }
  }
};

const login = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({
      status: false,
      error,
      data: null,
    });
  }

  try {
    const { email, password } = req.body;

    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(400).json({
        status: false,
        error: "user not found",
        data: null,
      });
    } else {
      const isValid = bcrypt.compareSync(password, user.password);
      if (!isValid) {
        return res.status(400).json({
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
        return res.status(200).json({
          status: true,
          error: null,
          data: user,
          token: token,
        });
      }
    }
  } catch (e) {
    return res.status(400).json({
      status: false,
      error: e,
      data: null,
    });
  }
};

const logout = async (req, res) => {
  req.userData = null;

  if (!req.userData) {
    return res.status(200).json({
      status: true,
      error: null,
      data: "You are logged out",
    });
  } else {
    return res.status(400).json({
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
