import React, { useState } from 'react';
import { Mail, ArrowLeft, KeyRound } from 'lucide-react';
import { Logo } from '../../components/ui/Logo';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { ScreenProps } from '../../types';
import { forgotPassword as forgotPasswordApi, resetPassword as resetPasswordApi } from '../../services/authApi';

// Forgot Password Screen
export const ForgotPasswordScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!email) {
      setError("الرجاء إدخال البريد الإلكتروني");
      return;
    }
    setLoading(true);
    setError('');
    try {
      await forgotPasswordApi({ email });
      // Navigate to Reset Password and pass email
      onNavigate('reset-password', { email });
    } catch (err: any) {
      setError(err.message || "حدث خطأ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full px-6 pt-10 pb-safe">
      <div className="w-full flex justify-end mb-4">
        <button onClick={() => onNavigate('login')} className="p-2 text-gray-600">
          <ArrowLeft size={24} />
        </button>
      </div>

      <Logo className="mb-8" />

      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#5CAAF8] mb-1">إعادة كلمة المرور!</h2>
        <p className="text-gray-500 text-sm">لا تقلق، سنرسل لك رمز التحقق لإعادة تعيين كلمة المرور</p>
      </div>

      <div className="flex-1">
        <Input
          label="البريد الإلكتروني *"
          placeholder="أدخل البريد الإلكتروني"
          icon={<Mail size={20} />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error}
        />

        <Button onClick={handleSubmit} className="mt-4" disabled={loading}>
          {loading ? 'جاري الإرسال...' : 'إرسال رمز التحقق'}
        </Button>
      </div>
    </div>
  );
};

// Reset Password Screen
export const ResetPasswordScreen: React.FC<ScreenProps> = ({ onNavigate, params }) => {
  const email = params?.email || '';
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleReset = async () => {
    if (!code || !newPassword || !confirmPassword) {
      setError("جميع الحقول مطلوبة");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("كلمات المرور غير متطابقة");
      return;
    }

    setLoading(true);
    setError('');

    try {
      await resetPasswordApi({ email, code, newPassword });
      onNavigate('success-reset');
    } catch (err: any) {
      setError(err.message || "رمز التحقق غير صحيح أو انتهت صلاحيته");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full px-6 pt-10 pb-safe overflow-y-auto no-scrollbar">
      <div className="w-full flex justify-end mb-4">
        <button onClick={() => onNavigate('login')} className="p-2 text-gray-600">
          <ArrowLeft size={24} />
        </button>
      </div>

      <Logo className="mb-8" />

      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#5CAAF8] mb-1">تعيين كلمة المرور</h2>
        <p className="text-gray-500 text-sm">أدخل الرمز الذي وصلك عبر البريد وكلمة المرور الجديدة</p>
        <p className="text-xs text-[#5CAAF8] mt-1">{email}</p>
      </div>

      <div className="flex-1">
        {/* NEW INPUT FOR CODE */}
        <Input
          label="رمز التحقق *"
          placeholder="أدخل الكود (6 أرقام)"
          icon={<KeyRound size={20} />}
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <Input
          label="كلمة المرور الجديدة *"
          placeholder="أدخل كلمة مرور جديدة"
          isPassword
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <Input
          label="تأكيد كلمة المرور *"
          placeholder="تأكيد كلمة المرور"
          isPassword
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={error}
        />

        <Button onClick={handleReset} className="mt-4" disabled={loading}>
          {loading ? 'جاري التعيين...' : 'تعيين كلمة المرور'}
        </Button>
      </div>
    </div>
  );
};