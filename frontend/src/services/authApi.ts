import { request } from "./request";

// تسجيل مستخدم جديد
export const register = (data: any) => request("/auth/register", "POST", data);

// التحقق من البريد الإلكتروني
export const verifyEmail = (data: {
  email: string;
  code: string;
  password?: string;
}) => request("/auth/verify-email", "POST", data);

// تسجيل الدخول
export const login = (data: any) => request("/auth/login", "POST", data);

// استعادة كلمة المرور
export const forgotPassword = (data: { email: string }) =>
  request("/auth/forgot-password", "POST", data);

// إعادة تعيين كلمة المرور
export const resetPassword = (data: any) =>
  request("/auth/reset-password", "POST", data);

// تسجيل الدخول باستخدام Google
export const googleLogin = (accessToken: string) =>
  request("/auth/google", "POST", { accessToken });

// إعداد ملف الطفل (تم التحديث ليشمل البيانات الجديدة)
export interface ChildProfileData {
  name: string;
  birthDate: string;
  gender: "male" | "female";
  country: string;
  city: string;
  // address: string;
  parentPhoneNumber: string;
}

export const setupChildProfile = (data: ChildProfileData, token: string) =>
  request("/auth/addChild", "POST", data, { Authorization: `Bearer ${token}` });
