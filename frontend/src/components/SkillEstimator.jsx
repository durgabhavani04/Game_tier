// frontend/src/components/SkillEstimator.jsx
import React, { useState } from "react";
import axios from "axios";

const SkillEstimator = () => {
  const [input, setInput] = useState({
    PlayTimeHours: "",
    SessionsPerWeek: "",
    AvgSessionDurationMinutes: "",
    PlayerLevel: "",
    AchievementsUnlocked: ""
  });

  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handlePredict = async () => {
    try {
      // Convert inputs to numbers and validate
      const data = {
        PlayTimeHours: parseFloat(input.PlayTimeHours),
        SessionsPerWeek: parseInt(input.SessionsPerWeek),
        AvgSessionDurationMinutes: parseInt(input.AvgSessionDurationMinutes),
        PlayerLevel: parseInt(input.PlayerLevel),
        AchievementsUnlocked: parseInt(input.AchievementsUnlocked)
      };

      // Check for invalid inputs
      for (const [key, value] of Object.entries(data)) {
        if (isNaN(value)) {
          throw new Error(`Please enter a valid number for ${key}`);
        }
      }

      console.log("Sending data:", data); // Debug payload

      // Send POST request
      const response = await axios.post("http://localhost:5000/predict", data);
      setResult(response.data.engagementLevel); // Access engagementLevel, not tier
      setError("");
    } catch (error) {
      console.error("Prediction error:", error);
      setError(error.response?.data?.error || "An error occurred while predicting.");
      setResult("");
    }
  };

  return (
    <div>
      <h2>Skill Tier Estimator</h2>
      <div>
        <label>Play Time (Hours):</label>
        <input
          type="number"
          name="PlayTimeHours"
          placeholder="Play Time (Hours)"
          value={input.PlayTimeHours}
          onChange={handleChange}
          step="0.1"
        />
      </div>
      <div>
        <label>Sessions Per Week:</label>
        <input
          type="number"
          name="SessionsPerWeek"
          placeholder="Sessions Per Week"
          value={input.SessionsPerWeek}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Average Session Duration (Minutes):</label>
        <input
          type="number"
          name="AvgSessionDurationMinutes"
          placeholder="Avg Session Duration (Minutes)"
          value={input.AvgSessionDurationMinutes}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Player Level:</label>
        <input
          type="number"
          name="PlayerLevel"
          placeholder="Player Level"
          value={input.PlayerLevel}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Achievements Unlocked:</label>
        <input
          type="number"
          name="AchievementsUnlocked"
          placeholder="Achievements Unlocked"
          value={input.AchievementsUnlocked}
          onChange={handleChange}
        />
      </div>
      <button onClick={handlePredict}>Predict</button>
      {result && <h3>Predicted Engagement Level: {result}</h3>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
  );
};

export default SkillEstimator;