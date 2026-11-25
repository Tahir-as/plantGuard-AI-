<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/4c324239-d805-4982-85dd-83e67ed41485

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
🌱 PlantGuard AIAn Intelligent Agricultural Assistant & Crop Disease Diagnostic Platform Built with Google Gemini & Firebase📖 OverviewPlantGuard AI is a modern, AI-powered web application designed to empower farmers, agronomists, and home gardeners with instant agricultural intelligence. Leveraging Google's Gemini multimodal AI alongside Firebase for real-time data persistence and authentication, PlantGuard AI enables users to diagnose plant diseases, identify pest infestations, receive actionable treatment plans, and maintain a historical log of crop health across their fields.🔗 Live AI Studio App: https://ai.studio/apps/4c324239-d805-4982-85dd-83e67ed41485✨ Key Features🔍 Multimodal Crop Disease Diagnosis: Upload or capture images of leaves, stems, or fruits to instantly detect fungal, bacterial, viral infections, or nutrient deficiencies using Gemini's vision capabilities.💊 Actionable Treatment & Prevention Plans: Receive tailored organic and chemical treatment recommendations, dosage guidelines, and preventative best practices specific to the identified crop and condition.💬 Interactive AI Agronomist Assistant: Ask follow-up questions regarding soil health, irrigation schedules, seasonal planting, and localized pest control in natural language.☁️ Cloud-Synced Scan History (Firebase): Securely store diagnostic reports, crop scan logs, and farmer profiles in Cloud Firestore with strict user-level security rules.📱 Responsive & Field-Ready UI: Fast, mobile-first interface built with React and Vite, optimized for low-latency usage directly in the field.🛠️ Tech StackLayerTechnologyFrontend FrameworkReact + TypeScriptBuild ToolVite (vite.config.ts)AI EngineGoogle Gemini API (@google/genai)Backend & DatabaseFirebase (Authentication & Cloud Firestore)Security & SchemaFirestore Security Rules (firestore.rules) & Firebase Blueprint (firebase-blueprint.json)📂 Project StructureplantGuard-AI-/
├── src/                         # Application source code (components, hooks, services, types)
├── .env.example                 # Template for required environment variables
├── firebase-applet-config.json  # Firebase project client configuration
├── firebase-blueprint.json      # Firestore data model & schema blueprint
├── firestore.rules              # Database security and access control rules
├── index.html                   # Application HTML entry point
├── metadata.json                # AI Studio application metadata & permissions
├── package.json                 # Project dependencies and npm scripts
├── tsconfig.json                # TypeScript compiler configuration
└── vite.config.ts               # Vite bundler and environment configuration
🚀 Run LocallyFollow these instructions to set up and run PlantGuard AI locally on your machine.PrerequisitesNode.js (v18.0.0 or higher recommended)npm or yarnA Google Gemini API Key from Google AI StudioA Firebase Project (with Firestore and Authentication enabled)Installation & SetupClone the repository:git clone https://github.com/Tahir-as/plantGuard-AI-.git
cd plantGuard-AI-
Install dependencies:npm install
Set your Gemini API Key:
Create or open .env.local (you can copy from .env.example) and set GEMINI_API_KEY to your Gemini API key:GEMINI_API_KEY=your_google_gemini_api_key_here
Verify Firebase Configuration:
Ensure firebase-applet-config.json contains your valid Firebase project credentials (apiKey, authDomain, projectId, etc.). If deploying Firestore rules to your own Firebase instance, run:firebase deploy --only firestore:rules
Run the app:npm run dev
Open your browser and navigate to http://localhost:5173 (or the port displayed in your terminal).🔒 Security & Data PrivacyAPI Key Protection: Never commit .env or .env.local files containing live API keys to version control.Firestore Security Rules: Database reads and writes are governed by firestore.rules to ensure farmers can only access and manage their own diagnostic records and field data.📜 Available ScriptsCommandDescriptionnpm run devStarts the local Vite development server with Hot Module Replacement (HMR).npm run buildCompiles TypeScript and builds the production bundle into dist/.npm run previewLocally previews the production build before deployment.🤝 ContributingContributions are welcome! Whether it's improving disease prompt accuracy, adding multilingual support for local farmers, or enhancing the UI:Fork the repository.Create a feature branch (git checkout -b feature/multilingual-support).Commit your changes (git commit -m "Add Urdu and regional language support").Push to the branch (git push origin feature/multilingual-support).Open a Pull Request.📄 LicenseThis project is open-source and available under the MIT License.
