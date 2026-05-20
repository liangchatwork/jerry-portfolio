import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageBackground from "../components/PageBackground";

const RESUME_LOCKED = true;

const education = [
  {
    degree: "Master of Computer Science and Information Engineering",
    degreeZh: "資訊工程學系碩士",
    school: "National Cheng-Kung University (NCKU)",
    schoolZh: "國立成功大學",
    period: "2023.09 — 2025.06",
    detail: "Overall GPA: 4.25 / 4.3",
  },
  {
    degree: "Exchange Student in Informatics",
    degreeZh: "Informatics 交換學生",
    school: "Technical University of Munich (TUM)",
    schoolZh: "德國慕尼黑工業大學",
    period: "2025.10 — 2026.03",
    detail: "",
  },
  {
    degree: "Bachelor of Computer Science Engineering",
    degreeZh: "資訊工程學系學士",
    school: "National Sun Yat-Sen University (NSYSU)",
    schoolZh: "國立中山大學",
    period: "2019 — 2023",
    detail: "Overall GPA: 3.81 / 4.3",
  },
];

const languages = [
  {
    name: "Mandarin",
    level: "Native",
    detail: "Native speaker",
  },
  {
    name: "English",
    level: "TOEIC Listening & Reading Test: 905",
    detail: "Test Date: 2024.07.28",
  },
];

const skillGroups = [
  {
    title: "Languages",
    skills: [
      { name: "C", logo: "c", color: "A8B9CC" },
      { name: "C++", logo: "cplusplus", color: "00599C" },
      { name: "C#", logo: "csharp", color: "512BD4" },
      { name: "Python", logo: "python", color: "3776AB" },
      { name: "JavaScript", logo: "javascript", color: "F7DF1E" },
      { name: "TypeScript", logo: "typescript", color: "3178C6" },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "HTML", logo: "html5", color: "E34F26" },
      { name: "CSS", logo: "css", color: "663399" },
      { name: "React", logo: "react", color: "61DAFB" },
    ],
  },
  {
    title: "Backend / Frameworks",
    skills: [
      { name: "Flask", logo: "flask", color: "000000" },
      { name: "FastAPI", logo: "fastapi", color: "009688" },
      { name: "Django", logo: "django", color: "092E20" },
      { name: "REST APIs", logo: "postman", color: "FF6C37" },
    ],
  },
  {
    title: "AI / Data Science",
    skills: [
      { name: "PyTorch", logo: "pytorch", color: "EE4C2C" },
      { name: "scikit-learn", logo: "scikitlearn", color: "F7931E" },
      { name: "NumPy", logo: "numpy", color: "013243" },
      { name: "Pandas", logo: "pandas", color: "150458" },
    ],
  },
  {
    title: "Cybersecurity / Cryptography",
    skills: [
      { name: "Cybersecurity", logo: "hackthebox", color: "9FEF00" },
      { name: "Network Security", logo: "wireshark", color: "1679A7" },
      { name: "Cryptography", logo: "letsencrypt", color: "003A70" },
      { name: "Differential Privacy", logo: "databricks", color: "FF3621" },
      { name: "Homomorphic Encryption", logo: "gnupg", color: "0093DD" },
    ],
  },
  {
    title: "Databases / Systems",
    skills: [
      { name: "PostgreSQL", logo: "postgresql", color: "4169E1" },
      { name: "MS Access", logo: "microsoftaccess", color: "A4373A" },
      { name: "Redis", logo: "redis", color: "FF4438" },
      { name: "Linux", logo: "linux", color: "FCC624" },
    ],
  },
  {
    title: "DevOps / Tools",
    skills: [
      { name: "Git", logo: "git", color: "F05032" },
      { name: "GitHub", logo: "github", color: "181717" },
      { name: "Docker", logo: "docker", color: "2496ED" },
      { name: "VS Code", logo: "visualstudiocode", color: "007ACC" },
      { name: "GitHub Pages", logo: "githubpages", color: "222222" },
    ],
  },
];

