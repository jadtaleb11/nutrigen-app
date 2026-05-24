import React, { useState, useEffect } from 'react';

function Tracker() {
  const [weightInput, setWeightInput] = useState('');
  const [history, setHistory] = useState([]);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("weightHistory")) || [];
    setHistory(storedHistory);
  }, []);

  const saveWeight = () => {
    const parsedWeight = parseFloat(weightInput);
    if (isNaN(parsedWeight) || parsedWeight <= 0) {
      setFeedback("❌ Enter a valid weight");
      return;
    }

    const newEntry = {
      value: parsedWeight,
      date: new Date().toLocaleDateString()
    };

    const updatedHistory = [...history, newEntry];
    setHistory(updatedHistory);
    localStorage.setItem("weightHistory", JSON.stringify(updatedHistory));

    // UPGRADE: Intercept and update baseline profile parameters for global dashboard synchronization
    const existingProfile = JSON.parse(localStorage.getItem("profile"));
    if (existingProfile) {
      existingProfile.weight = parsedWeight;
      localStorage.setItem("profile", JSON.stringify(existingProfile));
    }
    
    setWeightInput('');
    setFeedback("✔ Weight saved and synced across system!");
  };

  const deleteLast = () => {
    if (history.length > 0) {
      const updatedHistory = history.slice(0, -1);
      setHistory(updatedHistory);
      localStorage.setItem("weightHistory", JSON.stringify(updatedHistory));
      
      // Roll back profile synchronization to previous weight entry if available
      const existingProfile = JSON.parse(localStorage.getItem("profile"));
      if (existingProfile && updatedHistory.length > 0) {
        existingProfile.weight = updatedHistory[updatedHistory.length - 1].value;
        localStorage.setItem("profile", JSON.stringify(existingProfile));
      }
    }
  };

  const clearHistory = () => {
    if (window.confirm("Are you sure you want to delete all history?")) {
      localStorage.removeItem("weightHistory");
      setHistory([]);
    }
  };

  return (
    <section className="container">
      <h2 className="section-heading">Progress Tracker</h2>

      <div className="calc-card" style={{ marginBottom: '25px' }}>
        <h3>Log Today's Weight</h3>
        <input 
          type="number" 
          value={weightInput} 
          onChange={(e) => setWeightInput(e.target.value)} 
          placeholder="Weight (kg)" 
        />
        <button onClick={saveWeight}>Save Entry</button>
        {feedback && <div className="res">{feedback}</div>}
      </div>

      <div className="calc-card">
        <h3>Weight History</h3>
        <ul id="history">
          {history.map((item, index) => (
            <li key={index}>
              <strong>{item.value} kg</strong> - <small>{item.date}</small>
            </li>
          ))}
        </ul>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={deleteLast} style={{ marginTop: '10px' }}>Delete Last</button>
          <button onClick={clearHistory} style={{ marginTop: '10px', background: '#e63946' }}>Clear All</button>
        </div>
      </div>
    </section>
  );
}

export default Tracker;