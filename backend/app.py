from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

# Load model and encoder
try:
    model = joblib.load(r'D:\gaming-skill-estimator\gaming-skill-estimator\backend\model\skill_model.pkl')
    label_encoder = joblib.load(r'D:\gaming-skill-estimator\gaming-skill-estimator\backend\model\label_encoder.pkl')

except FileNotFoundError as e:
    print(f"Error loading model files: {e}")
    exit(1)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        print("Received data:", data)
        if not data:
            return jsonify({"error": "No JSON data provided"}), 400

        # Required fields
        required_fields = [
            'PlayTimeHours',
            'SessionsPerWeek',
            'AvgSessionDurationMinutes',
            'PlayerLevel',
            'AchievementsUnlocked'
        ]
        for field in required_fields:
            if field not in data:
                print(f"Missing field: {field}")
                return jsonify({"error": f"Missing field: {field}"}), 400
            if not isinstance(data[field], (int, float)):
                print(f"Invalid type for {field}: {type(data[field])}")
                return jsonify({"error": f"Invalid type for {field}, expected numeric"}), 400

        # Extract features
        features = np.array([[
            data['PlayTimeHours'],
            data['SessionsPerWeek'],
            data['AvgSessionDurationMinutes'],
            data['PlayerLevel'],
            data['AchievementsUnlocked']
        ]])

        # Predict
        prediction = model.predict(features)
        engagement_level = label_encoder.inverse_transform(prediction)[0]
        return jsonify({"engagementLevel": engagement_level})

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)