import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { DiseaseInfo } from '../types';
import { Plus, Trash2, Edit2, ShieldCheck, BarChart3, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export const Admin: React.FC = () => {
  const { t } = useTranslation();
  const [diseases, setDiseases] = useState<DiseaseInfo[]>([]);
  const [stats, setStats] = useState({ totalScans: 0, totalUsers: 0 });
  const [isAdding, setIsAdding] = useState(false);
  const [newDisease, setNewDisease] = useState<Partial<DiseaseInfo>>({
    name: '',
    plantType: '',
    description: '',
    treatment: '',
    prevention: '',
    severity: 'low'
  });

  useEffect(() => {
    const q = query(collection(db, 'diseases'), orderBy('name'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setDiseases(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as DiseaseInfo[]);
    });

    // Mock stats for now
    onSnapshot(collection(db, 'scans'), (snap) => setStats(s => ({ ...s, totalScans: snap.size })));
    onSnapshot(collection(db, 'users'), (snap) => setStats(s => ({ ...s, totalUsers: snap.size })));

    return unsubscribe;
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await addDoc(collection(db, 'diseases'), newDisease);
    setIsAdding(false);
    setNewDisease({ name: '', plantType: '', description: '', treatment: '', prevention: '', severity: 'low' });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Delete this disease entry?")) {
      await deleteDoc(doc(db, 'diseases', id));
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-light text-[#5A5A40] flex items-center gap-3">
          <ShieldCheck size={32} />
          {t('admin')}
        </h2>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-6 py-2 bg-[#5A5A40] text-white rounded-full font-medium"
        >
          <Plus size={20} />
          Add Disease
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[32px] border border-[#e5e5e0] flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
            <BarChart3 size={24} />
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-[#1a1a1a]/40 font-bold">Total Scans</p>
            <p className="text-2xl font-bold">{stats.totalScans}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[32px] border border-[#e5e5e0] flex items-center gap-4">
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center">
            <Users size={24} />
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-[#1a1a1a]/40 font-bold">Total Users</p>
            <p className="text-2xl font-bold">{stats.totalUsers}</p>
          </div>
        </div>
      </div>

      {/* Disease List */}
      <div className="bg-white rounded-[32px] border border-[#e5e5e0] overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#f5f5f0] border-b border-[#e5e5e0]">
            <tr>
              <th className="px-6 py-4 text-xs uppercase tracking-widest font-bold text-[#5A5A40]/60">Disease Name</th>
              <th className="px-6 py-4 text-xs uppercase tracking-widest font-bold text-[#5A5A40]/60">Plant Type</th>
              <th className="px-6 py-4 text-xs uppercase tracking-widest font-bold text-[#5A5A40]/60">Severity</th>
              <th className="px-6 py-4 text-xs uppercase tracking-widest font-bold text-[#5A5A40]/60">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0f0f0]">
            {diseases.map((disease) => (
              <tr key={disease.id} className="hover:bg-[#f5f5f0]/50 transition-colors">
                <td className="px-6 py-4 font-bold">{disease.name}</td>
                <td className="px-6 py-4 text-[#1a1a1a]/60">{disease.plantType}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                    disease.severity === 'high' ? 'bg-red-100 text-red-600' :
                    disease.severity === 'medium' ? 'bg-orange-100 text-orange-600' :
                    'bg-green-100 text-green-600'
                  }`}>
                    {disease.severity}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button className="p-2 text-[#5A5A40] hover:bg-[#5A5A40]/10 rounded-lg transition-colors">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => handleDelete(disease.id!)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      {isAdding && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-[40px] p-8 max-w-lg w-full">
            <h3 className="text-2xl font-bold mb-6">Add New Disease</h3>
            <form onSubmit={handleAdd} className="space-y-4">
              <input
                placeholder="Disease Name"
                className="w-full p-4 rounded-2xl bg-[#f5f5f0] border-none focus:ring-2 ring-[#5A5A40]"
                value={newDisease.name}
                onChange={e => setNewDisease({ ...newDisease, name: e.target.value })}
                required
              />
              <input
                placeholder="Plant Type"
                className="w-full p-4 rounded-2xl bg-[#f5f5f0] border-none focus:ring-2 ring-[#5A5A40]"
                value={newDisease.plantType}
                onChange={e => setNewDisease({ ...newDisease, plantType: e.target.value })}
                required
              />
              <select
                className="w-full p-4 rounded-2xl bg-[#f5f5f0] border-none focus:ring-2 ring-[#5A5A40]"
                value={newDisease.severity}
                onChange={e => setNewDisease({ ...newDisease, severity: e.target.value as any })}
              >
                <option value="low">Low Severity</option>
                <option value="medium">Medium Severity</option>
                <option value="high">High Severity</option>
              </select>
              <textarea
                placeholder="Treatment"
                className="w-full p-4 rounded-2xl bg-[#f5f5f0] border-none focus:ring-2 ring-[#5A5A40] h-24"
                value={newDisease.treatment}
                onChange={e => setNewDisease({ ...newDisease, treatment: e.target.value })}
                required
              />
              <div className="flex gap-4 pt-4">
                <button type="submit" className="flex-grow py-4 bg-[#5A5A40] text-white rounded-full font-bold">Save Disease</button>
                <button type="button" onClick={() => setIsAdding(false)} className="px-8 py-4 border border-[#e5e5e0] rounded-full font-bold">Cancel</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
