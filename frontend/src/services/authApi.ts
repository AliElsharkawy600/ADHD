import { request } from "./request";

// تسجيل مستخدم جديد
export const register = (data: any) => request("/register", "POST", data);

// التحقق من البريد الإلكتروني
export const verifyEmail = (data: { email: string; code: string }) =>
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
