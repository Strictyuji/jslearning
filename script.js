const resultDiv = document.getElementById('result');

// 註冊事件
document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const username = form.username.value;
  const password = form.password.value;

  try {
    const res = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    resultDiv.textContent = '註冊結果: ' + JSON.stringify(data);
  } catch (err) {
    resultDiv.textContent = '錯誤: ' + err.message;
  }
});

// 登入事件
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const username = form.username.value;
  const password = form.password.value;

  try {
    const res = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    resultDiv.textContent = '登入結果: ' + JSON.stringify(data);
  } catch (err) {
    resultDiv.textContent = '錯誤: ' + err.message;
  }
});
