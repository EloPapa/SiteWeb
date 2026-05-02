"use client";

import { useState, useRef, useCallback, useEffect } from "react";

const TRANSLATIONS = {
  fr: {
    title: "Tables de multiplication",
    questions: "questions",
    correctes: "correctes",
    serie: "série",
    bravo: "✓ Bravo !",
    streak: (n) => `🔥 ${n} de suite !`,
    wrong: (ans) => `✗ La réponse est ${ans}`,
    suivant: "Suivant →",
    arreter: "Arrêter et voir mon score",
    resultat: "Résultat",
    pct: (p) => `${p}% de bonnes réponses`,
    msg: (p) =>
      p >= 90 ? "Excellent !" :
      p >= 70 ? "Bien joué !" :
      p >= 50 ? "Pas mal !" :
      "Continue à t'entraîner !",
    recommencer: "Recommencer ↺",
  },
  en: {
    title: "Multiplication tables",
    questions: "questions",
    correctes: "correct",
    serie: "streak",
    bravo: "✓ Well done!",
    streak: (n) => `🔥 ${n} in a row!`,
    wrong: (ans) => `✗ The answer is ${ans}`,
    suivant: "Next →",
    arreter: "Stop and see my score",
    resultat: "Result",
    pct: (p) => `${p}% correct answers`,
    msg: (p) =>
      p >= 90 ? "Excellent!" :
      p >= 70 ? "Great job!" :
      p >= 50 ? "Not bad!" :
      "Keep training!",
    recommencer: "Play again ↺",
  },
};

function randQ(lastA, lastB) {
  let a, b;
  do {
    a = Math.ceil(Math.random() * 12);
    b = Math.ceil(Math.random() * 12);
  } while (a === lastA && b === lastB);
  return { a, b, ans: a * b };
}

export default function MultiplicationGame({ lang, setLang }) {
  const [total, setTotal] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [streak, setStreak] = useState(0);
  const [question, setQuestion] = useState({ a: 0, b: 0, ans: 0 });
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState({ text: "", type: "" });
  const [answered, setAnswered] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const lastRef = useRef({ a: -1, b: -1 });
  const inputRef = useRef(null);

  const t = TRANSLATIONS[lang];

  const newQuestion = useCallback(() => {
    const q = randQ(lastRef.current.a, lastRef.current.b);
    lastRef.current = { a: q.a, b: q.b };
    setQuestion(q);
    setAnswer("");
    setFeedback({ text: "", type: "" });
    setAnswered(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  useEffect(() => {
    newQuestion();
  }, [newQuestion]);

  const checkAnswer = () => {
    if (answered) return;
    const val = parseInt(answer);
    if (isNaN(val)) return;

    setAnswered(true);
    setTotal((t) => t + 1);

    if (val === question.ans) {
      const newStreak = streak + 1;
      setCorrect((c) => c + 1);
      setStreak(newStreak);

      setFeedback({
        text: newStreak >= 5 ? t.streak(newStreak) : t.bravo,
        type: "correct",
      });

      setTimeout(newQuestion, 800);
    } else {
      setStreak(0);
      setFeedback({
        text: t.wrong(question.ans),
        type: "wrong",
      });
    }
  };

  const switchLang = () => {
    setLang((l) => (l === "fr" ? "en" : "fr"));
  };

  const pct = total ? Math.round((correct / total) * 100) : 0;

  if (showSummary) {
    return (
      <div style={{ textAlign: "center" }}>
        <button onClick={switchLang}>
          {lang === "fr" ? "🇬🇧 EN" : "🇫🇷 FR"}
        </button>

        <h2>{t.resultat}</h2>
        <h1>{correct} / {total}</h1>
        <p>{t.pct(pct)}</p>
        <p>{t.msg(pct)}</p>

        <button onClick={() => {
          setShowSummary(false);
          setTotal(0);
          setCorrect(0);
          setStreak(0);
          newQuestion();
        }}>
          {t.recommencer}
        </button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center" }}>
      <button onClick={switchLang}>
        {lang === "fr" ? "🇬🇧 EN" : "🇫🇷 FR"}
      </button>

      <h2>{t.title}</h2>

      <p>
        {total} {t.questions} | {correct} {t.correctes} | 🔥 {streak} {t.serie}
      </p>

      <h1>{question.a} × {question.b} = ?</h1>

      <input
        ref={inputRef}
        type="number"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && checkAnswer()}
        disabled={answered}
      />

      <p>{feedback.text}</p>

      {answered && feedback.type === "wrong" && (
        <button onClick={newQuestion}>{t.suivant}</button>
      )}

      <button onClick={() => setShowSummary(true)}>
        {t.arreter}
      </button>
    </div>
  );
}