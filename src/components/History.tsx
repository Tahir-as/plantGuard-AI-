import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { db, auth } from '../firebase';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { ScanRecord } from '../types';
import { formatDate, cn } from '../lib/utils';
import { motion } from 'framer-motion';
import { ChevronRight, Calendar, Leaf, History as HistoryIcon } from 'lucide-react';

export const History: React.FC = () => {
  const { t } = useTranslation();
  const [scans, setScans] = useState<ScanRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, 'scans'),
      where('userId', '==', auth.currentUser.uid),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const scanData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ScanRecord[];
      setScans(scanData);
      setLoading(false);
    }, (error) => {
      console.error("History Error:", error);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5A5A40]"></div></div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-light mb-8 text-[#5A5A40]">{t('history')}</h2>
      
      {scans.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-[32px] border border-[#e5e5e0]">
          <History size={48} className="mx-auto text-[#5A5A40]/20 mb-4" />
          <p className="text-[#5A5A40]/60">{t('no_history')}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {scans.map((scan, index) => (
            <motion.div
              key={scan.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white p-4 rounded-2xl border border-[#e5e5e0] flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                <img src={scan.imageUrl} alt={scan.diseaseName} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-1">
                  <Leaf size={14} className="text-[#5A5A40]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#5A5A40]/60">{scan.plantType}</span>
                </div>
                <h3 className="font-bold text-lg leading-tight">{scan.diseaseName}</h3>
                <div className="flex items-center gap-2 text-xs text-[#1a1a1a]/40 mt-1">
                  <Calendar size={12} />
                  {formatDate(scan.timestamp)}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                  scan.severity === 'high' ? "bg-red-100 text-red-600" :
                  scan.severity === 'medium' ? "bg-orange-100 text-orange-600" :
                  "bg-green-100 text-green-600"
                )}>
                  {scan.severity}
                </div>
                <ChevronRight size={20} className="text-[#5A5A40]/20 group-hover:text-[#5A5A40] transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
