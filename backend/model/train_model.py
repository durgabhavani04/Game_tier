# train_model.py

import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import joblib

# Load dataset
df = pd.read_csv(r'D:\gaming-skill-estimator\gaming-skill-estimator\backend\model\unlocked.csv\clean_dataset.csv')




# Select features and label
X = df[[
    'PlayTimeHours',
    'SessionsPerWeek',
    'AvgSessionDurationMinutes',
    'PlayerLevel',
    'AchievementsUnlocked'
]]
y = df['EngagementLevel']  # Target column

# Drop rows with missing values
X = X.dropna()
y = y[X.index]

# Encode target labels (High/Medium/Low)
label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y_encoded, test_size=0.2, random_state=42)

# Train model
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Save model and encoder
joblib.dump(model, 'skill_model.pkl')
joblib.dump(label_encoder, 'label_encoder.pkl')

print("✅ Model trained and saved as 'skill_model.pkl' and 'label_encoder.pkl'")