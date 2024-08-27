import React, { useState } from 'react';
import './styles.css';

const STATIC_RATE = 590000; // نرخ ثابت دلار به ریال

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [convertedAmount, setConvertedAmount] = useState<string | null>(null);
  const [inputCurrency, setInputCurrency] = useState<string>('USD');
  const [outputCurrency, setOutputCurrency] = useState<string>('IRR');

  const handleConvert = () => {
    const numericAmount = parseFloat(amount.replace(/,/g, ''));
    let result;
    
    if (inputCurrency === 'USD' && outputCurrency === 'IRR') {
      result = numericAmount * STATIC_RATE;
    } else if (inputCurrency === 'IRR' && outputCurrency === 'USD') {
      result = numericAmount / STATIC_RATE;
    } else {
      result = numericAmount; // اگر ورودی و خروجی یکسان باشند
    }

    setConvertedAmount(result.toLocaleString());
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
