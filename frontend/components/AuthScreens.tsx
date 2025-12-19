import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { AuthInput, AuthButton, SocialButton } from './ui/AuthComponents';
import { Mail, Smartphone, ArrowLeft, CheckCircle } from 'lucide-react';

// --- Screen Props ---
interface ScreenProps {
  onNavigate: (screen: string) => void;
}

// ----------------------------------------------------------------------------
// 1. LOGIN SCREEN
// ----------------------------------------------------------------------------
export const LoginScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      setError('الرجاء ملء جميع الحقول');
      return;
    }
    // Simulate generic error for demo if typing 'error'
    if (email.includes('error')) {
        setError('البيانات غير صحيحة');
        return;
    }
    onNavigate('home'); // Or dashboard
  };

  return (
    <div className="flex flex-col h-full px-6 pt-10 pb-safe">
      <Logo className="mb-8" />
      
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#5CAAF8] mb-1">تسجيل الدخول</h2>
        <p className="text-gray-500">أهلاً بك مجدداً</p>
      </div>

      <div className="flex-1">
        <AuthInput 
          label="البريد الإلكتروني أو رقم الهاتف *"
          placeholder="أدخل البريد الإلكتروني أو رقم الهاتف"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<Mail size={20} />}
          error={email.includes('error') ? 'البريد الإلكتروني غير صحيح!' : undefined}
        />
        
        <div className="relative">
            <AuthInput 
            label="كلمة المرور *"
            placeholder="أدخل كلمة المرور"
            type="password"
            isPassword
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error && !password ? ' ' : undefined}
            />
        </div>

        <div className="flex justify-end mb-6">
          <button 
            onClick={() => onNavigate('forgot-password')}
            className="text-[#5CAAF8] text-sm font-medium hover:underline"
          >
            هل نسيت كلمة المرور؟
          </button>
        </div>

        <AuthButton onClick={handleLogin} className="mb-6">
          تسجيل الدخول
        </AuthButton>

        <div className="relative flex items-center justify-center mb-6">
           <div className="absolute inset-0 flex items-center">
             <div className="w-full border-t border-gray-200"></div>
           </div>
           <span className="relative bg-white px-4 text-gray-500 text-sm">أو</span>
        </div>

        <div className="space-y-3 mb-8">
          <SocialButton provider="google" />
        </div>

        <div className="text-center">
          <span className="text-gray-500 text-sm ml-1">ليس لديك حساب؟</span>
          <button 
            onClick={() => onNavigate('signup')}
            className="text-[#5CAAF8] font-bold text-sm hover:underline"
          >
            إنشاء حساب
          </button>
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------------
// 2. SIGNUP SCREEN
// ----------------------------------------------------------------------------
export const SignupScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState<any>({});

  const handleSignup = () => {
    const newErrors: any = {};
    if (!formData.email) newErrors.email = 'مطلوب';
    if (formData.password.length < 6) newErrors.password = 'يجب أن تكون من أكثر من 6 أحرف';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'كلمة المرور غير متطابقة';

    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
    } else {
        onNavigate('otp');
    }
  };

  return (
    <div className="flex flex-col h-full px-6 pt-6 pb-safe overflow-y-auto no-scrollbar">
       {/* Simple header for sub-pages */}
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
        <AuthInput 
          label="البريد الإلكتروني *"
          placeholder="أدخل البريد الإلكتروني"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          icon={<Mail size={20} />}
          error={errors.email ? 'البريد الإلكتروني غير صحيح!' : undefined}
        />
        
        <AuthInput 
          label="أنشئ كلمة مرور *"
          placeholder="أدخل كلمة المرور"
          type="password"
          isPassword
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          error={errors.password}
        />
        {errors.password && <p className="text-xs text-red-400 -mt-2 mb-2 mr-1">يجب أن تكون من أكثر من 6 أحرف</p>}

        <AuthInput 
          label="تأكيد كلمة المرور *"
          placeholder="تأكيد كلمة المرور"
          type="password"
          isPassword
          value={formData.confirmPassword}
          onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
          error={errors.confirmPassword}
        />

        <AuthButton onClick={handleSignup} className="mt-2 mb-6">
          إنشاء حساب جديد
        </AuthButton>

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

// ----------------------------------------------------------------------------
// 3. OTP SCREEN
// ----------------------------------------------------------------------------
export const OTPScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input
    if (element.value && element.nextSibling) {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  return (
    <div className="flex flex-col h-full px-6 pt-10 pb-safe">
      <div className="w-full flex justify-end mb-8">
         <button onClick={() => onNavigate('signup')} className="p-2 text-gray-600">
           <ArrowLeft size={24} />
         </button>
       </div>

      <div className="flex flex-col items-center flex-1 text-center">
        <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-[#5CAAF8]">
            <Smartphone size={40} />
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-2">تحقق من البريد الإلكتروني</h2>
        <p className="text-gray-500 text-sm mb-1">أدخل الرمز المرسل إلى</p>
        <p className="text-[#5CAAF8] dir-ltr mb-10">ola@gmail.com</p>

        <div className="flex gap-2 mb-8 dir-ltr" style={{ direction: 'ltr' }}>
            {otp.map((data, index) => (
                <input
                    key={index}
                    type="text"
                    maxLength={1}
                    className="w-10 h-12 md:w-12 md:h-14 border-2 border-gray-200 rounded-lg text-center text-xl font-bold focus:border-[#5CAAF8] focus:outline-none transition-colors"
                    value={data}
                    onChange={e => handleChange(e.target, index)}
                    onFocus={e => e.target.select()}
                />
            ))}
        </div>

        <div className="text-sm text-gray-500 mb-8">
            إعادة إرسال خلال <span className="text-[#5CAAF8] font-bold">00:48</span>
        </div>

        <AuthButton onClick={() => onNavigate('success-signup')}>
            تحقق
        </AuthButton>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------------
// 4. FORGOT PASSWORD SCREEN
// ----------------------------------------------------------------------------
export const ForgotPasswordScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
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
        <AuthInput 
          label="البريد الإلكتروني *"
          placeholder="أدخل البريد الإلكتروني"
          icon={<Mail size={20} />}
        />

        <AuthButton onClick={() => onNavigate('reset-password')} className="mt-4">
            إرسال رمز التحقق
        </AuthButton>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------------
// 5. RESET PASSWORD SCREEN
// ----------------------------------------------------------------------------
export const ResetPasswordScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
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
        <AuthInput 
          label="أنشئ كلمة مرور جديدة *"
          placeholder="أدخل كلمة مرور جديدة"
          isPassword
        />
        <AuthInput 
          label="تأكيد كلمة المرور الجديدة *"
          placeholder="تأكيد كلمة المرور"
          isPassword
        />

        <AuthButton onClick={() => onNavigate('success-reset')} className="mt-4">
            تعيين كلمة المرور
        </AuthButton>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------------
// 6. SUCCESS SCREEN (Generic)
// ----------------------------------------------------------------------------
interface SuccessProps extends ScreenProps {
  title: string;
  subtitle: string;
  buttonText?: string;
}

export const SuccessScreen: React.FC<SuccessProps> = ({ onNavigate, title, subtitle, buttonText = "المتابعة" }) => {
  return (
    <div className="flex flex-col h-full items-center justify-center px-6 pt-10 pb-safe relative overflow-hidden">
       {/* Confetti Background Effect (CSS only for simplicity) */}
       <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 text-yellow-400 animate-bounce">★</div>
          <div className="absolute top-20 right-20 text-blue-400 animate-pulse">●</div>
          <div className="absolute bottom-40 left-1/4 text-red-400 animate-spin">■</div>
          <div className="absolute top-1/3 right-10 text-green-400 text-xl">✦</div>
       </div>

       <div className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center mb-6 relative">
           <div className="absolute -top-2 -right-2 text-4xl animate-bounce">🎉</div>
           <CheckCircle size={60} className="text-[#5CAAF8]" />
       </div>

       <h2 className="text-2xl font-bold text-[#5CAAF8] mb-2">{title}</h2>
       <p className="text-gray-500 mb-12 text-center max-w-xs">{subtitle}</p>

       <AuthButton onClick={() => onNavigate('login')} className="w-full max-w-xs">
         {buttonText}
       </AuthButton>
    </div>
  );
};
