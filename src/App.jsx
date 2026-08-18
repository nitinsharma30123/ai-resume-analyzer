import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import "./App.css";

pdfjsLib.GlobalWorkerOptions.workerSrc =
  `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

const SKILL_ALIASES = {
  React: ["react", "react.js", "reactjs"],
  JavaScript: ["javascript", "js"],
  TypeScript: ["typescript", "ts"],
  HTML: ["html", "html5"],
  CSS: ["css", "css3"],
  "Node.js": ["node", "node.js", "nodejs"],
  Express: ["express", "express.js"],
  Python: ["python"],
  Java: ["java"],
  "C++": ["c++", "cpp"],
  SQL: ["sql"],
  MySQL: ["mysql"],
  MongoDB: ["mongodb", "mongo db"],
  AWS: ["aws", "amazon web services"],
  Azure: ["azure", "microsoft azure"],
  Docker: ["docker"],
  Kubernetes: ["kubernetes", "k8s"],
  Git: ["git"],
  GitHub: ["github", "git hub"],
  "REST API": [
    "rest api",
    "rest apis",
    "restful api",
    "restful apis",
  ],
  "Machine Learning": [
    "machine learning",
    "machine-learning",
  ],
  "Artificial Intelligence": [
    "artificial intelligence",
  ],
  Figma: ["figma"],
  "Problem Solving": [
    "problem solving",
    "problem-solving",
  ],
  Agile: ["agile"],
  Scrum: ["scrum"],
  Linux: ["linux"],
  "CI/CD": [
    "ci/cd",
    "continuous integration",
    "continuous deployment",
  ],
};

function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()[\]]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function findSkills(text) {
  const normalizedText = normalizeText(text);
  const detectedSkills = [];

  for (const [skill, aliases] of Object.entries(SKILL_ALIASES)) {
    const found = aliases.some((alias) => {
      const normalizedAlias = normalizeText(alias);
      return normalizedText.includes(normalizedAlias);
    });

    if (found) {
      detectedSkills.push(skill);
    }
  }

  return detectedSkills;
}

async function extractPdfText(file) {
  const arrayBuffer = await file.arrayBuffer();

  const pdf = await pdfjsLib.getDocument({
    data: arrayBuffer,
  }).promise;

  let text = "";

  for (
    let pageNumber = 1;
    pageNumber <= pdf.numPages;
    pageNumber++
  ) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();

    const pageText = content.items
      .map((item) => item.str)
      .join(" ");

    text += pageText + " ";
  }

  return text;
}

function App() {
  const [resume, setResume] = useState(null);
  const [job, setJob] = useState("");

  const [loading, setLoading] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const [score, setScore] = useState(0);
  const [matchedSkills, setMatchedSkills] = useState([]);
  const [missingSkills, setMissingSkills] = useState([]);

  const analyzeResume = async () => {
    if (!resume) {
      alert("Please upload your resume first.");
      return;
    }

    if (!job.trim()) {
      alert("Please enter a job description.");
      return;
    }

    if (resume.type !== "application/pdf") {
      alert("Please upload a PDF resume.");
      return;
    }

    setLoading(true);
    setAnalyzed(false);

    try {
      const resumeText = await extractPdfText(resume);

      const resumeSkills = findSkills(resumeText);
      const jobSkills = findSkills(job);

      const uniqueJobSkills = [...new Set(jobSkills)];

      if (uniqueJobSkills.length === 0) {
        alert(
          "No recognized technical skills were found in the job description."
        );

        setLoading(false);
        return;
      }

      const matched = uniqueJobSkills.filter((skill) =>
        resumeSkills.includes(skill)
      );

      const missing = uniqueJobSkills.filter(
        (skill) => !resumeSkills.includes(skill)
      );

      const calculatedScore = Math.round(
        (matched.length / uniqueJobSkills.length) * 100
      );

      setScore(calculatedScore);
      setMatchedSkills(matched);
      setMissingSkills(missing);
      setAnalyzed(true);
    } catch (error) {
      console.error(error);

      alert(
        "Could not read the PDF. Please upload a valid text-based PDF resume."
      );
    }

    setLoading(false);
  };

  const getSuggestions = () => {
    const suggestions = [];

    missingSkills.forEach((skill) => {
      switch (skill) {
        case "AWS":
          suggestions.push(
            "Highlight AWS services and cloud deployment experience in your projects."
          );
          break;

        case "Docker":
          suggestions.push(
            "Mention Docker-based projects or containerized applications."
          );
          break;

        case "Kubernetes":
          suggestions.push(
            "Add Kubernetes projects or practical container orchestration experience."
          );
          break;

        case "Git":
          suggestions.push(
            "Mention Git-based collaboration and version control workflows."
          );
          break;

        case "GitHub":
          suggestions.push(
            "Add GitHub repositories or open-source contributions to your projects."
          );
          break;

        case "REST API":
          suggestions.push(
            "Add REST API development or integration experience to your projects."
          );
          break;

        case "React":
          suggestions.push(
            "Highlight React projects and the components or features you built."
          );
          break;

        case "JavaScript":
          suggestions.push(
            "Clearly mention JavaScript technologies and features used in your projects."
          );
          break;

        case "TypeScript":
          suggestions.push(
            "Consider adding TypeScript experience if you have used it in projects."
          );
          break;

        case "Node.js":
          suggestions.push(
            "Mention Node.js backend development or API projects."
          );
          break;

        case "Express":
          suggestions.push(
            "Highlight Express.js experience when describing backend projects."
          );
          break;

        case "MongoDB":
          suggestions.push(
            "Mention MongoDB database usage and the projects where you used it."
          );
          break;

        case "SQL":
          suggestions.push(
            "Add SQL database queries, schema design, or database projects."
          );
          break;

        case "Agile":
          suggestions.push(
            "Mention Agile development practices, sprint planning, or iterative development experience."
          );
          break;

        case "Scrum":
          suggestions.push(
            "Mention Scrum ceremonies or team-based development experience if applicable."
          );
          break;

        case "CI/CD":
          suggestions.push(
            "Add CI/CD pipeline experience using tools such as GitHub Actions, Jenkins, or similar platforms."
          );
          break;

        case "Linux":
          suggestions.push(
            "Highlight Linux administration, deployment, or development experience."
          );
          break;

        case "Problem Solving":
          suggestions.push(
            "Include measurable examples that demonstrate your problem-solving ability."
          );
          break;

        case "Machine Learning":
          suggestions.push(
            "Highlight machine learning projects, models, or practical applications."
          );
          break;

        case "Artificial Intelligence":
          suggestions.push(
            "Mention practical AI projects and the technologies used to build them."
          );
          break;

        default:
          suggestions.push(
            `Consider adding ${skill} experience if it is relevant to your background.`
          );
      }
    });

    if (suggestions.length === 0) {
      suggestions.push(
        "Your resume covers all recognized skills. Focus on measurable project results and clear achievements."
      );
    }

    return suggestions.slice(0, 4);
  };

  const scrollToAnalyzer = () => {
    document
      .getElementById("analyzer")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <div className="app">

      <nav className="navbar">

        <div className="logo">
          Resume<span>AI</span>
        </div>

        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#analyzer">Analyzer</a>
          <a href="#how">How it works</a>
        </div>

        <button
          className="nav-btn"
          onClick={scrollToAnalyzer}
        >
          Try Analyzer
        </button>

      </nav>


      <main>

        <section className="hero">

          <div className="hero-content">

            <div className="badge">
              ✦ AI-powered resume analysis
            </div>

            <h1>
              Turn your resume into a
              <span> better opportunity.</span>
            </h1>

            <p>
              Analyze your resume against any job description,
              discover missing skills, and improve your chances
              of getting shortlisted.
            </p>

            <button
              className="primary-btn"
              onClick={scrollToAnalyzer}
            >
              Analyze My Resume →
            </button>

          </div>


          <div className="hero-card">

            <div className="score-ring">
              <strong>82</strong>
              <small>/100</small>
            </div>

            <h3>Resume Score</h3>

            <p>Example resume analysis</p>

            <div className="mini-stats">

              <div>
                <strong>18</strong>
                <span>Matched Skills</span>
              </div>

              <div>
                <strong>4</strong>
                <span>Missing Skills</span>
              </div>

            </div>

          </div>

        </section>


        <section
          id="features"
          className="features"
        >

          <div className="section-heading">

            <span>FEATURES</span>

            <h2>
              Know exactly what to improve.
            </h2>

          </div>


          <div className="feature-grid">

            <div className="feature-card">

              <div className="icon">
                ◎
              </div>

              <h3>ATS Score</h3>

              <p>
                Get a clear score showing how well
                your resume matches the target role.
              </p>

            </div>


            <div className="feature-card">

              <div className="icon">
                ⌁
              </div>

              <h3>Skill Matching</h3>

              <p>
                Identify the skills already present
                and discover important missing skills.
              </p>

            </div>


            <div className="feature-card">

              <div className="icon">
                ✦
              </div>

              <h3>Smart Suggestions</h3>

              <p>
                Get practical suggestions to make
                your resume stronger and more relevant.
              </p>

            </div>

          </div>

        </section>


        <section
          id="analyzer"
          className="analyzer"
        >

          <div className="section-heading">

            <span>RESUME ANALYZER</span>

            <h2>
              See how your resume performs.
            </h2>

          </div>


          <div className="analyzer-box">

            <div className="upload-area">

              <div className="upload-icon">
                ↑
              </div>

              <h3>
                {resume
                  ? resume.name
                  : "Upload your resume"}
              </h3>

              <p>
                PDF files supported
              </p>

              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={(event) => {

                  const file =
                    event.target.files[0];

                  setResume(file);
                  setAnalyzed(false);
                  setScore(0);
                  setMatchedSkills([]);
                  setMissingSkills([]);

                }}
              />

            </div>


            <div className="job-area">

              <label>
                JOB DESCRIPTION
              </label>

              <textarea
                placeholder="Paste the job description here..."
                value={job}
                onChange={(event) =>
                  setJob(event.target.value)
                }
              />

              <button
                className="primary-btn analyze-btn"
                onClick={analyzeResume}
                disabled={loading}
              >
                {loading
                  ? "Analyzing..."
                  : "Analyze Resume →"}
              </button>

            </div>

          </div>


          {analyzed && (

            <div className="result">

              <div className="result-score">

                <span>
                  Overall Match
                </span>

                <strong>
                  {score}%
                </strong>

                <div className="progress-track">

                  <div
                    className="progress-fill"
                    style={{
                      width: `${score}%`,
                    }}
                  />

                </div>

              </div>


              <div className="result-info">

                <h3>

                  {score >= 80
                    ? "Excellent match for this role."
                    : score >= 50
                    ? "Good match — but there's room to improve."
                    : "Your resume needs some improvement for this role."}

                </h3>


                {matchedSkills.length > 0 && (

                  <div className="skills-section">

                    <h4>
                      ✓ Matched Skills
                    </h4>

                    {matchedSkills.map((skill) => (

                      <div
                        className="skill-row"
                        key={skill}
                      >

                        <span>
                          {skill}
                        </span>

                        <b>
                          Matched
                        </b>

                      </div>

                    ))}

                  </div>

                )}


                {missingSkills.length > 0 && (

                  <div className="skills-section">

                    <h4>
                      ✕ Missing Skills
                    </h4>

                    {missingSkills.map((skill) => (

                      <div
                        className="skill-row missing"
                        key={skill}
                      >

                        <span>
                          {skill}
                        </span>

                        <b>
                          Missing
                        </b>

                      </div>

                    ))}

                  </div>

                )}


                <div className="suggestions">

                  <h4>
                    ✦ Recommended Improvements
                  </h4>

                  {getSuggestions().map(
                    (suggestion, index) => (

                      <div
                        className="suggestion"
                        key={index}
                      >

                        <span>
                          →
                        </span>

                        <p>
                          {suggestion}
                        </p>

                      </div>

                    )
                  )}

                </div>

              </div>

            </div>

          )}

        </section>


        <section
          id="how"
          className="how"
        >

          <div className="section-heading">

            <span>
              HOW IT WORKS
            </span>

            <h2>
              Three steps. One better resume.
            </h2>

          </div>


          <div className="steps">

            <div className="step">

              <strong>01</strong>

              <h3>Upload</h3>

              <p>
                Upload your existing PDF resume.
              </p>

            </div>


            <div className="step">

              <strong>02</strong>

              <h3>Compare</h3>

              <p>
                Paste the job description you're targeting.
              </p>

            </div>


            <div className="step">

              <strong>03</strong>

              <h3>Improve</h3>

              <p>
                Review your score and missing skills.
              </p>

            </div>

          </div>

        </section>

      </main>


      <footer>

        <div className="logo">
          Resume<span>AI</span>
        </div>

        <p>
          Build a resume that gets noticed.
        </p>

      </footer>

    </div>
  );
}

export default App;