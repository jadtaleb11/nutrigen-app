import React, { useState, useEffect } from 'react';

function Workouts() {
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const storedWorkouts = JSON.parse(localStorage.getItem("myWorkouts")) || [];
    setWorkouts(storedWorkouts);
  }, []);

  const addWorkout = () => {
    if (category.trim() === "" || name.trim() === "" || details.trim() === "") {
      alert("Fill all fields");
      return;
    }

    const newWorkout = {
      category: category.trim(),
      name: name.trim(),
      details: details.trim()
    };

    const updatedWorkouts = [...workouts, newWorkout];
    setWorkouts(updatedWorkouts);
    localStorage.setItem("myWorkouts", JSON.stringify(updatedWorkouts));

    setName('');
    setDetails('');
  };

  const deleteCategory = (catName) => {
    if (window.confirm(`Delete ${catName}?`)) {
      const updatedWorkouts = workouts.filter(w => w.category !== catName);
      setWorkouts(updatedWorkouts);
      localStorage.setItem("myWorkouts", JSON.stringify(updatedWorkouts));
    }
  };

  const deleteSingleWorkout = (indexToDelete) => {
    const updatedWorkouts = workouts.filter((_, idx) => idx !== indexToDelete);
    setWorkouts(updatedWorkouts);
    localStorage.setItem("myWorkouts", JSON.stringify(updatedWorkouts));
  };

  const clearAllWorkouts = () => {
    if (window.confirm("Delete all?")) {
      localStorage.removeItem("myWorkouts");
      setWorkouts([]);
    }
  };

  // Group workouts by category dynamically
  const groupedWorkouts = workouts.reduce((acc, item, index) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push({ ...item, originalIndex: index });
    return acc;
  }, {});

  return (
    <section className="container">
      <h2 className="section-heading">Custom Training Plan</h2>

      <div className="calc-card" style={{ marginBottom: '30px' }}>
        <h3>Add New Exercise</h3>
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category (e.g. Strength, Cardio)" />
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Exercise Name" />
        <input type="text" value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Details (e.g. 3x15, 10 min)" />
        <button onClick={addWorkout}>Add to List</button>
        <button onClick={clearAllWorkouts} style={{ background: '#e63946', marginTop: '10px' }}>Clear All Workouts</button>
      </div>

      <div className="calculator-grid">
        {Object.keys(groupedWorkouts).map((catName) => (
          <div className="calc-card" key={catName}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 className="workout-title" style={{ margin: 0 }}>{catName}</h3>
              <span
                onClick={() => deleteCategory(catName)}
                style={{ color: '#ccc', cursor: 'pointer', fontWeight: 'bold' }}
              >✕</span>
            </div>
            <hr />
            <ul className="workout-list">
              {groupedWorkouts[catName].map((item) => (
                <li key={item.originalIndex}>
                  <span><strong>{item.name}:</strong> {item.details}</span>
                  <span
                    onClick={() => deleteSingleWorkout(item.originalIndex)}
                    style={{ color: '#ccc', cursor: 'pointer', fontWeight: 'bold' }}
                  >✕</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Workouts;