from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import re
import joblib
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai  # Gemini integratio

# Initialize FastAPI app
app = FastAPI(
    title="Confirmation Bias Detector API",
    description="An API to analyze text for signs of confirmation bias using Gemini AI.",
    version="1.1.0",
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Use specific origins in production for security
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Load pre-trained models
tfidf_vectorizer = joblib.load("tfidf_vectorizer_3.joblib")
kmeans_model = joblib.load("kmeans_model_3.joblib")

# Define the feedback for each cluster
cluster_feedback = {
    0: {
        "level": "High Confirmation Bias",
        "message": "The text shows strong emotional or subjective tones, often indicating alignment with pre-existing opinions."
    },
    1: {
        "level": "Moderate Bias",
        "message": "The text reflects some opinions and subjective language, which might partially align with confirmation bias."
    },
    2: {
        "level": "Low Bias (Neutral)",
        "message": "The text exhibits a neutral tone with objective language, indicating little to no confirmation bias."
    },
}

# Input model for FastAPI
class TextInput(BaseModel):
    text: str

# Response model for FastAPI
class ResponseModel(BaseModel):
    bias_level: str
    reason: str
    sentiment_score: float
    #gemini_analysis: str  # Analysis from Gemini
    #gemini_explanation: str  # Explanation from Gemini

# Function to clean the input text
def clean_text(text):
    """Clean the input text by removing special characters and extra whitespace."""
    text = re.sub(r"[\n\r]", " ", text)  # Replace newlines with space
    text = re.sub(r"[^a-zA-Z0-9\s]", " ", text)  # Remove special characters
    text = re.sub(r"\s+", " ", text).strip()  # Remove extra whitespace
    return text

# Function to analyze sentiment using VADER
def analyze_sentiment(text):
    """Analyze sentiment using VADER sentiment analysis."""
    if not text or not isinstance(text, str):
        return 0.0
    vader_analyzer = SentimentIntensityAnalyzer()
    scores = vader_analyzer.polarity_scores(text)
    return scores["compound"]

# Function to use Gemini for reasoning
'''
def analyze_with_gemini(input_text):
    """
    Use Google Gemini to generate reasoning about the input text.
    """
    try:
         
        # Use the Gemini API for generating the reason behind the sentiment or bias
        prompt = f"Analyze the following text and detect if there's confirmation bias. provide **only the reason** for the confirmation bias present or not present without any additional context, advice, or explanations. Do not generate any general discussion. The text is: {input_text}"
        # Authenticate with your Gemini API key
        genai.configure(api_key="AIzaSyB_FPiUvIUALsLfSgt5rxcbLP_nakezRQ8")  # Replace with your Gemini API key

        # Generate response using Gemini
        response = genai.GenerativeModel("gemini-2.0-flash-exp").generate_content(input_text)
        gemini_analysis = response.text

        return gemini_analysis, "Gemini's reasoning is successfully generated."
    except Exception as e:
        return "Error", f"Gemini Analysis Failed: {str(e)}"
        '''

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


    # Combine results
    return ResponseModel(
        bias_level=feedback["level"],
        reason=feedback["message"],
        sentiment_score=sentiment_score,
    )

# Health check endpoint
@app.get("/", summary="Health Check")
def root():
    """
    Health check endpoint.
    """
    return {"message": "Confirmation Bias Detector API is running!"}
