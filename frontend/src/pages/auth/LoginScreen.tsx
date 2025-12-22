import React, { useState } from "react";
import { Mail, ArrowLeft } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";
import { Logo } from "../../components/ui/Logo";
import { Input } from "../../components/ui/Input";
import { Button, SocialButton } from "../../components/ui/Button";
import { ScreenProps } from "../../types";
import {
  login as loginApi,
  googleLogin as googleLoginApi,
} from "../../services/authApi";
import { useAuth } from "../../context/AuthContext";

export const LoginScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("الرجاء ملء جميع الحقول");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await loginApi({ email, password });
      // Save token in context
      login(data.token);
      // AuthProvider will automatically switch to Home,
      // but we can ensure navigation or just let the state update trigger re-render
    } catch (err: any) {
      setError(err.message || "البريد الإلكتروني أو كلمة المرور غير صحيحة");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      setLoading(true);
      setError("");
      try {
        const data = await googleLoginApi(codeResponse.access_token);
        login(data.token);
      } catch (err: any) {
        setError(err.message || "فشل تسجيل الدخول باستخدام Google");
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      setError("فشل تسجيل الدخول باستخدام Google");
    },
    flow: "implicit",
  });

  return (
    <div className="flex flex-col h-full px-6 pt-6 pb-safe overflow-y-auto no-scrollbar">
      {/* Back Button added */}
      <div className="w-full flex justify-end mb-4">
         <button onClick={() => onNavigate('welcome')} className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
           <ArrowLeft size={24} />
         </button>
       </div>
      <Logo className="mb-8" />

      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#5CAAF8] mb-1">تسجيل الدخول</h2>
        <p className="text-gray-500">أهلاً بك مجدداً</p>
      </div>

      <div className="flex-1">
        <Input
          label="البريد الإلكتروني *"
          placeholder="أدخل البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<Mail size={20} />}
          error={error ? " " : undefined}
        />

        <div className="relative">
          <Input
            label="كلمة المرور *"
            placeholder="أدخل كلمة المرور"
            type="password"
            isPassword
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error ? " " : undefined}
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <div className="flex justify-end mb-6">
          <button
            onClick={() => onNavigate("forgot-password")}
            className="text-[#5CAAF8] text-sm font-medium hover:underline"
          >
            هل نسيت كلمة المرور؟
          </button>
        </div>

        <Button onClick={handleLogin} className="mb-6" disabled={loading}>
          {loading ? "جاري الدخول..." : "تسجيل الدخول"}
        </Button>

        <div className="relative flex items-center justify-center mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <span className="relative bg-white px-4 text-gray-500 text-sm">
            أو
          </span>
        </div>

        <div className="space-y-3 mb-8">
          <SocialButton provider="google" onClick={() => handleGoogleLogin()} />
        </div>

        <div className="text-center">
          <span className="text-gray-500 text-sm ml-1">ليس لديك حساب؟</span>
          <button
            onClick={() => onNavigate("signup")}
            className="text-[#5CAAF8] font-bold text-sm hover:underline"
          >
            إنشاء حساب
          </button>
        </div>
      </div>
    </div>
  );
};
