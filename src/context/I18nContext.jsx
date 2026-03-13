import React, { createContext, useState, useContext } from 'react';

const I18nContext = createContext();

export const translations = {
  en: {
    welcome: "Hello",
    tagline: "Here is what's happening with your wellbeing today.",
    overview: "Overview",
    bookSession: "Book Session",
    prescriptions: "Prescriptions",
    history: "Medical History",
    community: "Community",
    resources: "Resources",
    messages: "Messages",
    reviews: "Reviews",
    favorites: "Favorites",
    assessments: "Assessments",
    logout: "Logout",
    searchPlaceholder: "Search doctors, hospitals, specialties...",
    findProvider: "Find Your Perfect Healthcare Provider",
    availableNow: "Available Now",
    bookNow: "Book Now",
  },
  hi: {
    welcome: "नमस्ते",
    tagline: "आज आपके स्वास्थ्य के साथ क्या हो रहा है यहाँ देखें।",
    overview: "अवलोकन",
    bookSession: "सत्र बुक करें",
    prescriptions: "नुस्खे",
    history: "चिकित्सा इतिहास",
    community: "समुदाय",
    resources: "संसाधन",
    messages: "संदेश",
    reviews: "समीक्षाएँ",
    favorites: "पसंदीदा",
    assessments: "मूल्यांकन",
    logout: "लॉगआउट",
    searchPlaceholder: "डॉक्टर, अस्पताल, विशेषज्ञ खोजें...",
    findProvider: "अपना आदर्श स्वास्थ्य सेवा प्रदाता खोजें",
    availableNow: "अभी उपलब्ध",
    bookNow: "अभी बुक करें",
  },
  ar: {
    welcome: "مرحباً",
    tagline: "إليك ما يحدث لصحتك اليوم.",
    overview: "نظرة عامة",
    bookSession: "حجز جلسة",
    prescriptions: "الوصفات الطبية",
    history: "التاريخ الطبي",
    community: "الموضوعات",
    resources: "الموارد",
    messages: "الرسائل",
    reviews: "المراجعات",
    favorites: "المفضلة",
    assessments: "التقييمات",
    logout: "تسجيل الخروج",
    searchPlaceholder: "ابحث عن أطباء، مستشفيات، تخصصات...",
    findProvider: "ابحث عن مقدم الرعاية الصحية المثالي",
    availableNow: "متاح الآن",
    bookNow: "احجز الآن",
  }
};

export const I18nProvider = ({ children }) => {
  const [lang, setLang] = useState('en');
  const [dir, setDir] = useState('ltr');

  const changeLanguage = (newLang) => {
    setLang(newLang);
    setDir(newLang === 'ar' ? 'rtl' : 'ltr');
  };

  const t = (key) => translations[lang][key] || key;

  return (
    <I18nContext.Provider value={{ lang, dir, t, changeLanguage }}>
      <div dir={dir} style={{ textAlign: dir === 'rtl' ? 'right' : 'left' }}>
        {children}
      </div>
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);
