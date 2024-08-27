import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

const API_KEY = '423eea10ef9e40015378182a';
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest`;

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [convertedAmount, setConvertedAmount] = useState<string | null>(null);
  const [inputCurrency, setInputCurrency] = useState<string>('USD');
  const [outputCurrency, setOutputCurrency] = useState<string>('IRR');
  const [rate, setRate] = useState<number | null>(null);

  useEffect(() => {
    const fetchRate = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/${inputCurrency}`);
        setRate(response.data.conversion_rates[outputCurrency]);
      } catch (error) {
        console.error('خطایی رخ داده', error);
      }
    };
    fetchRate();
  }, [inputCurrency, outputCurrency]);

  const handleConvert = () => {
    if (rate) {
      const numericAmount = parseFloat(amount.replace(/,/g, ''));
      const result = numericAmount * rate;
      setConvertedAmount(result.toLocaleString());
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    if (!isNaN(Number(value))) {
      setAmount(Number(value).toLocaleString());
    }
  };

  return (
    <div className="currency-converter">
      <h2>تبدیل واحد مالی</h2>
      <div>
        <input
          type="text"
          value={amount}
          onChange={handleAmountChange}
          placeholder="عدد را وارد کنید"
          required={true}
        />
      </div>
      <div className="currency-selection">
        <div>
          <h3>واحد پول ورودی</h3>
          <label>
            <input
              type="radio"
              value="USD"
              checked={inputCurrency === 'USD'}
              onChange={() => setInputCurrency('USD')}
            />
            دلار (USD)
          </label>
          <label>
            <input
              type="radio"
              value="IRR"
              checked={inputCurrency === 'IRR'}
              onChange={() => setInputCurrency('IRR')}
            />
            ریال (IRR)
          </label>
        </div>
        <div className="arrow-vector">
          {inputCurrency === 'USD' ? '$' : 'IRR'} ➔{' '}
          {outputCurrency === 'USD' ? '$' : 'IRR'}
        </div>
        <div>
          <h3>واحد پول درخواستی</h3>
          <label>
            <input
              type="radio"
              value="USD"
              checked={outputCurrency === 'USD'}
              onChange={() => setOutputCurrency('USD')}
            />
            دلار (USD)
          </label>
          <label>
            <input
              type="radio"
              value="IRR"
              checked={outputCurrency === 'IRR'}
              onChange={() => setOutputCurrency('IRR')}
            />
            ریال (IRR)
          </label>
        </div>
      </div>
      <div>
        <button onClick={handleConvert} className="convert-button">
          تبدیل
        </button>
      </div>
      <div>
        {convertedAmount !== null && (
          <h3>
            مقدار تبدیل شده: {convertedAmount} {outputCurrency === 'USD' ? 'دلار' : 'ریال'}
          </h3>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;
