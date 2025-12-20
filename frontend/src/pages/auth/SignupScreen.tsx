import React, { useState } from 'react';
import { Mail, ArrowLeft, Loader2 } from 'lucide-react';
import { Logo } from '../../components/ui/Logo';
import { Input } from '../../components/ui/Input';
import { Button, SocialButton } from '../../components/ui/Button';
import { ScreenProps } from '../../types';
import { api } from '../../services/api';

export const SignupScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    const newErrors: any = {};
    if (!formData.email) newErrors.email = 'مطلوب';
    if (formData.password.length < 6) newErrors.password = 'يجب أن تكون من أكثر من 6 أحرف';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'كلمة المرور غير متطابقة';

    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
    }

    setLoading(true);
    setErrors({});

    try {
      await api.register(formData);
      // On success, navigate to OTP and pass the email
      onNavigate('otp', { email: formData.email });
    } catch (err: any) {
      setErrors({ email: err.message || 'حدث خطأ أثناء التسجيل' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full px-6 pt-6 pb-safe overflow-y-auto no-scrollbar">
       <div className="w-full flex justify-end mb-4">
         <button onClick={() => onNavigate('login')} className="p-2 text-gray-600">
           <ArrowLeft size={24} />
         </button>
       </div>
       
       <Logo className="mb-6" />

       <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-[#5CAAF8] mb-1">إنشاء حساب جديد!</h2>
        <p className="text-gray-500 text-sm">قم بإنشاء حساب للوصول إلى جميع الميزات</p>
      </div>

      <div className="flex-1">
        <Input 
          label="البريد الإلكتروني *"
          placeholder="أدخل البريد الإلكتروني"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          icon={<Mail size={20} />}
          error={errors.email}
        />
        
        <Input 
          label="أنشئ كلمة مرور *"
          placeholder="أدخل كلمة المرور"
          type="password"
          isPassword
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          error={errors.password}
        />
        {errors.password && <p className="text-xs text-red-400 -mt-2 mb-2 mr-1">{errors.password}</p>}

        <Input 
          label="تأكيد كلمة المرور *"
          placeholder="تأكيد كلمة المرور"
          type="password"
          isPassword
          value={formData.confirmPassword}
          onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
          error={errors.confirmPassword}
        />

        <Button onClick={handleSignup} className="mt-2 mb-6" disabled={loading}>
          {loading ? 'جاري الإنشاء...' : 'إنشاء حساب جديد'}
        </Button>

        <div className="relative flex items-center justify-center mb-6">
           <div className="absolute inset-0 flex items-center">
             <div className="w-full border-t border-gray-200"></div>
           </div>
           <span className="relative bg-white px-4 text-gray-500 text-sm">أو</span>
        </div>

        <div className="space-y-3 mb-6">
          <SocialButton provider="google" />
        </div>

        <div className="text-center pb-6">
          <span className="text-gray-500 text-sm ml-1">لديك حساب بالفعل؟</span>
          <button 
            onClick={() => onNavigate('login')}
            className="text-[#5CAAF8] font-bold text-sm hover:underline"
          >
            تسجيل دخول
          </button>
        </div>
      </div>
    </div>
  );
};