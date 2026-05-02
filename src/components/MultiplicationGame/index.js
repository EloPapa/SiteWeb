"use client";

import { useState, useRef, useCallback, useEffect } from "react";

function randQ(lastA, lastB) {
  let a, b;
  do {
    a = Math.ceil(Math.random() * 12);
    b = Math.ceil(Math.random() * 12);
  } while (a === lastA && b === lastB);
  return { a, b, ans: a * b };
}

export default function MultiplicationGame() {
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

  useEffect(() => { newQuestion(); }, [newQuestion]);

  const checkAnswer = useCallback(() => {
    if (answered) return;
    const val = parseInt(answer);
    if (isNaN(val)) return;
    setAnswered(true);
    setTotal(t => t + 1);

    if (val === question.ans) {
      const newStreak = streak + 1;
      setCorrect(c => c + 1);
      setStreak(newStreak);
      setFeedback({
        text: newStreak >= 5 ? `🔥 ${newStreak} de suite !` : "✓ Bravo !",
        type: "correct",
      });
      setTimeout(newQuestion, 850);
    } else {
      setStreak(0);
      setFeedback({ text: `✗ La réponse est ${question.ans}`, type: "wrong" });
    }
  }, [answered, answer, question, streak, newQuestion]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      answered ? newQuestion() : checkAnswer();
    }
  };

  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
  const summaryMsg =
    pct >= 90 ? "Excellent ! Tu maîtrises les tables !" :
    pct >= 70 ? "Bien joué, continue comme ça !" :
    pct >= 50 ? "Pas mal, encore un peu de pratique !" :
    "Continue à t'entraîner, tu vas y arriver !";

  if (showSummary) {
    return (
      <div style={styles.container}>
        <div style={styles.summaryBox}>
          <p style={styles.label}>Résultat</p>
          <div style={styles.bigScore}>{correct} / {total}</div>
          <p style={{ ...styles.muted, marginBottom: "0.25rem" }}>{pct}% de bonnes réponses</p>
          <p style={{ ...styles.text, marginBottom: "2rem" }}>{summaryMsg}</p>
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
            Recommencer ↺
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <p style={styles.label}>Tables de multiplication</p>

      <div style={styles.statsRow}>
        {[
          { val: total, lbl: "questions" },
          { val: correct, lbl: "correctes" },
          { val: streak, lbl: "série", accent: true },
        ].map(s => (
          <div key={s.lbl} style={styles.stat}>
            <div style={{ ...styles.statVal, ...(s.accent ? styles.statValAccent : {}) }}>{s.val}</div>
            <div style={styles.statLbl}>{s.lbl}</div>
          </div>
        ))}
      </div>

      <div style={{
        ...styles.card,
        ...(feedback.type === "correct" ? styles.cardCorrect : {}),
        ...(feedback.type === "wrong" ? styles.cardWrong : {}),
        ...(pop ? styles.cardPop : {}),
      }}>
        <div style={styles.question}>
          {question.a} <span style={styles.questionAccent}>×</span> {question.b} = ?
        </div>
        <input
          ref={inputRef}
          type="number"
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={answered}
          placeholder="?"
          style={{
            ...styles.input,
            ...(feedback.type === "correct" ? styles.inputCorrect : {}),
            ...(feedback.type === "wrong" ? styles.inputWrong : {}),
          }}
        />
        <div style={{
          ...styles.feedback,
          ...(feedback.type === "correct" ? styles.feedbackCorrect : {}),
          ...(feedback.type === "wrong" ? styles.feedbackWrong : {}),
        }}>
          {feedback.text}
        </div>
      </div>

      {answered && feedback.type === "wrong" && (
        <button style={styles.btnNext} onClick={newQuestion}>Suivant →</button>
      )}

      <button style={styles.btnStop} onClick={() => setShowSummary(true)}>
        Arrêter et voir mon score
      </button>
    </div>
  );
}

const styles = {
  container: { fontFamily: "'DM Sans', sans-serif", maxWidth: 420, margin: "0 auto", padding: "1.5rem 0" },
  label: { fontSize: 12, fontFamily: "monospace", letterSpacing: "0.12em", textTransform: "uppercase", color: "#888", marginBottom: "1.5rem" },
  statsRow: { display: "flex", gap: "0.75rem", marginBottom: "1.5rem" },
  stat: { flex: 1, background: "#f5f4f2", borderRadius: 10, padding: "0.65rem 0.75rem" },
  statVal: { fontFamily: "monospace", fontSize: 22, fontWeight: 500, color: "#111" },
  statValAccent: { color: "#6c5ce7" },
  statLbl: { fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: "0.07em", marginTop: 2 },
  card: { background: "#fafaf8", border: "1px solid #e8e6e0", borderRadius: 16, padding: "2.5rem 2rem", textAlign: "center", marginBottom: "0.75rem", transition: "border-color 0.2s, background 0.2s" },
  cardCorrect: { borderColor: "#34c48a", background: "#f0fdf6" },
  cardWrong: { borderColor: "#f87171", background: "#fff5f5" },
  cardPop: { transform: "scale(1.02)" },
  question: { fontFamily: "monospace", fontSize: 52, fontWeight: 500, letterSpacing: -2, color: "#111", marginBottom: "1.5rem" },
  questionAccent: { color: "#6c5ce7" },
  input: { width: 140, background: "#fff", borderWidth: "1px", borderStyle: "solid", borderColor: "#d0cec8", borderRadius: 10, color: "#111", fontFamily: "monospace", fontSize: 28, textAlign: "center", padding: "0.5rem", outline: "none" },
  inputCorrect: { borderColor: "#34c48a" },
  inputWrong: { borderColor: "#f87171" },
  feedback: { minHeight: 28, fontSize: 15, fontWeight: 500, marginTop: "1rem", color: "transparent" },
  feedbackCorrect: { color: "#0d9e6a" },
  feedbackWrong: { color: "#e53e3e" },
  btnNext: { display: "block", width: "100%", padding: "0.75rem", background: "#fff", border: "1px solid #d0cec8", borderRadius: 10, color: "#111", fontSize: 15, cursor: "pointer", marginBottom: "0.75rem" },
  btnStop: { display: "block", width: "100%", padding: "0.6rem", background: "none", border: "1px solid #e8e6e0", borderRadius: 10, color: "#888", fontSize: 13, cursor: "pointer" },
  summaryBox: { textAlign: "center", padding: "2rem 0" },
  bigScore: { fontFamily: "monospace", fontSize: 72, fontWeight: 500, color: "#6c5ce7", lineHeight: 1, margin: "1rem 0 0.5rem" },
  muted: { fontSize: 13, fontFamily: "monospace", color: "#888" },
  text: { fontSize: 16, color: "#333" },
  btnRestart: { padding: "0.75rem 2rem", background: "#f0eeff", border: "1px solid #b8a9f8", borderRadius: 10, color: "#6c5ce7", fontSize: 15, cursor: "pointer" },
};