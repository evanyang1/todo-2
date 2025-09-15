const userModel = require("../models/userModel");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const express = require("express");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {});

userRouter.post("/login", async (req, res) => {});


module.exports = userRouter;