import React, { useState } from 'react';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState('');

  const sendMessage = () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      setFeedback("❌ Fill all fields");
      return;
    }

    setFeedback("✔ Message sent successfully");
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <section className="container">
      <h2 className="section-heading">Contact Us</h2>

      <div className="calc-card">
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <textarea 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          placeholder="Message" 
          style={{ width: '100%', height: '100px' }}
        ></textarea>
        <button onClick={sendMessage}>Send</button>
        {feedback && <div className="res">{feedback}</div>}
      </div>
    </section>
  );
}

export default Contact;