# 🛡️ Namma Community

**Namma Community** is a community-driven digital safety platform built to crowdsource, track, and raise awareness about online harassment, scams, and cyber threats. It empowers communities to report malicious accounts across platforms and offers educational resources to promote cyber hygiene.

![Namma Space Banner](./public/og-image.png) *(Note: Replace with your actual banner if you have one)*

## 🚀 Features

- **Anonymous Reporting**: Safely submit reports of online harassment, phishing, or scams without exposing your identity.
- **Evidence Vault**: Attach screenshots, PDFs, or image evidence directly to reports, securely uploaded to Supabase Storage.
- **Admin Dashboard**: A secure portal for moderators to review pending reports, examine evidence, and confirm threats.
- **Awareness Feed**: A public, real-time feed that displays only *confirmed* malicious accounts to warn the community.
- **Live Database**: Powered by Supabase PostgreSQL for real-time synchronization across all devices globally.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui, Framer Motion (Animations)
- **Database / Backend**: Supabase (PostgreSQL), Supabase Storage
- **Hosting / Deployment**: Vercel

---

## 💻 Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/namma_space.git
   cd namma_space
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Launch the Development Server:**
   ```bash
   npm run dev
   ```
   *The app will be running at `http://localhost:8080/`.*

---

## ⚖️ Legal & Liability Disclaimer

**Namma Space is a community awareness tool, NOT a law enforcement agency or legal entity.** 

By using, deploying, or contributing to this software, you agree to the following terms:

1. **No Legal Authority**: This platform does not possess investigative powers. Reports submitted to this platform are user-generated and are not verified by law enforcement.
2. **User Responsibility**: Users hold sole responsibility for the claims and evidence they submit. The platform creators, maintainers, and administrators are strictly providing a technical interface and hold **zero liability** for defamation, false accusations, or damages arising from user-submitted content.
3. **Data Privacy**: Do not submit highly sensitive Personally Identifiable Information (PII) such as social security numbers or banking passwords. Evidence uploaded is stored in cloud databases and may be viewed by administrators. 
4. **Moderation**: Administrators reserve the right to delete, dismiss, or ignore any report at their sole discretion if it violates community guidelines or appears to be a targeted harassment attempt.
5. **Report to Authorities**: If you are in immediate physical danger or have been the victim of a severe financial crime, **do not rely solely on this platform**. Contact your local law enforcement agencies immediately.

**Use this software at your own risk.** The authors disclaim all warranties, express or implied, regarding the software's fitness for a specific legal or investigative purpose.

---

## 📜 License

This project is open-sourced under the [MIT License](LICENSE).
