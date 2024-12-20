from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI app
app = FastAPI(
    title="Confirmation Bias Detector API",
    description="An API to analyze text for confirmation bias based on sentiment score.",
    version="3.1.0",
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Use specific origins in production for security
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Input model for FastAPI
class TextInput(BaseModel):
    text: str

# Response model for FastAPI
class ResponseModel(BaseModel):
    bias_level: str
    sentiment_score: float

# Function to determine bias level based on sentiment score
def determine_bias_level(sentiment_score: float) -> str:
    """Determine confirmation bias level based on sentiment score."""
    if -0.2 <= sentiment_score <= 0.2:
        return "Low Confirmation Bias detected"  # Neutral tone
    elif 0.2 < sentiment_score <= 0.5 or -0.5 <= sentiment_score < -0.2:
        return "Moderate Confirmation Bias seems to be prevalent"  # Mild emotional tone
    else:
        return "High Confirmation Bias is present"  # Strong emotional tone

# Function to analyze sentiment using VADER
def analyze_sentiment(text: str) -> float:
    """Analyze sentiment using VADER sentiment analysis."""
    vader_analyzer = SentimentIntensityAnalyzer()
    scores = vader_analyzer.polarity_scores(text)
    return scores["compound"]

@app.post("/analyze-bias", summary="Analyze text for confirmation bias", response_model=ResponseModel)
def analyze_bias(input_data: TextInput):
    """
    Analyze the given text for signs of confirmation bias based on sentiment score.
    """
    input_text = input_data.text.strip()

    if not input_text:
        raise HTTPException(status_code=400, detail="Input text cannot be empty.")

    # Analyze sentiment
    sentiment_score = analyze_sentiment(input_text)

    # Determine bias level
    bias_level = determine_bias_level(sentiment_score)

    # Combine results
    return ResponseModel(
        bias_level=bias_level,
        sentiment_score=sentiment_score,
    )

# Health check endpoint
@app.get("/", summary="Health Check")
def root():
    """
    Health check endpoint.
    """
    return {"message": "Confirmation Bias Detector API is running!"}
