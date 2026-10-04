const textInput = document.getElementById("textInput");
const languageSelect = document.getElementById("languageSelect");
const analyzeBtn = document.getElementById("analyzeBtn");
const clearBtn = document.getElementById("clearBtn");
const charCount = document.getElementById("charCount");

const sentimentText = document.getElementById("sentimentText");
const sentimentDescription = document.getElementById("sentimentDescription");
const sentimentIcon = document.getElementById("sentimentIcon");
const confidenceValue = document.getElementById("confidenceValue");
const confidenceBar = document.getElementById("confidenceBar");

const positiveScore = document.getElementById("positiveScore");
const negativeScore = document.getElementById("negativeScore");
const neutralScore = document.getElementById("neutralScore");

const detectedLanguage = document.getElementById("detectedLanguage");
const emotionResult = document.getElementById("emotionResult");
const wordCount = document.getElementById("wordCount");
const keywordCount = document.getElementById("keywordCount");

const totalAnalyses = document.getElementById("totalAnalyses");
const languagesUsed = document.getElementById("languagesUsed");
const positiveResults = document.getElementById("positiveResults");
const averageConfidence = document.getElementById("averageConfidence");

const historyList = document.getElementById("historyList");
const themeBtn = document.getElementById("themeBtn");
const heroScore = document.getElementById("heroScore");


const dictionaries = {

    english: {
        positive: [
            "good", "great", "excellent", "amazing", "love",
            "wonderful", "happy", "best", "perfect", "beautiful",
            "awesome", "fantastic", "enjoy", "success", "helpful"
        ],
        negative: [
            "bad", "worst", "hate", "terrible", "awful",
            "poor", "sad", "angry", "horrible", "disappointing",
            "problem", "failure", "useless", "boring", "waste"
        ]
    },

    tamil: {
        positive: [
            "நல்ல", "சிறப்பு", "அருமை", "மகிழ்ச்சி",
            "சந்தோஷம்", "அற்புதம்", "வெற்றி", "பிடிக்கும்",
            "சிறந்த", "நன்றி"
        ],
        negative: [
            "மோசம்", "தவறு", "சோகம்", "வெறுப்பு",
            "பிரச்சனை", "மோசமான", "தோல்வி", "கோபம்",
            "பிடிக்கவில்லை", "கவலை"
        ]
    },

    hindi: {
        positive: [
            "अच्छा", "बहुत अच्छा", "शानदार", "सुंदर",
            "खुश", "प्यार", "सफलता", "बेहतरीन",
            "अद्भुत", "धन्यवाद"
        ],
        negative: [
            "बुरा", "खराब", "नफरत", "दुखी",
            "समस्या", "गुस्सा", "असफलता",
            "बेकार", "निराश", "गलत"
        ]
    },

    spanish: {
        positive: [
            "bueno", "excelente", "genial", "amor",
            "feliz", "perfecto", "maravilloso",
            "fantástico", "éxito", "gracias"
        ],
        negative: [
            "malo", "terrible", "odio", "triste",
            "problema", "fracaso", "horrible",
            "decepción", "enojado", "peor"
        ]
    },

    french: {
        positive: [
            "bon", "excellent", "super", "amour",
            "heureux", "parfait", "merveilleux",
            "fantastique", "succès", "merci"
        ],
        negative: [
            "mauvais", "terrible", "déteste", "triste",
            "problème", "échec", "horrible",
            "décevant", "colère", "pire"
        ]
    },

    german: {
        positive: [
            "gut", "ausgezeichnet", "großartig", "liebe",
            "glücklich", "perfekt", "wunderbar",
            "fantastisch", "erfolg", "danke"
        ],
        negative: [
            "schlecht", "schrecklich", "hass", "traurig",
            "problem", "fehler", "versagen",
            "enttäuschend", "wütend", "schlimm"
        ]
    }
};


const languageNames = {
    english: "🇬🇧 English",
    tamil: "🇮🇳 Tamil",
    hindi: "🇮🇳 Hindi",
    spanish: "🇪🇸 Spanish",
    french: "🇫🇷 French",
    german: "🇩🇪 German"
};


const examples = {

    positive: {
        language: "english",
        text: "I absolutely love this product. The quality is amazing and the service was excellent!"
    },

    negative: {
        language: "english",
        text: "This product is terrible and disappointing. The service was very poor and the experience was horrible."
    },

    neutral: {
        language: "english",
        text: "The product was delivered yesterday. It has a standard design and comes with a one year warranty."
    }
};


let analysisHistory =
    JSON.parse(localStorage.getItem("polySentHistory")) || [];


let chart;


