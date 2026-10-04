# 🌍 Multilingual Text Sentiment Analysis

## 📌 Project Overview

**Multilingual Text Sentiment Analysis** is an NLP-based web application that analyzes text written in multiple languages and identifies its overall sentiment.

The system classifies text into:

* 😊 Positive
* 😟 Negative
* 😐 Neutral

It also provides:

* Language detection
* Sentiment confidence
* Emotion detection
* Keyword analysis
* Word count
* Sentiment distribution
* Analysis history
* Interactive dashboard

---

## 🎯 Objectives

The main objectives of this project are:

1. Analyze text written in different languages.
2. Identify positive, negative, and neutral sentiment.
3. Detect the language of the entered text.
4. Provide sentiment confidence scores.
5. Display results using an interactive dashboard.
6. Demonstrate the application of NLP in multilingual communication.

---

## 🌐 Supported Languages

The current frontend demonstration supports:

| Language | Flag |
| -------- | ---- |
| English  | 🇬🇧 |
| Tamil    | 🇮🇳 |
| Hindi    | 🇮🇳 |
| Spanish  | 🇪🇸 |
| French   | 🇫🇷 |
| German   | 🇩🇪 |

---

## 🛠️ Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript
* Chart.js
* LocalStorage

### NLP Concepts

* Language Detection
* Text Preprocessing
* Keyword Matching
* Sentiment Classification
* Emotion Detection
* Confidence Scoring

---

## 📁 Project Structure

```text
Multilingual-Text-Sentiment-Analysis/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## ⚙️ System Workflow

```text
User Text
    ↓
Language Detection
    ↓
Text Preprocessing
    ↓
Multilingual Keyword Analysis
    ↓
Sentiment Classification
    ↓
Emotion Detection
    ↓
Confidence Calculation
    ↓
Dashboard Visualization
```

---

## 💡 Main Features

### 1. Multilingual Analysis

The application accepts text from multiple languages and identifies the selected or automatically detected language.

### 2. Sentiment Classification

The system classifies text as:

```text
Positive
Negative
Neutral
```

### 3. Confidence Score

A confidence percentage is calculated based on the detected sentiment signals.

### 4. Emotion Detection

The system provides a simple emotion category such as:

* Joyful
* Positive
* Angry / Disappointed
* Concerned
* Calm

### 5. Keyword Detection

Positive and negative keywords are identified from the input text.

### 6. Interactive Dashboard

The dashboard displays:

* Total analyses
* Languages used
* Positive results
* Average confidence
* Sentiment distribution chart

### 7. Analysis History

Recent analysis results are stored in the browser using:

```javascript
localStorage
```

---

## 🚀 How to Run

### Step 1

Download or clone the project.

### Step 2

Keep all files inside the same folder:

```text
index.html
style.css
script.js
README.md
```

### Step 3

Open:

```text
index.html
```

in Google Chrome, Microsoft Edge, or another modern browser.

No server is required for the frontend demonstration.

---

## 🧪 Example Inputs

### English

```text
I absolutely love this product. The quality is amazing and the service was excellent!
```

Expected:

```text
Positive
```

### Tamil

```text
இந்த தயாரிப்பு மிகவும் அருமையாக உள்ளது. எனக்கு மிகவும் பிடித்திருக்கிறது.
```

Expected:

```text
Positive
```

### Hindi

```text
यह उत्पाद बहुत अच्छा है और मुझे बहुत पसंद आया।
```

Expected:

```text
Positive
```

### Spanish

```text
Este producto es excelente y me encanta.
```

Expected:

```text
Positive
```

### Negative

```text
This product is terrible and disappointing. The service was very poor.
```

Expected:

```text
Negative
```

---

## 🧠 NLP Architecture

```text
                ┌──────────────────┐
                │    User Input    │
                └────────┬─────────┘
                         ↓
                ┌──────────────────┐
                │ Language Detector│
                └────────┬─────────┘
                         ↓
                ┌──────────────────┐
                │ Text Processing  │
                └────────┬─────────┘
                         ↓
              ┌───────────────────────┐
              │ Multilingual Lexicon  │
              └───────────┬───────────┘
                          ↓
              ┌───────────────────────┐
              │ Sentiment Classifier  │
              └───────────┬───────────┘
                          ↓
                ┌──────────────────┐
                │ Result Dashboard │
                └──────────────────┘
```

---

## 📊 Applications

Multilingual sentiment analysis can be used in:

* Social media monitoring
* Customer feedback analysis
* Product reviews
* E-commerce
* Market research
* Brand monitoring
* Customer support
* Survey analysis
* Online education
* Public opinion analysis

---

## ☁️ Future Enhancements

The current project is a frontend NLP demonstration. A production-level version can be extended with a backend and machine-learning model.

Possible improvements:

1. Python Flask or FastAPI backend
2. Machine learning sentiment classifier
3. TF-IDF + Logistic Regression
4. Naive Bayes classifier
5. BERT multilingual model
6. XLM-RoBERTa
7. Real-time API-based analysis
8. Database for analysis history
9. User authentication
10. Cloud deployment
11. Speech-to-text analysis
12. More than 50 languages
13. Real-time social media sentiment analysis

---

## 🔬 Advanced Architecture

For a full AI-based implementation:

```text
              User
                ↓
        Web Application
                ↓
          REST API
                ↓
       Language Detection
                ↓
       Text Preprocessing
                ↓
      Multilingual NLP Model
                ↓
       Sentiment Prediction
                ↓
      Emotion Classification
                ↓
            Database
                ↓
        Analytics Dashboard
```

---

## ⚠️ Current Project Limitation

This version uses a **frontend multilingual sentiment lexicon/rule-based approach** for demonstration purposes.

It should not be considered a production-grade AI fact or sentiment model.

For a real AI system, the frontend can be connected to a Python backend containing a trained multilingual NLP model.

---

## 🔮 Recommended AI Upgrade

For a simple college project:

```text
Dataset
   ↓
Text Cleaning
   ↓
TF-IDF Vectorization
   ↓
Logistic Regression
   ↓
Sentiment Prediction
   ↓
Flask/FastAPI API
   ↓
Web Interface
```

For an advanced project:

```text
Multilingual Text
       ↓
XLM-RoBERTa
       ↓
Fine-Tuning
       ↓
Sentiment Classification
       ↓
REST API
       ↓
Web Dashboard
```

---

## ✅ Conclusion

The **Multilingual Text Sentiment Analysis** project demonstrates how NLP can be used to understand opinions and emotions expressed in different languages.

The system provides a professional interface for multilingual sentiment analysis and can be further extended into a complete AI-powered application using machine learning, deep learning, REST APIs, databases, and cloud deployment.

---

## 👨‍💻 Project Type

**Domain:** Natural Language Processing

**Category:** Text and Speech Analysis

**Project:** Multilingual Text Sentiment Analysis

**Technology:** HTML, CSS, JavaScript, NLP

**Level:** College Mini Project / Academic Project