const participatedProjects = [
  {
    company: "Billows Tech",
    title:
      "AI Threat Intelligence Smart Defense and Digital Twin Attack Trajectory Prediction Platform",
    period: "2023.09 — 2024.12",
    description: [
      "Utilized AI models, including BERT, to analyze cyber threat intelligence CTI texts and classify them within the Cyber Kill Chain CKC lifecycle.",
      "Employed LLMs to process CTI from network IP nodes, predict attacker behavior, and generate attack trajectories within network topology.",
      "Assisted vulnerability repair by aligning attack trajectory insights with CKC phase analysis.",
    ],
  },
  {
    company: "AMASTek",
    title: "Cloud Service Backend Development",
    period: "2024.09 — 2024.10",
    description: [
      "Set up an experimental environment for collecting Channel State Information CSI data.",
      "Developed backend service components for data collection, processing, and experimental workflow support.",
      "Supported model development for in-vehicle and out-of-vehicle human recognition with anomaly detection alerts.",
    ],
  },
  {
    company: "LITEON Tech",
    title:
      "R&D Project on Physiological Signal Analysis and Disease Onset Prediction",
    period: "2024.10 — 2025.02",
    description: [
      "Conducted R&D work on the correlation between physiological signals and disease-related patterns.",
      "Integrated physiological signal features into AI-based predictive models for disease onset analysis.",
      "Supported exploratory research workflows including data understanding, feature analysis, and model evaluation.",
    ],
  },
];

const researchExperiences = [
  {
    title:
      "Detection & Mitigation of DDoS Attacks in IoT via SDN Network Using Machine Learning",
    period: "2021.09 — 2022.12",
    description: [
      "Applied Software-Defined Networking SDN architecture for flexible network deployment and packet extraction.",
      "Integrated machine learning models to analyze suspicious network packets.",
      "Applied detection results to the SDN controller to mitigate DDoS attacks on IoT devices.",
    ],
  },
  {
    title:
      "A Query-Flooding-Resistant Microaggregation Method Based on Utility-Enhanced Differential Privacy for Data Publishing Services",
    period: "2024.09 — 2025.08",
    description: [
      "Proposed a privacy-preserving data publishing method for machine learning services, addressing the conflict between data security and data utility.",
      "Designed a query-flooding-resistant microaggregation mechanism to defend against advanced re-identification attacks.",
      "Enhanced data utility by optimizing sensitivity, privacy budget allocation, and noise injection under differential privacy.",
      "Demonstrated improved machine learning accuracy under privacy protection, with experimental results showing up to 25.58% and 41.29% accuracy improvement compared with existing methods.",
    ],
  },
];

const honors = [
  {
    title: "IICM Master Thesis Award - Outstanding",
    issuer: "Institute of Information & Computing Machinery (IICM), Taiwan",
    period: "2026.05",
    description: [
      "Submitted the master's thesis “A Query-Flooding-Resistant Microaggregation Method Based on Utility-Enhanced Differential Privacy for Data Publishing Services”.",
      "Received the “Outstanding” award from the IICM Master's Thesis Award.",
    ],
  },
  {
    title: "NSYSU CSE Project Competition - Honorable Mention",
    issuer:
      "Department of Computer Science and Engineering (CSE), National Sun Yat-sen University (NSYSU)",
    period: "2022.11",
    description: [
      "Participated with the project “Detection & Mitigation of DDoS Attack in IoT via SDN Network Using Machine Learning”.",
      "Received Honorable Mention in the NSYSU CSE Project Competition.",
    ],
  },
  {
    title:
      "Collegiate Programming Examination (CPE) of Association of Taiwan Computer Programming Contest",
    issuer: "Association of Taiwan Computer Programming Contest",
    period: "2020.12",
    description: [
      "Solved 3 out of 7 problems using C/C++.",
      "Ranked 109 out of 2241 participants, top 4.9%.",
      "Level: Advanced.",
    ],
  },
];

type ResumeSection =
  | "education"
  | "language"
  | "skills"
  | "projects"
  | "research"
  | "honors";

const sectionTabs: { key: ResumeSection; label: string }[] = [
  { key: "education", label: "Education" },
  { key: "language", label: "Language" },
  { key: "skills", label: "Skills" },
  { key: "projects", label: "Projects" },
  { key: "research", label: "Research" },
  { key: "honors", label: "Honors" },
];

function skillBadge(skill: { name: string; logo: string; color: string }) {
  return `https://img.shields.io/badge/${encodeURIComponent(
    skill.name
  )}-${skill.color}?style=for-the-badge&logo=${skill.logo}&logoColor=white`;
}

