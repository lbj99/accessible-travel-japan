import React, { useState } from 'react';
import './App.css';

function App() {
  const [form, setForm] = useState({
    mobility: '',
    startDate: '',
    endDate: '',
    budget: '',
    helper: ''
  });
  const [result, setResult] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'budget') {
      const numeric = value.replace(/[^0-9]/g, '');
      const formatted = numeric.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      setForm({ ...form, [name]: formatted });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setResult('OpenAI 연결 성공!');
  };

  return (
    <div className="app-container">
      <header><h1>🦽 AI 맞춤 여행코스 추천</h1></header>
      <div className="content">
        <form onSubmit={handleSubmit} className="form-section">
          <h2>여행 정보 입력</h2>
          <div className="form-group">
            <label>거동 상태:</label>
            <select name="mobility" onChange={handleChange} value={form.mobility} required>
              <option value="">선택</option>
              <option value="휠체어">휠체어</option>
              <option value="시각장애">시각장애</option>
              <option value="청각장애">청각장애</option>
              <option value="고령자">고령자</option>
              <option value="임산부">임산부</option>
              <option value="어린이">어린이</option>
              <option value="기타">기타</option>
            </select>
          </div>
          <div className="form-group">
            <label>여행 시작일:</label>
            <input type="date" name="startDate" onChange={handleChange} value={form.startDate} required onKeyDown={(e) => e.preventDefault()}/>
          </div>
          <div className="form-group">
            <label>여행 종료일:</label>
            <input type="date" name="endDate" onChange={handleChange} value={form.endDate} required onKeyDown={(e) => e.preventDefault()}/>
          </div>
          <div className="form-group">
            <label>예산 (₩):</label>
            <input type="text" name="budget" onChange={handleChange} value={form.budget ? `${form.budget} 원` : ''} placeholder="예: 100,000 원" />
          </div>
          <div className="form-group">
            <label>여행 도우미:</label>
            <select name="helper" onChange={handleChange} value={form.helper} required>
              <option value="">선택</option>
              <option value="필요">필요</option>
              <option value="불필요">불필요</option>
            </select>
          </div>
          <button type="submit">추천 요청</button>
        </form>

        <div className="result-section">
          <h2>추천 결과</h2>
          <p>{result}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
