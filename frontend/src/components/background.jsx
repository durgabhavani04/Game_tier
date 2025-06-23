import React, { useState } from "react";
import axios from "axios";
import "./background.css";

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
      const data = {
        PlayTimeHours: parseFloat(input.PlayTimeHours),
        SessionsPerWeek: parseInt(input.SessionsPerWeek),
        AvgSessionDurationMinutes: parseInt(input.AvgSessionDurationMinutes),
        PlayerLevel: parseInt(input.PlayerLevel),
        AchievementsUnlocked: parseInt(input.AchievementsUnlocked)
      };

      for (const [key, value] of Object.entries(data)) {
        if (isNaN(value)) {
          throw new Error(`Please enter a valid number for ${key}`);
        }
      }

      const response = await axios.post("http://localhost:5000/predict", data);
      setResult(response.data.engagementLevel);
      setError("");
    } catch (error) {
      console.error("Prediction error:", error);
      setError(error.response?.data?.error || "An error occurred while predicting.");
      setResult("");
    }
  };

  return (
    <div className="gif-wrapper">
      <div className="gif-overlay"></div>
      <div className="form-card">
        <h1>🎮 Skill Tier Estimator</h1>

        <div className="form-group">
          <label>Play Time (Hours)</label>
          <input
            type="number"
            name="PlayTimeHours"
            value={input.PlayTimeHours}
            onChange={handleChange}
            step="0.1"
          />
        </div>

        <div className="form-group">
          <label>Sessions Per Week</label>
          <input
            type="number"
            name="SessionsPerWeek"
            value={input.SessionsPerWeek}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Avg. Session Duration (Minutes)</label>
          <input
            type="number"
            name="AvgSessionDurationMinutes"
            value={input.AvgSessionDurationMinutes}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Player Level</label>
          <input
            type="number"
            name="PlayerLevel"
            value={input.PlayerLevel}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Achievements Unlocked</label>
          <input
            type="number"
            name="AchievementsUnlocked"
            value={input.AchievementsUnlocked}
            onChange={handleChange}
          />
        </div>

        <button onClick={handlePredict}>Predict</button>

        {result && (
          <div className="result">
            Predicted Level: <span>{result}</span>
          </div>
        )}
        {error && <div className="error">⚠ {error}</div>}
      </div>
    </div>
  );
};

export default SkillEstimator;
