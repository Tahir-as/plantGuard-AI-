import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "app_name": "PlantGuard AI",
      "tagline": "Protect your crops with AI",
      "get_started": "Get Started",
      "scan_plant": "Scan Plant",
      "history": "History",
      "settings": "Settings",
      "admin": "Admin",
      "capture": "Capture Image",
      "upload": "Upload from Gallery",
      "detecting": "Detecting disease...",
      "result": "Scan Result",
      "disease": "Disease",
      "confidence": "Confidence",
      "treatment": "Treatment",
      "prevention": "Prevention",
      "language": "Language",
      "logout": "Logout",
      "login_google": "Login with Google",
      "no_history": "No scan history found.",
      "accuracy": "Accuracy",
      "plant_type": "Plant Type",
      "severity": "Severity",
      "low": "Low",
      "medium": "Medium",
      "high": "High",
      "urdu": "Urdu",
      "english": "English",
      "sindhi": "Sindhi",
      "punjabi": "Punjabi"
    }
  },
  ur: {
    translation: {
      "app_name": "پلانٹ گارڈ AI",
      "tagline": "AI کے ساتھ اپنی فصلوں کی حفاظت کریں",
      "get_started": "شروع کریں",
      "scan_plant": "پودے کو اسکین کریں",
      "history": "تاریخ",
      "settings": "ترتیبات",
      "admin": "ایڈمن",
      "capture": "تصویر کھینچیں",
      "upload": "گیلری سے اپ لوڈ کریں",
      "detecting": "بیماری کی تشخیص ہو رہی ہے...",
      "result": "اسکین کا نتیجہ",
      "disease": "بیماری",
      "confidence": "اعتماد",
      "treatment": "علاج",
      "prevention": "احتیاطی تدابیر",
      "language": "زبان",
      "logout": "لاگ آؤٹ",
      "login_google": "گوگل کے ساتھ لاگ ان کریں",
      "no_history": "کوئی اسکین تاریخ نہیں ملی۔",
      "accuracy": "درستگی",
      "plant_type": "پودے کی قسم",
      "severity": "شدت",
      "low": "کم",
      "medium": "درمیانی",
      "high": "زیادہ",
      "urdu": "اردو",
      "english": "انگریزی",
      "sindhi": "سندھی",
      "punjabi": "پنجابی"
    }
  },
  sd: {
    translation: {
      "app_name": "پلانٽ گارڊ AI",
      "tagline": "AI سان پنهنجي فصلن جي حفاظت ڪريو",
      "get_started": "شروع ڪريو",
      "scan_plant": "ٻوٽي کي اسڪين ڪريو",
      "history": "تاريخ",
      "settings": "سيٽنگون",
      "admin": "ايڊمن",
      "capture": "تصوير ڪڍو",
      "upload": "گيلري مان اپ لوڊ ڪريو",
      "detecting": "بيماري جي سڃاڻپ ٿي رهي آهي...",
      "result": "اسڪين جو نتيجو",
      "disease": "بيماري",
      "confidence": "اعتماد",
      "treatment": "علاج",
      "prevention": "احتياطي تدبيرون",
      "language": "ٻولي",
      "logout": "لاگ آئوٽ",
      "login_google": "گوگل سان لاگ ان ٿيو",
      "no_history": "ڪا به اسڪين تاريخ نه ملي.",
      "accuracy": "درستي",
      "plant_type": "ٻوٽي جو قسم",
      "severity": "شدت",
      "low": "گهٽ",
      "medium": "وچولي",
      "high": "وڌيڪ",
      "urdu": "اردو",
      "english": "انگريزي",
      "sindhi": "سنڌي",
      "punjabi": "پنجابي"
    }
  },
  pa: {
    translation: {
      "app_name": "پلانٹ گارڈ AI",
      "tagline": "AI نال اپنی فصلاں دی حفاظت کرو",
      "get_started": "شروع کرو",
      "scan_plant": "بوٹے نوں اسکین کرو",
      "history": "تاریخ",
      "settings": "ترتیبات",
      "admin": "ایڈمن",
      "capture": "تصویر کھچو",
      "upload": "گیلری توں اپ لوڈ کرو",
      "detecting": "بیماری دی پچھان ہو رہی اے...",
      "result": "اسکین دا نتیجہ",
      "disease": "بیماری",
      "confidence": "اعتماد",
      "treatment": "علاج",
      "prevention": "احتیاطی تدابیراں",
      "language": "زبان",
      "logout": "لاگ آؤٹ",
      "login_google": "گوگل نال لاگ ان کرو",
      "no_history": "کوئی اسکین تاریخ نہیں ملی۔",
      "accuracy": "درستگی",
      "plant_type": "بوٹے دی قسم",
      "severity": "شدت",
      "low": "گھٹ",
      "medium": "درمیانی",
      "high": "زیادہ",
      "urdu": "اردو",
      "english": "انگریزی",
      "sindhi": "سندھی",
      "punjabi": "پنجابی"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