function detectLanguage(text) {

    if (!text.trim()) {
        return "english";
    }

    const tamilChars = (text.match(/[\u0B80-\u0BFF]/g) || []).length;
    const hindiChars = (text.match(/[\u0900-\u097F]/g) || []).length;

    const spanishChars =
        (text.match(/[áéíóúñ¿¡]/gi) || []).length;

    const frenchChars =
        (text.match(/[àâçéèêëîïôûùüÿœ]/gi) || []).length;

    const germanChars =
        (text.match(/[äöüß]/gi) || []).length;


    const scores = {
        tamil: tamilChars,
        hindi: hindiChars,
        spanish: spanishChars,
        french: frenchChars,
        german: germanChars
    };


    let detected = "english";
    let maxScore = 0;

    Object.keys(scores).forEach(language => {

        if (scores[language] > maxScore) {
            maxScore = scores[language];
            detected = language;
        }

    });

    return detected;
}


function getWords(text) {

    return text
        .toLowerCase()
        .split(/\s+/)
        .map(word => word.replace(/[.,!?;:"'()[\]{}]/g, ""))
        .filter(Boolean);

}


function analyzeText(text, language) {

    const detected =
        language === "auto"
            ? detectLanguage(text)
            : language;


    const dictionary =
        dictionaries[detected] || dictionaries.english;


    const words = getWords(text);

    let positive = 0;
    let negative = 0;

    const matchedKeywords = [];


    words.forEach(word => {

        if (dictionary.positive.includes(word)) {
            positive++;
            matchedKeywords.push(word);
        }

        if (dictionary.negative.includes(word)) {
            negative++;
            matchedKeywords.push(word);
        }

    });


    const total = positive + negative;

    let sentiment;

    if (positive === 0 && negative === 0) {
        sentiment = "Neutral";
    } else if (positive > negative) {
        sentiment = "Positive";
    } else if (negative > positive) {
        sentiment = "Negative";
    } else {
        sentiment = "Neutral";
    }


    let confidence;

    if (total === 0) {
        confidence = 54;
    } else {

        const difference =
            Math.abs(positive - negative);

        confidence =
            Math.round(
                65 + Math.min(30, difference * 12)
            );
    }


    let positivePercentage;
    let negativePercentage;
    let neutralPercentage;


    if (total === 0) {

        positivePercentage = 0;
        negativePercentage = 0;
        neutralPercentage = 100;

    } else {

        positivePercentage =
            Math.round((positive / total) * 100);

        negativePercentage =
            Math.round((negative / total) * 100);

        neutralPercentage =
            100 - positivePercentage - negativePercentage;
    }


    let emotion = "Calm";

    if (sentiment === "Positive") {

        if (positive >= 3) {
            emotion = "Joyful";
        } else {
            emotion = "Positive";
        }

    } else if (sentiment === "Negative") {

        if (negative >= 3) {
            emotion = "Angry / Disappointed";
        } else {
            emotion = "Concerned";
        }

    }


    return {
        language: detected,
        sentiment,
        confidence,
        positivePercentage,
        negativePercentage,
        neutralPercentage,
        emotion,
        wordCount: words.length,
        keywordCount: matchedKeywords.length,
        keywords: matchedKeywords
    };
}


function updateResult(result) {

    sentimentText.textContent = result.sentiment;

    confidenceValue.textContent =
        result.confidence + "%";

    confidenceBar.style.width =
        result.confidence + "%";


    positiveScore.textContent =
        result.positivePercentage + "%";

    negativeScore.textContent =
        result.negativePercentage + "%";

    neutralScore.textContent =
        result.neutralPercentage + "%";


    detectedLanguage.textContent =
        languageNames[result.language];


    emotionResult.textContent =
        result.emotion;


    wordCount.textContent =
        result.wordCount + " words";


    keywordCount.textContent =
        result.keywordCount;


    if (result.sentiment === "Positive") {

        sentimentIcon.textContent = "😊";

        sentimentDescription.textContent =
            "The text expresses a positive emotional tone.";

    } else if (result.sentiment === "Negative") {

        sentimentIcon.textContent = "😟";

        sentimentDescription.textContent =
            "The text contains a negative emotional tone.";

    } else {

        sentimentIcon.textContent = "😐";

        sentimentDescription.textContent =
            "The text appears mostly neutral or factual.";
    }


    heroScore.textContent =
        result.confidence + "%";
}


function analyze() {

    const text = textInput.value.trim();

    if (!text) {

        alert("Please enter some text to analyze.");

        textInput.focus();

        return;
    }


    const result =
        analyzeText(text, languageSelect.value);


    updateResult(result);


    result.text = text.substring(0, 150);
    result.date = new Date().toLocaleTimeString();


    analysisHistory.unshift(result);

    analysisHistory =
        analysisHistory.slice(0, 10);


    localStorage.setItem(
        "polySentHistory",
        JSON.stringify(analysisHistory)
    );


    updateDashboard();

    updateHistory();

    updateChart(result);
}


function updateDashboard() {

    const total =
        analysisHistory.length;


    totalAnalyses.textContent =
        total;


    const uniqueLanguages =
        new Set(
            analysisHistory.map(item => item.language)
        ).size;


    languagesUsed.textContent =
        uniqueLanguages;


    const positive =
        analysisHistory.filter(
            item => item.sentiment === "Positive"
        ).length;


    positiveResults.textContent =
        positive;


    if (total === 0) {

        averageConfidence.textContent =
            "0%";

    } else {

        const avg =
            analysisHistory.reduce(
                (sum, item) =>
                    sum + item.confidence,
                0
            ) / total;


        averageConfidence.textContent =
            Math.round(avg) + "%";
    }
}


function updateHistory() {

    if (analysisHistory.length === 0) {

        historyList.innerHTML = `
            <div class="empty-history">
                <div>🧠</div>
                <h3>No analyses yet</h3>
                <p>Your recent sentiment analyses will appear here.</p>
            </div>
        `;

        return;
    }


    historyList.innerHTML = "";


    analysisHistory.forEach(item => {

        const div =
            document.createElement("div");

        div.className =
            "history-item";


        const icon =
            item.sentiment === "Positive"
                ? "😊"
                : item.sentiment === "Negative"
                    ? "😟"
                    : "😐";


        div.innerHTML = `
            <div class="history-icon">${icon}</div>

            <div class="history-text">
                <strong>${escapeHTML(item.language)}</strong>
                <p>${escapeHTML(item.text)}</p>
            </div>

            <div class="history-result">
                ${item.sentiment} • ${item.confidence}%
            </div>
        `;


        historyList.appendChild(div);
    });
}


function escapeHTML(value) {

    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function updateChart(currentResult = null) {

    const ctx =
        document
            .getElementById("sentimentChart")
            .getContext("2d");


    let positive = 0;
    let negative = 0;
    let neutral = 0;


    if (currentResult) {

        positive =
            currentResult.positivePercentage;

        negative =
            currentResult.negativePercentage;

        neutral =
            currentResult.neutralPercentage;

    } else if (analysisHistory.length) {

        analysisHistory.forEach(item => {

            if (item.sentiment === "Positive") {
                positive++;
            } else if (item.sentiment === "Negative") {
                negative++;
            } else {
                neutral++;
            }

        });

    } else {

        positive = 33;
        negative = 33;
        neutral = 34;
    }


    if (chart) {
        chart.destroy();
    }


    chart = new Chart(ctx, {

        type: "doughnut",

        data: {
            labels: [
                "Positive",
                "Negative",
                "Neutral"
            ],

            datasets: [
                {
                    data: [
                        positive,
                        negative,
                        neutral
                    ],

                    backgroundColor: [
                        "#12a878",
                        "#ef5261",
                        "#f0a63c"
                    ],

                    borderWidth: 0
                }
            ]
        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            cutout: "70%",

            plugins: {

                legend: {
                    position: "bottom",
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                }

            }

        }

    });
}


textInput.addEventListener("input", () => {

    charCount.textContent =
        `${textInput.value.length} / 1000 characters`;

});


analyzeBtn.addEventListener(
    "click",
    analyze
);


clearBtn.addEventListener("click", () => {

    textInput.value = "";

    charCount.textContent =
        "0 / 1000 characters";

    sentimentText.textContent =
        "—";

    sentimentDescription.textContent =
        "Enter text to begin analysis.";

    sentimentIcon.textContent =
        "✨";

    confidenceValue.textContent =
        "0%";

    confidenceBar.style.width =
        "0%";

    positiveScore.textContent =
        "0%";

    negativeScore.textContent =
        "0%";

    neutralScore.textContent =
        "0%";

    detectedLanguage.textContent =
        "🌐 Waiting";

    emotionResult.textContent =
        "—";

    wordCount.textContent =
        "0 words";

    keywordCount.textContent =
        "0";
});


document.querySelectorAll(
    ".examples button"
).forEach(button => {

    button.addEventListener("click", () => {

        const example =
            examples[button.dataset.example];

        textInput.value =
            example.text;

        languageSelect.value =
            example.language;

        charCount.textContent =
            `${example.text.length} / 1000 characters`;

        analyze();

    });

});


themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    themeBtn.textContent =
        document.body.classList.contains("dark-mode")
            ? "☀"
            : "☾";

});


updateDashboard();

updateHistory();

updateChart();