export default function Resume() {
  const [activeSection, setActiveSection] =
    useState<ResumeSection>("education");
  const [isFading, setIsFading] = useState(false);
  const [showResumePreview, setShowResumePreview] = useState(true);

  const shouldBlurResume = RESUME_LOCKED && !showResumePreview;

  useEffect(() => {
    if (!RESUME_LOCKED) return;

    const timer = window.setTimeout(() => {
      setShowResumePreview(false);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, []);

  function handleSectionChange(section: ResumeSection) {
    if (section === activeSection) return;

    setIsFading(true);

    window.setTimeout(() => {
      setActiveSection(section);
      setIsFading(false);
    }, 180);
  }

  return (
    <main className="relative min-h-screen bg-transparent text-stone-900">
      <PageBackground />

      <section className="relative z-10 px-4 py-4 sm:px-6 md:px-10 md:py-8">
        <Header />

        {/* Page Title */}
        <section className="mx-auto max-w-7xl pt-12 pb-10 md:pt-24 md:pb-12">
          <p className="animate-fade-up text-[11px] uppercase tracking-[0.42em] text-stone-600 md:text-xs md:tracking-[0.45em]">
            RESUME / 履歷
          </p>

          <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,680px)_520px] lg:items-stretch lg:gap-14 xl:grid-cols-[minmax(0,700px)_560px]">
            {/* Left: Name + Brief Intro */}
            <div className="order-2 flex flex-col lg:order-1">
              <h1 className="animate-fade-up delay-100 text-4xl font-black uppercase leading-[0.9] tracking-[-0.06em] text-stone-950 drop-shadow-sm sm:text-5xl md:text-7xl">
                Chen-Hsun
                <br />
                Jerry
                <br />
                Liang
              </h1>

              {/* Brief Intro */}
              <div className="relative mt-8 max-w-2xl lg:mt-auto">
                <ul
                  className={`animate-fade-up delay-200 space-y-5 rounded-[1.5rem] border border-white/65 bg-white/55 p-5 text-[15px] leading-7 tracking-wide text-stone-800 shadow-xl backdrop-blur-xl transition-all duration-1000 ease-in-out md:space-y-6 md:p-6 md:text-[17px] md:leading-8 ${
                    shouldBlurResume
                      ? "pointer-events-none select-none blur-[8px] opacity-45"
                      : "blur-0 opacity-100"
                  }`}
                >
                  <li className="flex gap-4">
                    <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-stone-900" />
                    <div>
                      <p>
                        國立成功大學資訊工程學系碩士，ISMP 實驗室 R&amp;D、Software
                        Engineer，預計 2026 年 7 月畢業。
                      </p>
                      <p className="mt-2 text-sm italic leading-6 text-stone-600 md:text-[15px]">
                        Master's student in Computer Science and Information
                        Engineering at National Cheng Kung University, serving
                        as R&amp;D and Software Engineer at the ISMP Lab.
                        Expected to graduate in July 2026.
                      </p>
                    </div>
                  </li>

                  <li className="flex gap-4">
                    <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-stone-900" />
                    <div>
                      <p>專注於資安、密碼學、AI 應用與軟體工程。</p>
                      <p className="mt-2 text-sm italic leading-6 text-stone-600 md:text-[15px]">
                        Focused on Cybersecurity, Cryptography, AI Applications,
                        and Software Engineering.
                      </p>
                    </div>
                  </li>

                  <li className="flex gap-4">
                    <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-stone-900" />
                    <div>
                      <p>曾赴德國慕尼黑工業大學 TUM Informatics 交換。</p>
                      <p className="mt-2 text-sm italic leading-6 text-stone-600 md:text-[15px]">
                        Exchange experience in Informatics at the Technical
                        University of Munich (TUM) in Germany.
                      </p>
                    </div>
                  </li>
                </ul>

                {RESUME_LOCKED && (
                  <div
                    className={`absolute inset-0 z-20 flex items-center justify-center rounded-[1.5rem] border border-white/60 bg-white/45 px-5 text-center shadow-xl backdrop-blur-md transition-all duration-1000 ease-in-out ${
                      shouldBlurResume
                        ? "opacity-100"
                        : "pointer-events-none opacity-0"
                    }`}
                  >
                    <p className="text-sm font-semibold leading-7 tracking-[0.18em] text-stone-800 md:text-base">
                      比我更猛的比比皆是，
                      <br />
                      所以我先不自曝其短了...
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Portrait */}
            <div className="animate-image-reveal order-1 mx-auto w-full max-w-[280px] sm:max-w-[320px] lg:order-2 lg:mx-0 lg:h-full lg:max-w-none">
              <div className="aspect-[3/4] overflow-hidden rounded-[2rem] border border-white/65 bg-white/45 shadow-2xl backdrop-blur-xl lg:aspect-auto lg:h-full">
                <img
                  src={`${import.meta.env.BASE_URL}resume-profile.jpg`}
                  alt="Chen-Hsun Jerry Liang"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Resume Content */}
        <div className="relative mx-auto max-w-7xl pb-20 md:pb-32">
          <div
            className={`rounded-[1.5rem] border border-white/65 bg-white/55 p-4 shadow-xl backdrop-blur-xl transition-all duration-1000 ease-in-out md:rounded-[2rem] md:p-6 ${
              shouldBlurResume
                ? "pointer-events-none select-none blur-[9px] opacity-45"
                : "blur-0 opacity-100"
            }`}
          >
            {/* Hidden Scroll Menu */}
            <div className="scrollbar-hide -mx-4 overflow-x-auto border-y border-stone-400/40 px-4 py-4 md:mx-0 md:px-0 md:py-5">
              <div className="mx-auto flex w-fit min-w-max justify-center gap-8 md:gap-16">
                {sectionTabs.map((tab) => {
                  const active = activeSection === tab.key;

                  return (
                    <button
                      key={tab.key}
                      onClick={() => handleSectionChange(tab.key)}
                      className={`text-left text-[12px] font-semibold uppercase tracking-[0.3em] transition-all duration-200 md:text-[13px] md:tracking-[0.36em] ${
                        active
                          ? "text-stone-950"
                          : "text-stone-500 hover:text-stone-800"
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Expand Area */}
            <div
              className={`mt-8 transition-all duration-200 ease-out md:mt-10 ${
                isFading
                  ? "translate-y-2 opacity-0"
                  : "translate-y-0 opacity-100"
              }`}
            >
              {activeSection === "education" && (
                <section className="scrollbar-hide max-h-[62vh] overflow-y-auto pr-1 md:max-h-[520px] md:pr-2">
                  <div className="space-y-8">
                    {education.map((item) => (
                      <article
                        key={item.degree}
                        className="border-b border-stone-300/70 pb-8"
                      >
                        <p className="text-[11px] uppercase tracking-[0.26em] text-stone-600">
                          {item.period}
                        </p>

                        <h2 className="mt-4 text-[17px] font-bold leading-tight tracking-[-0.02em] text-stone-950 md:text-[19px]">
                          {item.degree}
                        </h2>

                        <p className="mt-2 text-[15px] font-semibold leading-7 tracking-wide text-stone-800">
                          {item.degreeZh}
                        </p>

                        <p className="mt-4 text-[13px] uppercase leading-6 tracking-[0.18em] text-stone-600">
                          {item.school}
                        </p>

                        <p className="mt-1 text-[14px] leading-7 tracking-wide text-stone-700">
                          {item.schoolZh}
                        </p>

                        {item.detail && (
                          <p className="mt-4 text-[15px] leading-7 tracking-wide text-stone-800">
                            {item.detail}
                          </p>
                        )}
                      </article>
                    ))}
                  </div>
                </section>
              )}

              {activeSection === "language" && (
                <section className="scrollbar-hide max-h-[62vh] overflow-y-auto pr-1 md:max-h-[520px] md:pr-2">
                  <div className="space-y-8">
                    {languages.map((item) => (
                      <article
                        key={item.name}
                        className="border-b border-stone-300/70 pb-8"
                      >
                        <h2 className="text-[17px] font-bold tracking-[-0.02em] text-stone-950 md:text-[19px]">
                          {item.name}
                        </h2>

                        <p className="mt-3 text-[15px] font-semibold leading-7 tracking-wide text-stone-800">
                          {item.level}
                        </p>

                        <p className="mt-2 text-sm leading-7 tracking-wide text-stone-600">
                          {item.detail}
                        </p>
                      </article>
                    ))}
                  </div>
                </section>
              )}

              {activeSection === "skills" && (
                <section className="scrollbar-hide max-h-[62vh] overflow-y-auto pr-1 md:max-h-[520px] md:pr-2">
                  <div className="grid gap-7 md:grid-cols-2">
                    {skillGroups.map((group) => (
                      <article
                        key={group.title}
                        className="border-b border-stone-300/70 pb-7"
                      >
                        <h2 className="text-[15px] font-bold tracking-[-0.02em] text-stone-950">
                          {group.title}
                        </h2>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {group.skills.map((skill) => (
                            <img
                              key={skill.name}
                              src={skillBadge(skill)}
                              alt={skill.name}
                              className="h-6 rounded md:h-7"
                              loading="lazy"
                            />
                          ))}
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )}

              {activeSection === "projects" && (
                <section className="scrollbar-hide max-h-[62vh] overflow-y-auto pr-1 md:max-h-[560px] md:pr-2">
                  <div className="space-y-10">
                    {participatedProjects.map((project) => (
                      <article
                        key={`${project.company}-${project.title}`}
                        className="border-b border-stone-300/70 pb-9"
                      >
                        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-10">
                          <div>
                            <p className="text-[11px] uppercase tracking-[0.26em] text-stone-600">
                              {project.company}
                            </p>

                            <h2 className="mt-3 max-w-4xl text-[17px] font-bold leading-7 tracking-[-0.02em] text-stone-950 md:text-[19px] md:leading-8">
                              {project.title}
                            </h2>
                          </div>

                          <p className="shrink-0 text-[11px] uppercase tracking-[0.24em] text-stone-600">
                            {project.period}
                          </p>
                        </div>

                        <ul className="mt-5 space-y-3">
                          {project.description.map((text) => (
                            <li
                              key={text}
                              className="flex gap-3 text-[15px] leading-7 tracking-wide text-stone-800"
                            >
                              <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-stone-800" />
                              <span>{text}</span>
                            </li>
                          ))}
                        </ul>
                      </article>
                    ))}
                  </div>
                </section>
              )}

              {activeSection === "research" && (
                <section className="scrollbar-hide max-h-[62vh] overflow-y-auto pr-1 md:max-h-[560px] md:pr-2">
                  <div className="space-y-10">
                    {researchExperiences.map((research) => (
                      <article
                        key={research.title}
                        className="border-b border-stone-300/70 pb-9"
                      >
                        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-10">
                          <div>
                            <p className="text-[11px] uppercase tracking-[0.26em] text-stone-600">
                              Research Experience
                            </p>

                            <h2 className="mt-3 max-w-4xl text-[17px] font-bold leading-7 tracking-[-0.02em] text-stone-950 md:text-[19px] md:leading-8">
                              {research.title}
                            </h2>
                          </div>

                          <p className="shrink-0 text-[11px] uppercase tracking-[0.24em] text-stone-600">
                            {research.period}
                          </p>
                        </div>

                        <ul className="mt-5 space-y-3">
                          {research.description.map((text) => (
                            <li
                              key={text}
                              className="flex gap-3 text-[15px] leading-7 tracking-wide text-stone-800"
                            >
                              <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-stone-800" />
                              <span>{text}</span>
                            </li>
                          ))}
                        </ul>
                      </article>
                    ))}
                  </div>
                </section>
              )}

              {activeSection === "honors" && (
                <section className="scrollbar-hide max-h-[62vh] overflow-y-auto pr-1 md:max-h-[560px] md:pr-2">
                  <div className="space-y-10">
                    {honors.map((honor) => (
                      <article
                        key={honor.title}
                        className="border-b border-stone-300/70 pb-9"
                      >
                        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-10">
                          <div>
                            <p className="text-[11px] uppercase tracking-[0.26em] text-stone-600">
                              {honor.issuer}
                            </p>

                            <h2 className="mt-3 max-w-4xl text-[17px] font-bold leading-7 tracking-[-0.02em] text-stone-950 md:text-[19px] md:leading-8">
                              {honor.title}
                            </h2>
                          </div>

                          <p className="shrink-0 text-[11px] uppercase tracking-[0.24em] text-stone-600">
                            {honor.period}
                          </p>
                        </div>

                        <ul className="mt-5 space-y-3">
                          {honor.description.map((text) => (
                            <li
                              key={text}
                              className="flex gap-3 text-[15px] leading-7 tracking-wide text-stone-800"
                            >
                              <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-stone-800" />
                              <span>{text}</span>
                            </li>
                          ))}
                        </ul>
                      </article>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>

          {RESUME_LOCKED && (
            <div
            className={`absolute inset-x-0 top-0 z-20 flex min-h-[360px] items-start justify-center rounded-[1.5rem] bg-white/35 px-5 pt-20 text-center backdrop-blur-sm transition-all duration-1000 ease-in-out md:inset-0 md:items-center md:pt-0 md:rounded-[2rem] ${
                shouldBlurResume
                  ? "opacity-100"
                  : "pointer-events-none opacity-0"
              }`}
            >
              <div className="max-w-xl rounded-[1.5rem] border border-white/70 bg-white/70 px-6 py-8 shadow-2xl backdrop-blur-xl md:px-10 md:py-10">
                <p className="text-[11px] uppercase tracking-[0.35em] text-stone-500">
                  Resume Temporarily Hidden
                </p>

                <p className="mt-5 text-sm font-semibold leading-8 tracking-[0.18em] text-stone-700 md:text-base">
                  比我更猛的比比皆是，
                  <br />
                  所以我先不自曝其短了...
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}