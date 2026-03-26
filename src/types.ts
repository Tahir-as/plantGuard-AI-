export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  preferredLanguage: 'en' | 'ur' | 'sd' | 'pa';
  role: 'user' | 'admin';
  createdAt: string;
}

export interface ScanRecord {
  id?: string;
  userId: string;
  imageUrl: string;
  diseaseName: string;
  confidence: number;
  plantType: string;
  treatment: string;
  prevention: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
}

export interface DiseaseInfo {
  id?: string;
  name: string;
  plantType: string;
  description: string;
  treatment: string;
  prevention: string;
  severity: 'low' | 'medium' | 'high';
}
