const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 React 빌드된 파일 경로로 수정
app.use(express.static(path.join(__dirname, '../frontend/build')));

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

// 🔥 React SPA 요청 처리 경로 수정
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// 포트 설정
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
