import { request } from "./request";

// تسجيل مستخدم جديد
export const register = (data: any) => request("/register", "POST", data);

// التحقق من البريد الإلكتروني
export const verifyEmail = (data: { email: string; code: string; password?: string}) =>
  request("/verify-email", "POST", data);

// تسجيل الدخول
export const login = (data: any) => request("/login", "POST", data);

// استعادة كلمة المرور
export const forgotPassword = (data: { email: string }) =>
  request("/forgot-password", "POST", data);

// إعادة تعيين كلمة المرور
export const resetPassword = (data: any) =>
  request("/reset-password", "POST", data);

// تسجيل الدخول باستخدام Google
export const googleLogin = (accessToken: string) =>
  request("/google", "POST", { accessToken });

// إعداد ملف الطفل (تم التحديث ليشمل البيانات الجديدة)
export interface ChildProfileData {
  name: string;
  birthDate: string;
  gender: 'male' | 'female';
  country: string;
  city: string;
  // address: string;
  parentPhoneNumber: string;
}

export const setupChildProfile = (data: ChildProfileData, token: string) =>
  request("/addChild", "POST", data, { Authorization: `Bearer ${token}` });