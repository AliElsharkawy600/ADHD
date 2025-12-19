export interface SlideData {
  id: number;
  title: string;
  description: string;
  isLast?: boolean;
}

export interface ScreenProps {
  onNavigate: (screen: string) => void;
}
