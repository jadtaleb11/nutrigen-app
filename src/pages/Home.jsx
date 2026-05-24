import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
    const [analytics, setAnalytics] = useState({
        weight: '--',
        bmi: null,
        bmiStatus: 'No Data',
        maintenance: '--',
        protein: '--',
        carbs: '--',
        fats: '--'
    });
    const [hasData, setHasData] = useState(false);

    useEffect(() => {
        const history = JSON.parse(localStorage.getItem("weightHistory")) || [];
        const bmr = localStorage.getItem("bmr");
        const profile = JSON.parse(localStorage.getItem("profile"));

        let currentWeight = profile?.weight || (history.length > 0 ? history[history.length - 1].value : null);
        let currentHeight = profile?.height || null;

        let bmiVal = null;
        let status = 'No Data';
        if (currentWeight && currentHeight) {
            bmiVal = currentWeight / ((currentHeight / 100) ** 2);
            if (bmiVal < 18.5) status = 'Underweight ⚠️';
            else if (bmiVal < 25) status = 'Normal Weight ✅';
            else if (bmiVal < 30) status = 'Overweight ⚠️';
            else status = 'Obese 🚨';
        }

        let calories = bmr ? Math.round(parseFloat(bmr)) : null;
        let p = '--', c = '--', f = '--';

        if (calories) {
            // Performance split: 30% Protein, 40% Carbs, 30% Fat
            p = Math.round((calories * 0.30) / 4);
            c = Math.round((calories * 0.40) / 4);
            f = Math.round((calories * 0.30) / 9);
        }

        if (currentWeight || calories || bmiVal) {
            setHasData(true);
            setAnalytics({
                weight: currentWeight ? `${currentWeight} kg` : '--',
                bmi: bmiVal ? bmiVal.toFixed(1) : '--',
                bmiStatus: status,
                maintenance: calories ? `${calories} kcal` : '--',
                protein: p ? `${p}g` : '--',
                carbs: c ? `${c}g` : '--',
                fats: f ? `${f}g` : '--'
            });
        }
    }, []);

    return (
        <div>
            <header className="hero">
                <div className="hero-content">
                    <h1>Peak Performance Genetics</h1>
                    <p>Smart nutrition tools for athletes and fighters.</p>
                    <div className="hero-btns">
                        <Link to="/nutrition" className="btn-main">Start Now</Link>
                        <a href="#biometrics" className="btn-secondary">View Metrics</a>
                    </div>
                </div>
            </header>

            {/* BIOMETRICS ANALYTICS PANEL */}
            <section className="container" id="biometrics">
                <h2 className="section-heading">Live Athlete Analytics</h2>

                {hasData ? (
                    <div className="calculator-grid">
                        {/* BMI Card */}
                        <div className="calc-card" style={{ borderTop: '5px solid var(--accent)', textAlign: 'center' }}>
                            <h3>Body Mass Index (BMI)</h3>
                            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '15px 0', color: 'var(--primary)' }}>
                                {analytics.bmi}
                            </div>
                            {/* HIGH-CONTRAST STATUS BADGE */}
                            <span style={{
                                padding: '6px 16px',
                                borderRadius: '20px',
                                background: 'var(--primary)',
                                color: '#000000',
                                fontWeight: '800',
                                fontSize: '0.85rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                                display: 'inline-block'
                            }}>
                                {analytics.bmiStatus}
                            </span>
                        </div>

                        {/* Current Weight Card */}
                        <div className="calc-card" style={{ borderTop: '5px solid var(--primary)', textAlign: 'center' }}>
                            <h3>Tracked Weight</h3>
                            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '15px 0', color: 'var(--dark)' }}>
                                {analytics.weight}
                            </div>
                            <Link to="/tracker" style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: '0.9rem' }}>Log new data →</Link>
                        </div>

                        {/* Caloric & Macro Target Card */}
                        <div className="calc-card" style={{ borderTop: '5px solid #2a9d8f' }}>
                            <h3 style={{ textAlign: 'center' }}>Performance Macro Targets</h3>
                            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', textAlign: 'center', margin: '10px 0', color: '#2a9d8f' }}>
                                {analytics.maintenance}
                            </div>
                            <hr />
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontSize: '0.95rem' }}>
                                <span>🍗 Protein (30%):</span> <strong>{analytics.protein}</strong>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontSize: '0.95rem' }}>
                                <span>🍚 Carbs (40%):</span> <strong>{analytics.carbs}</strong>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontSize: '0.95rem' }}>
                                <span>🥑 Fats (30%):</span> <strong>{analytics.fats}</strong>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="card" style={{ maxWidth: '600px', margin: '0 auto', padding: '3rem' }}>
                        <p style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
                            No health data found. Go fill out your baseline parameters or track a weight log to unlock your analytics dashboard.
                        </p>
                        <Link to="/nutrition" className="btn-main">Setup Metrics Profile</Link>
                    </div>
                )}
            </section>
        </div>
    );
}

export default Home;