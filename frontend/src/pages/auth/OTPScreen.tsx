import React, { useState } from 'react';
import { Smartphone, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { ScreenProps } from '../../types';
import { verifyEmail } from '../../services/authApi';

export const OTPScreen: React.FC<ScreenProps> = ({ onNavigate, params }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Get email from previous screen
  const email = params?.email || '';

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

  const handleVerify = async () => {
    const code = otp.join('');
    if (code.length !== 6) {
      setError('الرجاء إدخال الرمز كاملاً');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await verifyEmail({ email, code });
      onNavigate('success-signup');
    } catch (err: any) {
      setError(err.message || 'رمز التحقق غير صحيح');
    } finally {
      setLoading(false);
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
        <p className="text-[#5CAAF8] dir-ltr mb-6">{email}</p>

        <div className="flex gap-2 mb-4 dir-ltr" style={{ direction: 'ltr' }}>
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

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="text-sm text-gray-500 mb-8">
          إعادة إرسال خلال <span className="text-[#5CAAF8] font-bold">00:48</span>
        </div>

        <Button onClick={handleVerify} disabled={loading}>
          {loading ? 'جاري التحقق...' : 'تحقق'}
        </Button>
      </div>
    </div>
  );
};