// src/pages/StockQuote.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './StockQuote.css';

const StockQuote = () => {
  const [symbol, setSymbol] = useState('');
  const [quote, setQuote] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { API_URL } = useAuth();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axios.get(`${API_URL}/stock-quotes/history`);
      setHistory(response.data);
    } catch (error) {
      console.error('Failed to fetch history:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setQuote(null);

    try {
      const response = await axios.post(`${API_URL}/stock-quote`, {
        symbol: symbol.toUpperCase()
      });
      setQuote(response.data);
      setSymbol('');
      fetchHistory(); // Refresh history
    } catch (error) {
      setError(error.response?.data?.detail || 'Failed to fetch stock quote');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="stock-quote-container">
      <div className="stock-quote-card">
        <h2>Get Stock Quote</h2>
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="stock-form">
          <div className="form-group">
            <label htmlFor="symbol">Stock Symbol</label>
            <input
              type="text"
              id="symbol"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              required
              placeholder="e.g., AAPL, GOOGL, MSFT"
              maxLength={5}
            />
            <small>Example: AAPL, GOOGL, MSFT</small>
          </div>
          <button type="submit" disabled={loading} className="submit-button">
            {loading ? 'Fetching...' : 'Get Quote'}
          </button>
        </form>

        {quote && (
          <div className="quote-result">
            <h3>{quote.symbol}</h3>
            <div className="quote-details">
              <div className="quote-price">
                <span className="label">Price:</span>
                <span className="value">${quote.price.toFixed(2)}</span>
              </div>
              <div className="quote-change">
                <span className="label">Change:</span>
                <span className={`value ${quote.change >= 0 ? 'positive' : 'negative'}`}>
                  {quote.change >= 0 ? '+' : ''}{quote.change.toFixed(2)} 
                  ({quote.change_percent >= 0 ? '+' : ''}{quote.change_percent.toFixed(2)}%)
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {history.length > 0 && (
        <div className="history-card">
          <h3>Recent Searches</h3>
          <div className="history-list">
            {history.map((item) => (
              <div key={item.id} className="history-item">
                <div className="history-symbol">{item.symbol}</div>
                <div className="history-price">${item.price.toFixed(2)}</div>
                <div className={`history-change ${item.change >= 0 ? 'positive' : 'negative'}`}>
                  {item.change >= 0 ? '+' : ''}{item.change_percent.toFixed(2)}%
                </div>
                <div className="history-date">
                  {new Date(item.created_at).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StockQuote;