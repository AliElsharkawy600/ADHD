export interface SlideData {
  id: number;
  title: string;
  description: string;
  isLast?: boolean;
}

export interface ScreenProps {
  onNavigate: (screen: string, params?: any) => void;
  params?: any;
}

// أضف هذا للكود الموجود عندك
export interface GameData {
  id: number;
  title: string;
  description: string;
  isPremium: boolean;
  icon: string;
}

export interface ScreenProps {
  onNavigate: (screen: string, params?: any) => void;
  params?: any;
}
