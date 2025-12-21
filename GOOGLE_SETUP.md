# Google OAuth Setup Guide

## المراحل الإعداد

### 1. الحصول على Google Client ID

1. انتقل إلى [Google Cloud Console](https://console.cloud.google.com/)
2. أنشئ مشروع جديد أو افتح المشروع الموجود
3. فعّل Google+ API:
   - اذهب إلى "APIs & Services" > "Library"
   - ابحث عن "Google+ API"
   - اضغط على "Enable"

4. أنشئ OAuth 2.0 Credentials:
   - اذهب إلى "APIs & Services" > "Credentials"
   - اضغط على "Create Credentials" > "OAuth Client ID"
   - اختر "Web application"
   - أضف URIs التالية:
     - **Authorized redirect URIs**: `http://localhost:3000`
     - قم بإضافة عناوين الإنتاج (production) لاحقاً
   - انسخ `Client ID`

### 2. إعداد الفرونت إند

1. أنشئ ملف `.env` في المجلد `frontend/`:
```dotenv
VITE_API_BASE_URL=http://localhost:5000/api/auth
VITE_GOOGLE_CLIENT_ID=your_client_id_here
```

2. استبدل `your_client_id_here` بـ Google Client ID الذي حصلت عليه

### 3. المكتبات المثبتة

المشروع يستخدم المكتبات التالية:
- `@react-oauth/google` - مكتبة Google OAuth للـ React
- `axios` - لإرسال الطلبات إلى الـ API

### 4. آلية العمل

#### الفرونت إند:
1. المستخدم يضغط على زر "تسجيل الدخول باستخدام Google"
2. يتم فتح نافذة تسجيل Google
3. بعد الموافقة، يتم الحصول على `access_token`
4. يتم إرسال `access_token` إلى الباكإند

#### الباكإند:
1. يستقبل `access_token`
2. يتحقق من صحة التوكن باستخدام Google API
3. يحصل على معلومات المستخدم (البريد الإلكتروني، الاسم، الصورة)
4. ينشئ مستخدم جديد أو يحدّث المستخدم الموجود
5. يرسل JWT Token للتطبيق

### 5. تشغيل التطبيق

```bash
# تشغيل الباكإند
cd backend
npm install
npm run dev

# تشغيل الفرونت (في terminal جديد)
cd frontend
npm install
npm run dev
```

### 6. اختبار الوظيفة

1. افتح التطبيق في المتصفح (`http://localhost:5173`)
2. اذهب إلى صفحة تسجيل الدخول
3. اضغط على "تسجيل الدخول باستخدام Google"
4. أكمل عملية تسجيل Google
5. يجب أن يتم تسجيل دخولك إلى التطبيق

## الملفات المُعدَّلة

### الفرونت إند:
- `frontend/src/main.tsx` - إضافة GoogleOAuthProvider
- `frontend/src/pages/auth/LoginScreen.tsx` - معالج Google Sign-In
- `frontend/src/pages/auth/SignupScreen.tsx` - معالج Google Sign-Up
- `frontend/src/services/authApi.ts` - دالة googleLogin

### الباكإند:
- `backend/src/controllers/auth.controller.js` - دالة googleLogin المحدثة
- `backend/src/routes/auth.routes.js` - المسار `/google` موجود بالفعل

## معالجة الأخطاء

إذا واجهت مشاكل:

1. **خطأ "Invalid Google token"**: تأكد من أن Google Client ID صحيح في `.env`
2. **خطأ CORS**: تأكد من أن الـ API يسمح بـ CORS من الفرونت
3. **خطأ في المتغيرات**: تأكد من تعريف جميع متغيرات البيئة بشكل صحيح

## ميزات إضافية

تم تفعيل الميزات التالية:
- ✅ إنشاء مستخدم تلقائي عند أول تسجيل دخول
- ✅ التحقق التلقائي من حسابات Google
- ✅ الحفظ الآمن للبيانات في قاعدة البيانات
- ✅ إرسال JWT Token بعد التحقق الناجح
