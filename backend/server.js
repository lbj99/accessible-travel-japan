const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// 💡 정적 파일 서빙 추가
app.use(express.static(path.join(__dirname, 'public')));

// API 엔드포인트
app.get('/api/test', (req, res) => {
  res.json({ message: 'Azure API 연결 성공' });
});

app.get('/api/openai-test', async (req, res) => {
  try {
    res.json({ message: 'OpenAI 연결 성공!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 💡 React 앱으로 모든 요청 처리 (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});