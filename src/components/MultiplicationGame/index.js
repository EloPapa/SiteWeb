"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

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
      p >= 90 ? "Excellent ! Tu maîtrises les tables !" :
      p >= 70 ? "Bien joué, continue comme ça !" :
      p >= 50 ? "Pas mal, encore un peu de pratique !" :
      "Continue à t'entraîner, tu vas y arriver !",
    recommencer: "Recommencer ↺",
    retour: "← Retour au portfolio",
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
      p >= 90 ? "Excellent! You've mastered the tables!" :
      p >= 70 ? "Great job, keep it up!" :
      p >= 50 ? "Not bad, a little more practice!" :
      "Keep training, you'll get there!",
    recommencer: "Play again ↺",
    retour: "← Return to portfolio",
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

export default function MultiplicationGame() {
  const router = useRouter();

  const [lang, setLang] = useState("fr");
  const [total, setTotal] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [streak, setStreak] = useState(0);
  const [question, setQuestion] = useState({ a: 0, b: 0, ans: 0 });
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState({ text: "", type: "" });
  const [answered, setAnswered] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [pop, setPop] = useState(false);

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
    setPop(true);
    setTimeout(() => setPop(false), 250);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  useEffect(() => {
    newQuestion();
  }, [newQuestion]);

  const checkAnswer = useCallback(() => {
    if (answered) return;
    const val = parseInt(answer);
    if (isNaN(val)) return;

    setAnswered(true);
    setTotal((tot) => tot + 1);

    if (val === question.ans) {
      const newStreak = streak + 1;
      setCorrect((c) => c + 1);
      setStreak(newStreak);

      setFeedback({
        text: newStreak >= 5 ? t.streak(newStreak) : t.bravo,
        type: "correct",
      });

      setTimeout(newQuestion, 850);
    } else {
      setStreak(0);
      setFeedback({
        text: t.wrong(question.ans),
        type: "wrong",
      });
    }
  }, [answered, answer, question, streak, newQuestion, t]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      answered ? newQuestion() : checkAnswer();
    }
  };

  const switchLang = () => {
    setLang((l) => (l === "fr" ? "en" : "fr"));
  };

  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;

  if (showSummary) {
    return (
      <div style={styles.container}>
        {/* Bouton retour */}
        <button style={styles.btnBack} onClick={() => router.push("/")}>
          {t.retour}
        </button>

        {/* Langue */}
        <div style={styles.langRow}>
          <button style={styles.langBtn} onClick={switchLang}>
            {lang === "fr" ? "🇬🇧 EN" : "🇫🇷 FR"}
          </button>
        </div>

        <div style={styles.summaryBox}>
          <p style={styles.label}>{t.resultat}</p>
          <div style={styles.bigScore}>{correct} / {total}</div>
          <p style={styles.muted}>{t.pct(pct)}</p>
          <p style={styles.text}>{t.msg(pct)}</p>

          <button
            style={styles.btnRestart}
            onClick={() => {
              setShowSummary(false);
              setTotal(0);
              setCorrect(0);
              setStreak(0);
              newQuestion();
            }}
          >
            {t.recommencer}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Bouton retour */}
      <button style={styles.btnBack} onClick={() => router.push("/")}>
        {t.retour}
      </button>

      {/* Langue */}
      <div style={styles.langRow}>
        <button style={styles.langBtn} onClick={switchLang}>
          {lang === "fr" ? "🇬🇧 EN" : "🇫🇷 FR"}
        </button>
      </div>

      <p style={styles.label}>{t.title}</p>

      <div style={styles.statsRow}>
        {[
          { val: total, lbl: t.questions },
          { val: correct, lbl: t.correctes },
          { val: streak, lbl: t.serie, accent: true },
        ].map((s) => (
          <div key={s.lbl} style={styles.stat}>
            <div style={{
              ...styles.statVal,
              ...(s.accent ? styles.statValAccent : {}),
            }}>
              {s.val}
            </div>
            <div style={styles.statLbl}>{s.lbl}</div>
          </div>
        ))}
      </div>

      <div style={{
        ...styles.card,
        ...(feedback.type === "correct" && styles.cardCorrect),
        ...(feedback.type === "wrong" && styles.cardWrong),
        ...(pop && styles.cardPop),
      }}>
        <div style={styles.question}>
          {question.a} <span style={styles.questionAccent}>×</span> {question.b} = ?
        </div>

        <input
          ref={inputRef}
          type="number"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={answered}
          placeholder="?"
          style={{
            ...styles.input,
            ...(feedback.type === "correct" && styles.inputCorrect),
            ...(feedback.type === "wrong" && styles.inputWrong),
          }}
        />

        <div style={{
          ...styles.feedback,
          ...(feedback.type === "correct" && styles.feedbackCorrect),
          ...(feedback.type === "wrong" && styles.feedbackWrong),
        }}>
          {feedback.text}
        </div>
      </div>

      {answered && feedback.type === "wrong" && (
        <button style={styles.btnNext} onClick={newQuestion}>
          {t.suivant}
        </button>
      )}

      <button style={styles.btnStop} onClick={() => setShowSummary(true)}>
        {t.arreter}
      </button>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'DM Sans', sans-serif",
    maxWidth: 420,
    margin: "0 auto",
    padding: "1.5rem 0",
  },

  btnBack: {
    background: "none",
    border: "none",
    color: "#6c5ce7",
    fontSize: 13,
    cursor: "pointer",
    marginBottom: "0.5rem",
  },

  langRow: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "0.75rem",
  },

  langBtn: {
    background: "none",
    border: "1px solid #e8e6e0",
    borderRadius: 8,
    padding: "4px 12px",
    fontSize: 13,
    cursor: "pointer",
    color: "#555",
  },

  label: {
    fontSize: 12,
    fontFamily: "monospace",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#888",
    marginBottom: "1.5rem",
  },

  statsRow: {
    display: "flex",
    gap: "0.75rem",
    marginBottom: "1.5rem",
  },

  stat: {
    flex: 1,
    background: "#f5f4f2",
    borderRadius: 10,
    padding: "0.65rem",
  },

  statVal: {
    fontFamily: "monospace",
    fontSize: 22,
  },

  statValAccent: {
    color: "#6c5ce7",
  },

  statLbl: {
    fontSize: 11,
    color: "#888",
  },

  card: {
    background: "#fafaf8",
    border: "1px solid #e8e6e0",
    borderRadius: 16,
    padding: "2rem",
    textAlign: "center",
  },

  cardCorrect: { borderColor: "#34c48a" },
  cardWrong: { borderColor: "#f87171" },

  question: {
    fontSize: 42,
    marginBottom: "1rem",
  },

  input: {
    fontSize: 24,
    padding: "0.5rem",
    textAlign: "center",
  },

  feedback: {
    marginTop: "1rem",
    minHeight: 24,
  },

  feedbackCorrect: { color: "green" },
  feedbackWrong: { color: "red" },

  btnNext: {
    marginTop: "1rem",
    width: "100%",
  },

  btnStop: {
    marginTop: "0.5rem",
    width: "100%",
  },

  summaryBox: {
    textAlign: "center",
  },

  bigScore: {
    fontSize: 60,
    color: "#6c5ce7",
  },

  muted: {
    color: "#888",
  },

  text: {
    marginBottom: "1.5rem",
  },

  btnRestart: {
    padding: "0.75rem 1.5rem",
  },
};