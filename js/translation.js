const translations = {
    en: {
        home: "Home", like: "Like", coupon: "Coupon", history: "History", buy: "Buy", contact: "Contact",
        welcome: "Welcome back", launchBot: "Launch New Bot", selectRegion: "Select Region", clanId: "Enter Clan ID",
        startBoosting: "Start Boosting", redeemCoupon: "Redeem Coupon", enterCode: "Enter coupon code",
        buyCredits: "BUY CREDITS", basicCredit: "BASIC CREDIT", specialCredit: "SPECIAL CREDIT",
        paymentMethod: "Payment Method", senderNumber: "Sender Number", trxId: "Transaction ID",
        submit: "Submit", signIn: "Sign In", signUp: "Sign Up", username: "Username", password: "Password"
    },
    bn: {
        home: "হোম", like: "লাইক", coupon: "কুপন", history: "হিস্টোরি", buy: "কেনাকাটা", contact: "যোগাযোগ",
        welcome: "স্বাগতম", launchBot: "নতুন বট চালু করুন", selectRegion: "রিজিয়ন সিলেক্ট করুন", clanId: "ক্ল্যান আইডি দিন",
        startBoosting: "বুস্টিং শুরু করুন", redeemCoupon: "কুপন ব্যবহার করুন", enterCode: "কুপন কোড লিখুন",
        buyCredits: "ক্রেডিট কিনুন", basicCredit: "বেসিক ক্রেডিট", specialCredit: "স্পেশাল ক্রেডিট",
        paymentMethod: "পেমেন্ট মেথড", senderNumber: "সেন্ডার নাম্বার", trxId: "ট্রানজেকশন আইডি",
        submit: "সাবমিট করুন", signIn: "সাইন ইন", signUp: "সাইন আপ", username: "ইউজারনেম", password: "পাসওয়ার্ড"
    },
    hi: {
        home: "होम", like: "लाइक", coupon: "कूपन", history: "इतिहास", buy: "खरीदें", contact: "संपर्क",
        welcome: "वापसी पर स्वागत है", launchBot: "नया बॉट लॉन्च करें", selectRegion: "क्षेत्र चुनें", clanId: "कबीला आईडी दर्ज करें",
        startBoosting: "बूस्टिंग शुरू करें", redeemCoupon: "कूपन भुनाएं", enterCode: "कूपन कोड दर्ज करें",
        buyCredits: "क्रेडिट खरीदें", basicCredit: "बेसिक क्रेडिट", specialCredit: "विशेष क्रेडिट",
        paymentMethod: "भुगतान विधि", senderNumber: "प्रेषक संख्या", trxId: "लेनदेन आईडी",
        submit: "जमा करें", signIn: "साइन इन", signUp: "साइन अप", username: "उपयोगकर्ता नाम", password: "पासवर्ड"
    },
    ar: {
        home: "الرئيسية", like: "إعجاب", coupon: "قسيمة", history: "تاريخ", buy: "شراء", contact: "اتصل",
        welcome: "مرحبا بعودتك", launchBot: "إطلاق بوت جديد", selectRegion: "اختر المنطقة", clanId: "أدخل معرف العشيرة",
        startBoosting: "ابدأ التعزيز", redeemCoupon: "استرداد القسيمة", enterCode: "أدخل رمز القسيمة",
        buyCredits: "شراء الاعتمادات", basicCredit: "الائتمان الأساسي", specialCredit: "ائتمان خاص",
        paymentMethod: "طريقة الدفع", senderNumber: "رقم المرسل", trxId: "معرف المعاملة",
        submit: "إرسال", signIn: "تسجيل الدخول", signUp: "اشتراك", username: "اسم المستخدم", password: "كلمة المرور"
    }
};

function changeLanguage(lang) {
    localStorage.setItem('selectedLang', lang);
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if(translations[lang] && translations[lang][key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translations[lang][key];
            } else {
                el.innerText = translations[lang][key];
            }
        }
    });
}

// Auto load language on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('selectedLang') || 'en';
    changeLanguage(savedLang);
});