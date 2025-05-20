# Confirmation Bias Detection in Media using NLP

## 📚 Table of Contents

* [Introduction](#introduction)
* [Project Description](#project-description)
* [Features](#features)
* [Technologies Used](#technologies-used)
* [Installation](#installation)
* [Usage](#usage)
* [Contributors](#contributors)
* [License](#license)

---

## 🧠 Introduction

Welcome to the Confirmation Bias Detection project. Built as a mini-project under the Department of CSE, this tool leverages Natural Language Processing (NLP) to help identify **confirmation bias** in digital media texts. In today’s age of information overload and echo chambers, the goal is to encourage **critical thinking** and **balanced media consumption**.

---

## 📖 Project Description

This project is designed to detect confirmation bias in news articles, editorials, and opinion pieces by analyzing the emotional tone of the content. It initially aimed to incorporate advanced NLP techniques such as linguistic pattern recognition, framing analysis, and clustering. However, due to dataset limitations and model instability, it currently focuses on **sentiment analysis** to infer potential levels of confirmation bias.

The backend provides a simple FastAPI endpoint that analyzes text using VADER sentiment scoring. A user-friendly React frontend is deployed for easy interaction.

---

## 🧩 Features

* **Sentiment-Based Bias Detection**: Uses VADER to score sentiment and infer bias levels (Low, Moderate, High).
* **FastAPI Web Service**: Exposes a `/analyze-bias` endpoint to process user input.
* **React Frontend Interface**: Allows users to input and analyze media text interactively.
* **Planned**: Future support for topic modeling, framing detection, and cross-source bias comparison.

---

## 🛠️ Technologies Used

The project utilizes the following tools and libraries:

* **Python**
* **FastAPI** for backend API
* **VADER Sentiment** from `vaderSentiment`
* **Scikit-learn** (previously for clustering)
* **Joblib** for model serialization
* **ReactJS / Next.js** for frontend
* **ShadCN UI** for styling components

---

## 💻 Installation

To run the project locally:

1. **Clone the repository**

   ```bash git clone https://github.com/your-username/confirmation-bias-detector.git ```
2. **Navigate to the project directory**

   ```bash cd confirmation-bias-detector ```
3. **Install backend dependencies**
   ```bash pip install -r requirements.txt ```

### `requirements.txt`

```
fastapi[all]
starlette
uvicorn[standard]
joblib
vaderSentiment
scikit-learn
```

> **Note:** Frontend setup is hosted separately and can be cloned or forked as needed.

---

## 🚀 Usage

To run the backend service locally:

```bash uvicorn main:app --reload ```

Once running, test the API by sending a POST request to:

``` http://127.0.0.1:8000/analyze-bias ```

Visit the deployed apps:

* **Frontend**: [https://confirmation-bias.vercel.app](https://confirmation-bias.vercel.app)
* **Backend**: [https://confirmation-bias.onrender.com](https://confirmation-bias.onrender.com)

---

## 👥 Contributors

This project was developed by:

* [Pavana P. Karanth] (https://github.com/Pavana-karanth)
* [Safeya Zawath Zakir] (https://github.com/Safeyaz)

> Contributions and suggestions are welcome. Open an issue or submit a PR.

---

## 🧾 License


This project is licensed under the **MIT License**.

---

Let me know if you want help auto-generating badges, frontend setup steps, or splitting the README for frontend/backend repos!
