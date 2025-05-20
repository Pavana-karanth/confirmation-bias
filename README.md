# confirmation-bias

# 🧠 Confirmation Bias Detection in Media using NLP

An NLP-powered tool aimed at identifying **confirmation bias** in digital media content, such as news articles, editorials, and blog posts. This system helps promote media literacy and critical consumption by analyzing textual sentiment to detect potential biases.

---

## 📌 Project Goals

Originally envisioned as a comprehensive system to:

- Detect **linguistic patterns and emotional framing** in news content  
- Assess **source diversity** and identify **selective reporting**  
- Generate an interpretive **bias score**  
- Provide a **cross-source comparison**  
- Enable an **interactive frontend interface** for public use  

---

## ⚠️ Status: Under Development

> 🛠️ **NOTE:**  
> The original plan involved complex clustering (KMeans, TF-IDF vectorization), linguistic framing analysis, and bias pattern identification.  
> Due to issues with **data skewness**, clustering results were inconclusive.

✅ The project currently simplifies the task to **sentiment-based detection** using VADER.  
Users can analyze any given text and receive:
- A **sentiment score**
- A mapped **bias level** (Low / Moderate / High)

---

## ✅ What It Does Now

Uses the **VADER sentiment analyzer** to assess a text and classifies it into one of three bias levels based on sentiment intensity. 
