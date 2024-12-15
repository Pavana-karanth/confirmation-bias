from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import re
import joblib
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

# Initialize FastAPI app
app = FastAPI(
    title="Confirmation Bias Detector API",
    description="An API to analyze text for signs of confirmation bias.",
    version="1.0.0",
)

# Load pre-trained models
tfidf_vectorizer = joblib.load('tfidf_vectorizer_2.joblib')
kmeans_model = joblib.load('kmeans_model_2.joblib')

# Load cluster feedback mapping
cluster_feedback = {
    0: {
        "level": "Highly Confirmation Biased",
        "message": "The text exhibits strong negative sentiment and high subjectivity, which suggests a critical or one-sided perspective."
    },
    1: {
        "level": "Low Bias (Neutral)",
        "message": "The text demonstrates neutral sentiment and low subjectivity, indicating an objective or balanced perspective."
    },
    2: {
        "level": "Moderately Biased",
        "message": "The text has mixed tones and moderate subjectivity, suggesting some opinions that might align with confirmation bias."
    },
    3: {
        "level": "Highly Confirmation Biased",
        "message": "The text shows very high subjectivity, which indicates personal opinions dominating the content, likely reflecting confirmation bias."
    },
    4: {
        "level": "Moderately Biased",
        "message": "The text exhibits slightly positive sentiment and moderate subjectivity, reflecting opinions that could align with a mild bias."
    }
}

# Input model for FastAPI
class TextInput(BaseModel):
    text: str

# Response model for FastAPI
class ResponseModel(BaseModel):
    bias_level: str
    reason: str
    sentiment_score: float

# Function to clean the input text
def clean_text(text):
    """Clean the input text by removing special characters and extra whitespace."""
    text = re.sub(r'[\n\r]', ' ', text)  # Replace newlines with space
    text = re.sub(r'[^a-zA-Z0-9\s]', ' ', text)  # Remove special characters
    text = re.sub(r'\s+', ' ', text).strip()  # Remove extra whitespace
    return text

# Function to analyze sentiment using VADER
def analyze_sentiment(text):
    """Analyze sentiment using VADER sentiment analysis."""
    if not text or not isinstance(text, str):
        return 0.0
    vader_analyzer = SentimentIntensityAnalyzer()
    scores = vader_analyzer.polarity_scores(text)
    return scores["compound"]

@app.post("/analyze-bias", summary="Analyze text for confirmation bias", response_model=ResponseModel)
def analyze_bias(input_data: TextInput):
    """
    Analyze the given text for signs of confirmation bias.
    """
    input_text = input_data.text.strip()

    if not input_text:
        raise HTTPException(status_code=400, detail="Input text cannot be empty.")

    # Clean input text
    cleaned_text = clean_text(input_text)

    # Transform input text using TF-IDF vectorizer
    tfidf_vector = tfidf_vectorizer.transform([cleaned_text])

    # Predict cluster using KMeans model
    cluster_label = kmeans_model.predict(tfidf_vector)[0]

    # Get feedback for the predicted cluster
    feedback = cluster_feedback.get(
        cluster_label, 
        {"level": "Unknown", "message": "The analysis could not determine a clear bias level for this input."}
    )

    # Add sentiment analysis result
    sentiment_score = analyze_sentiment(cleaned_text)

    return ResponseModel(
        bias_level=feedback["level"],
        reason=feedback["message"],
        sentiment_score=sentiment_score
    )

# Health check endpoint
@app.get("/", summary="Health Check")
def root():
    """
    Health check endpoint.
    """
    return {"message": "Confirmation Bias Detector API is running!"}

