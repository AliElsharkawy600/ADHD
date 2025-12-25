import React, { useState } from 'react';
import { User, AlertCircle, Phone } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { ScreenProps } from '../../types';
import { setupChildProfile } from '../../services/authApi';
import { useAuth } from '../../context/AuthContext';

export const ChildSetupScreen: React.FC<ScreenProps> = ({ onNavigate, params }) => {
  const [name, setName] = useState('');
  const [parentPhoneNumber, setParentPhoneNumber] = useState('');
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  
  // نستقبل التوكن المؤقت من الشاشة السابقة
  const tempToken = params?.token;
  const password = params?.password;

  const handleSubmit = async () => {
    if (!name || !age || !parentPhoneNumber) {
        setError('الرجاء إدخال اسم وعمر الطفل وهاتف ولي الامر');
        return;
    }

    const fullNameRegex = /^[^\s]+(\s+[^\s]+){3,}$/;
    if (!fullNameRegex.test(name.trim())) {
        setError('الرجاء إدخال اسم الطفل رباعي');
        return;
    }
    const parentPhoneNumberRegex = /^(010|011|012|015)[0-9]{8}$/;
    if (!parentPhoneNumberRegex.test(parentPhoneNumber.trim())) {
        setError('رقم الهاتف غير صحيح');
        return;
    }

    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 3 || ageNum > 9) {
        setError('يجب أن يتراوح عمر الطفل من 3 إلى 9 سنوات');
        return;
    }

    if (!tempToken) {
        setError('حدث خطأ في المصادقة، يرجى تسجيل الدخول مرة أخرى');
        setTimeout(() => onNavigate('login'), 2000);
        return;
    }

    setLoading(true);
    setError('');

    try {
      // 1. إرسال البيانات للباك إند
      await setupChildProfile({ name, age: ageNum , parentPhoneNumber }, tempToken);
      
      // 2. تفعيل تسجيل الدخول في التطبيق
      login(tempToken);
      
    } catch (err: any) {
      setError(err.message || 'حدث خطأ أثناء حفظ البيانات');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full px-6 pt-12 pb-safe bg-white overflow-y-auto no-scrollbar">
      
      {/* Header Section */}
      <div className="text-center mb-10 mt-4">
        <h2 className="text-xl md:text-2xl font-bold text-[#5CAAF8] mb-2 leading-relaxed">
          تم إنشاء حساب ولي الأمر بنجاح.
        </h2>
        <p className="text-gray-600 font-medium">
          لنبدأ الآن بإعداد ملف طفلك.
        </p>
      </div>

      {/* Form Section */}
      <div className="flex-1 space-y-6">
        
        <Input
          label="ادخل اسم طفلك"
          placeholder="اسم طفلك"
          value={name}
          onChange={(e) => setName(e.target.value)}
          icon={<User size={20} />}
        />
        <Input
          label="ادخل رقم ولي الامر"
          placeholder="رقم ولي الامر"
          value={parentPhoneNumber}
          onChange={(e) => setParentPhoneNumber(e.target.value)}
          icon={<Phone size={20} />}
        />

        <div className="relative">
            <Input
            label="ادخل عمر طفلك"
            placeholder="عمر طفلك"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            icon={<User size={20} />}
            />
            <p className="text-xs text-gray-400 text-right mt-1 px-1">
                يجب أن يتراوح عمره من 3 إلى 9 سنوات
            </p>
        </div>

        {error && (
            <div className="flex items-center justify-center gap-2 text-red-500 text-sm bg-red-50 p-3 rounded-xl">
                <AlertCircle size={16} />
                <span>{error}</span>
            </div>
        )}

      </div>

      {/* Footer Button */}
      <div className="mb-6">
        <Button onClick={handleSubmit} disabled={loading}>
            {loading ? 'جاري الحفظ...' : 'المتابعة'}
        </Button>
      </div>
    </div>
  );
};