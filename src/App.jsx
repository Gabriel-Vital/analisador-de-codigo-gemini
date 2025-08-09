import { useState } from "react";
import { analyzeCode } from "./services/gemini";
import "./App.css";

function App() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const handleAnalyze = async () => {
    if (!code.trim()) return;

    setLoading(true);
    setError("")
    setResult("")

    try {
      const analysis = await analyzeCode(code);
      setResult(analysis);
    } catch (error) {
      console.log(error);
      setError(error.message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="container">
        <h1 className="title">Analisador de código com I.A</h1>
        <p className="subtitle">Cole o seu código e descubra como melhora-lo</p>
        <div className="input-group">
          <textarea
            className="code-textarea"
            placeholder="Cole seu código aqui (JavaScript, HTML, CSS, etc)"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          ></textarea>
        </div>
        <button
          className="analyze-button"
          onClick={handleAnalyze}
          disabled={!code.trim() || loading}
        >
          {loading ? "Analisando o código..." : "Analisar código"}
        </button>
        {error && <div className="error-message">deu erro</div>}

        {result && (
          <div className="result-container">
            <h2 className="result-title">Análise do código</h2>
            <div className="result-content">{result}</div>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
