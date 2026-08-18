\# DECISIONS.md



\## AI Resume Analyzer — Technical Decisions



\### 1. Project Approach



I chose a client-side React/Vite implementation so the application can provide an interactive resume analysis experience without requiring a separate backend service. This keeps the deployment simple and makes the application easy to run and demonstrate.



\### 2. Resume Processing



The application uses `pdfjs-dist` to extract text from uploaded PDF resumes directly in the browser. This avoids sending the user's resume to an external server and keeps the basic analysis flow lightweight.



\*\*Trade-off:\*\* Browser-side PDF extraction is simple and privacy-friendly, but scanned/image-only PDFs may require OCR in a future version.



\### 3. Skill Matching



The analyzer uses a predefined skill dictionary with aliases such as `React`, `React.js`, `ReactJS`, and `REST API` variations. Skills detected in the job description are compared against skills detected in the resume.



The match score is calculated from the percentage of recognized job-description skills that are also present in the resume.



\*\*Trade-off:\*\* This approach is deterministic, fast, and easy to explain, but it does not understand deeper semantic relationships between skills or context.



\### 4. Missing Skills and Recommendations



Missing skills are displayed separately from matched skills. The application then generates targeted recommendations based on the missing skills, for example suggesting Agile experience or CI/CD pipeline experience.



This was chosen to make the result actionable rather than only showing a numerical score.



\### 5. UI and Responsiveness



The interface uses a dark, modern visual design with responsive CSS. Mobile layouts were specifically tested at a 390px viewport.



Interactive elements include hover states, loading feedback, result animation, and an animated score progress indicator.



\### 6. Deployment



The application is deployed as a static React/Vite site on Netlify. This fits the client-side architecture and avoids unnecessary backend infrastructure.



The project is also maintained in a public GitHub repository for version control and evaluation.



\### 7. Future Improvements



If more development time were available, the next improvements would be:



\- Semantic AI/LLM-based skill and requirement matching

\- OCR support for scanned resumes

\- More context-aware skill detection

\- ATS keyword and formatting analysis

\- Better weighting of important job requirements

\- User accounts and saved analyses

\- Automated testing and CI/CD

