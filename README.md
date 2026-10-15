# 🚀 CreativeSquad HireOS — Enterprise Campus & Drive Intelligence Platform

> **Full Stack Development Technical Assignment for Creative Squad Private Limited**  
> **Drive Context**: Internshala October Drive (`6ac4b8f0e6703ebfc3ddb74c`)  
> **Ambsta Registration Portal Token**: `7d62996e835a7efd`  
> **Author**: Yash Jain ([@yash560](https://github.com/yash560) • [yaashjainn@gmail.com](mailto:yaashjainn@gmail.com))

---

## 🏛️ Executive Summary

**CreativeSquad HireOS** is a production-grade campus recruitment, candidate screening, and full-stack technical assessment platform engineered specifically for **Creative Squad Private Limited**.

Built with **Next.js 15**, **React 19**, **TypeScript**, and **Tailwind CSS v4**, the system replicates and enhances the Ambsta drive registration pipeline, providing an end-to-end recruitment command center for the 45-day training + 3-month client internship + PPO (₹4.2 - 6.0 LPA) hiring cycle.

---

## ⚡ Core Platform Capabilities

### 1. 📋 Ambsta Drive Candidate Portal (`/candidate`)
- **Direct Synchronisation**: Replicates the Ambsta drive registration schema for token `7d62996e835a7efd`.
- **Interactive Email OTP Verification**: Real-time simulation of Ambsta's email OTP verification (`G0` / `Q0` protocol).
- **Academic Marks Matrix**: Ingests and normalizes 10th marks, 12th marks, graduation marks (CGPA/percentage), and post-graduation marks.
- **College Tiering Engine**: Auto-weights candidate qualifications across Tier 1 (IIT/NIT/BITS), Tier 2, and Tier 3 institutions.
- **Instant Demo Auto-Fill**: 1-click button to immediately populate Yash Jain's verified profile for rapid evaluation.

### 2. 👥 Recruiter Shortlisting Matrix (`/recruiter`)
- **Multi-Factor Ranking Algorithm**: Dynamically scores candidates across Academics (35%), Coding Tests (40%), College Tier (15%), and Location Match (10%).
- **Advanced Filtering**: Instant query by Tier, Degree (B.Tech, MCA, M.Tech), Internship Cycle, and Status.
- **Status Workflow**: Live stage transitions (Applied → Screening Passed → Shortlisted → Assessment Pending → Interview Scheduled → PPO Offer Extended).
- **Exporting**: Instant export to CSV and JSON formats.

### 3. 💻 Interactive Developer Assessment Sandbox (`/assessments`)
- **Challenge 01**: Next.js 15 Distributed Token Bucket Rate Limiter for registration endpoints.
- **Challenge 02**: MongoDB Aggregation Pipeline for Candidate Shortlisting & Cohort Analytics.
- **Challenge 03**: React 19 Custom Hook for Real-Time Drive State & Optimistic UI Updates.
- **Live Test Runner**: Real-time TypeScript AST assertion evaluation with visual terminal execution logs.

### 4. 📊 Cohort & Placement Telemetry (`/analytics`)
- Visual breakdown of Tier distributions, degree qualification mix, cohort capacity, and stage conversion funnels.

---

## 🛠️ Tech Stack & Invariants

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router, Server & Client Components) |
| **UI Library** | React 19 |
| **Language** | TypeScript 5 (Strict Mode) |
| **Styling** | Tailwind CSS v4 |
| **Icons & Motion** | Lucide React, Canvas Confetti |
| **API Architecture** | Next.js Route Handlers (`/api/drives`, `/api/applications`, `/api/verify-otp`, `/api/assessments`, `/api/analytics`) |
| **State & Store** | In-Memory Global Store with LocalStorage Synchronization |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.18+ or 20+
- npm 9+

### Installation & Run

```bash
# 1. Clone the repository
git clone git@github-yash560:yash560/creative_squad_private_limited-assignment.git
cd creative_squad_private_limited-assignment

# 2. Install dependencies
npm install

# 3. Deterministic Verification
npm run build
npx tsc --noEmit

# 4. Start Local Development Server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 👤 Author & Candidate Profile

**Yash Jain**  
- **Email**: yaashjainn@gmail.com  
- **GitHub**: [@yash560](https://github.com/yash560)  
- **Portfolio**: [thewebvale.com](https://thewebvale.com)  
- **Role Applied For**: Full Stack Development at Creative Squad Private Limited
