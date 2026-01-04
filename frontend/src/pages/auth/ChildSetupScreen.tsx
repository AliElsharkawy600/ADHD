import React, { useState } from "react";
import { User, AlertCircle, Phone, MapPin, Calendar } from "lucide-react";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { ScreenProps } from "../../types";
import { setupChildProfile } from "../../services/authApi";
import { useAuth } from "../../context/AuthContext";

export const ChildSetupScreen: React.FC<ScreenProps> = ({
  onNavigate,
  params,
}) => {
  const [name, setName] = useState("");
  const [parentPhoneNumber, setParentPhoneNumber] = useState("");
  const [birthDate, setBirthDate] = useState("");
  // Split address state
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const [gender, setGender] = useState<"male" | "female" | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const tempToken = params?.token;

  const calculateAge = (dateString: string) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

const handleSubmit = async () => {
  setError("");

  if (
    !name ||
    !birthDate ||
    !parentPhoneNumber ||
    !city ||
    !country ||
    !gender
  ) {
    setError("الرجاء ملء جميع الحقول");
    return;
  }

  // Name Validation
  const nameParts = name.trim().split(/\s+/);
  if (nameParts.length < 4) {
    setError("الرجاء إدخال اسم الطفل رباعي");
    return;
  }

  // Phone Validation
  const parentPhoneNumberRegex = /^(010|011|012|015)[0-9]{8}$/;
  if (!parentPhoneNumberRegex.test(parentPhoneNumber.trim())) {
    setError("رقم الهاتف غير صحيح");
    return;
  }

  // Age Validation
  const age = calculateAge(birthDate);
  if (age < 3 || age > 9) {
    setError("يجب أن يتراوح عمر الطفل من 3 إلى 9 سنوات");
    return;
  }

  if (!tempToken) {
    setError("خطأ في المصادقة");
    setTimeout(() => onNavigate("login"), 2000);
    return;
  }

  setLoading(true);

  try {
    // التعديل هنا فقط لاستلام الريسبونس وتخزينه
    const response = await setupChildProfile(
      {
        name,
        birthDate,
        gender: gender as "male" | "female",
        country,
        city,
        parentPhoneNumber,
      },
      tempToken
    );
     console.log("Child profile setup response:", response);
     
    // تخزين الـ childId في الـ localStorage
    if (response && response.childId) {
      localStorage.setItem("childId", response.childId);
    }

    login(tempToken, { name: name, gender: gender as "male" | "female" });
  } catch (err: any) {
    setError(err.message || "حدث خطأ أثناء حفظ البيانات");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex flex-col h-full px-6 pt-12 pb-safe bg-white overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-[#5CAAF8] mb-2 leading-relaxed">
          تم إنشاء حسابك كولي أمر بنجاح.
        </h2>
        <p className="text-gray-500 text-sm">لنبدأ الآن بإعداد ملف طفلك.</p>
      </div>

      {/* Form Fields */}
      <div className="flex-1 space-y-2">
        {/* Name */}
        <Input
          label="ادخل اسم طفلك رباعي"
          placeholder="اسم طفلك"
          value={name}
          onChange={(e) => setName(e.target.value)}
          icon={<User size={20} />}
        />

        {/* Phone */}
        <Input
          label="ادخل رقم ولي الامر"
          type="tel"
          placeholder="رقم ولي الامر"
          value={parentPhoneNumber}
          onChange={(e) => setParentPhoneNumber(e.target.value)}
          icon={<Phone size={20} />}
        />

        {/* Birth Date */}
        <div className="relative">
            <Input
            label="ادخل تاريخ ميلاد طفلك"
            type="date"
            placeholder="يوم/شهر/سنة"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            style={{ direction: "rtl" }}
            // Fallback icon visually (The native date picker has its own icon usually)
            // icon={<Calendar size={20} />} 
            />
             <p className="text-[10px] text-gray-400 text-right -mt-3 mb-3 px-1">
                يجب أن يتراوح عمره من 3 إلى 9 سنوات
            </p>
        </div>

        {/* Address - Split Layout using Flexbox */}
        <div>
          <label className="text-gray-600 text-sm font-semibold block text-right mb-1.5 px-1">
            العنوان
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
                <Input
                    label="" // Empty label because we used a shared label above
                    placeholder="مصر"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    icon={<MapPin size={20} />}
                    className="mb-0" // Reset margin for cleaner alignment
                />
            </div>
            <div className="flex-1">
                <Input
                    label=""
                    placeholder="القاهرة"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    icon={<MapPin size={20} />}
                    className="mb-0"
                />
            </div>
          </div>
        </div>

        {/* Gender Selection - Custom UI matching Input Style */}
        <div className="mt-4">
          <label className="text-gray-600 text-sm font-semibold block text-right mb-1.5 px-1">
            اختار جنس طفلك
          </label>
          <div className="flex gap-3">
            
            {/* Male Option */}
            <label
              className={`
                  flex-1 flex items-center justify-between px-4 py-3.5 rounded-xl border cursor-pointer transition-all duration-200
                  ${
                    gender === "male"
                      ? "border-[#5CAAF8] bg-blue-50/50 text-[#5CAAF8] ring-1 ring-blue-100"
                      : "border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100"
                  }
              `}
            >
              <div className="flex items-center gap-3 w-full">
                <span className="font-bold text-sm flex-1 text-right">ولد</span>
                <div
                  className={`
                          w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center transition-colors
                          ${
                            gender === "male"
                              ? "border-[#5CAAF8]"
                              : "border-gray-300"
                          }
                      `}
                >
                  {gender === "male" && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#5CAAF8]" />
                  )}
                </div>
              </div>
              <input
                type="radio"
                name="gender"
                value="male"
                className="hidden"
                checked={gender === "male"}
                onChange={() => setGender("male")}
              />
            </label>

            {/* Female Option */}
            <label
              className={`
                  flex-1 flex items-center justify-between px-4 py-3.5 rounded-xl border cursor-pointer transition-all duration-200
                  ${
                    gender === "female"
                      ? "border-[#5CAAF8] bg-blue-50/50 text-[#5CAAF8] ring-1 ring-blue-100"
                      : "border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100"
                  }
              `}
            >
              <div className="flex items-center gap-3 w-full">
                <span className="font-bold text-sm flex-1 text-right">بنت</span>
                <div
                  className={`
                          w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center transition-colors
                          ${
                            gender === "female"
                              ? "border-[#5CAAF8]"
                              : "border-gray-300"
                          }
                      `}
                >
                  {gender === "female" && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#5CAAF8]" />
                  )}
                </div>
              </div>
              <input
                type="radio"
                name="gender"
                value="female"
                className="hidden"
                checked={gender === "female"}
                onChange={() => setGender("female")}
              />
            </label>
          </div>
        </div>

        {error && (
          <div className="flex items-center justify-center gap-2 text-red-500 text-sm bg-red-50 p-3 rounded-xl mt-4">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Footer Button */}
      <div className="mt-8 mb-6">
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "جاري الحفظ..." : "المتابعة"}
        </Button>
      </div>
    </div>
  );
};