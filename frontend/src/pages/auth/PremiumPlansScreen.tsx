export const PremiumPlansScreen = ({ onNavigate }: any) => {
  return (
    <div className="h-full bg-white p-6 dir-rtl text-right">
      <div className="flex justify-between items-center mb-8">
        <button onClick={() => onNavigate('visual-games')} className="text-blue-500">{'->'}</button>
        <h2 className="text-xl font-bold">اختر باقتك</h2>
        <div></div>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-blue-900 mb-2">استثمر في مستقبل طفلك</h1>
        <p className="text-gray-500 italic">افتح عالماً من التعلم الممتع مع محتوى تعليمي احترافي</p>
      </div>

      <div className="border-2 border-green-400 rounded-3xl p-6 relative bg-green-50/30">
        <span className="absolute -top-3 right-8 bg-white px-3 text-green-500 text-sm font-bold">الباقة المميزة</span>
        <h3 className="text-xl font-bold mb-4">الاشتراك السنوي</h3>
        <div className="text-3xl font-black text-blue-900 mb-1">899 ج.م</div>
        <p className="text-gray-400 text-sm line-through mb-6">1188 ج.م وفر 289 ج.م</p>
        
        <ul className="space-y-3 mb-8">
          {['فتح جميع المستويات والألعاب', 'تقارير أداء تفصيلية', 'قصص تعليمية متخصصة', 'دعم فني مميز'].map(item => (
            <li key={item} className="flex items-center text-sm font-medium">
              <span className="text-green-500 ml-2">✓</span> {item}
            </li>
          ))}
        </ul>

        <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold">
          ابدأ الاشتراك السنوي
        </button>
      </div>
    </div>
  );
};