// OCR.js
import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import '../styles.css';
const OCRReader = ({ setAmount }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleImageUpload = () => {
    if (!image) {
      alert('画像を選択してください');
      return;
    }

    setLoading(true);
    Tesseract.recognize(
      image,
      'eng', // 言語を指定
      {
        logger: (info) => console.log(info), // ログを表示
      }
    ).then(({ data: { text } }) => {
      const amount = extractAmount(text); // 別途作成する関数
      setAmount(amount);
      setLoading(false);
    }).catch((error) => {
      console.error(error);
      setLoading(false);
    });
  };

  // テキストから金額を抽出する関数
  const extractAmount = (text) => {
    const matches = text.match(/¥(\d+(?:\.\d+)?)/); // ¥記号の後の数値をマッチ
    return matches ? matches[0].replace('¥', '') : ''; // 金額を返す
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleImageUpload} disabled={loading}>
        {loading ? '処理中...' : '画像をアップロード'}
      </button>
    </div>
  );
};

export default OCRReader;
