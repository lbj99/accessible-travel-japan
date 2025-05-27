const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// 기존 테스트 API
app.get('/api/test', (req, res) => {
  res.json({ message: 'Azure API 연결 성공!' });
});

// 새로운 추천 API
app.post('/api/recommendation', async (req, res) => {
  const { mobility, duration, budget, season } = req.body;
  const prompt = `거동 상태: ${mobility}, 여행 기간: ${duration}, 예산: ${budget}, 여행 시기: ${season}에 맞는 AI 여행코스 추천을 작성해줘.`;

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    res.json({ result: response.data.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
