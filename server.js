const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/myapp');

const userSchema = new mongoose.Schema({
  username: String,
  passwordHash: String
});
const User = mongoose.model('User', userSchema);

// 註冊
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const saltRounds = 12;
  const hash = await bcrypt.hash(password, saltRounds);

  const newUser = new User({ username, passwordHash: hash });
  await newUser.save();

  res.json({ message: '註冊成功' });
});

// 登入
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: '使用者不存在' });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(400).json({ message: '密碼錯誤' });

  res.json({ message: '登入成功' });
});

app.listen(3000, () => console.log('伺服器啟動在 http://localhost:3000'));
