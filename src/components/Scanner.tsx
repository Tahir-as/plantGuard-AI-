import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Camera, Upload, X, Loader2, CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { identifyPlantDisease, ScanResult } from '../services/gemini';
import { db, auth } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { cn } from '../lib/utils';

export const Scanner: React.FC = () => {
  const { t } = useTranslation();
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("File size exceeds 5MB limit.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      setIsCameraOpen(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setError("Unable to access camera.");
      setIsCameraOpen(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(videoRef.current, 0, 0);
      const dataUrl = canvas.toDataURL('image/jpeg');
      setImage(dataUrl);
      
      // Stop camera
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      setIsCameraOpen(false);
    }
  };

  const analyzeImage = async () => {
    if (!image) return;
    setLoading(true);
    setError(null);
    try {
      const scanResult = await identifyPlantDisease(image);
      setResult(scanResult);
      
      // Save to Firestore
      if (auth.currentUser) {
        await addDoc(collection(db, 'scans'), {
          userId: auth.currentUser.uid,
          imageUrl: image, // In production, upload to Storage first
          ...scanResult,
          timestamp: new Date().toISOString()
        });
      }
    } catch (err) {
      setError("Failed to analyze image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setImage(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-[32px] p-8 shadow-sm border border-[#e5e5e0]">
        <h2 className="text-3xl font-light mb-6 text-[#5A5A40]">{t('scan_plant')}</h2>
        
        {!image && !isCameraOpen && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={startCamera}
              className="flex flex-col items-center justify-center gap-4 p-8 border-2 border-dashed border-[#5A5A40]/20 rounded-2xl hover:bg-[#f5f5f0] transition-colors group"
            >
              <Camera size={48} className="text-[#5A5A40] opacity-60 group-hover:opacity-100" />
              <span className="font-medium">{t('capture')}</span>
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center justify-center gap-4 p-8 border-2 border-dashed border-[#5A5A40]/20 rounded-2xl hover:bg-[#f5f5f0] transition-colors group"
            >
              <Upload size={48} className="text-[#5A5A40] opacity-60 group-hover:opacity-100" />
              <span className="font-medium">{t('upload')}</span>
              <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" className="hidden" />
            </button>
          </div>
        )}

        {isCameraOpen && (
          <div className="relative rounded-2xl overflow-hidden bg-black aspect-square">
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4">
              <button onClick={capturePhoto} className="w-16 h-16 bg-white rounded-full border-4 border-[#5A5A40] flex items-center justify-center shadow-lg">
                <div className="w-12 h-12 bg-[#5A5A40] rounded-full" />
              </button>
              <button onClick={() => setIsCameraOpen(false)} className="absolute right-6 top-0 text-white bg-black/50 p-2 rounded-full">
                <X size={24} />
              </button>
            </div>
          </div>
        )}

        {image && !isCameraOpen && (
          <div className="space-y-6">
            <div className="relative rounded-2xl overflow-hidden aspect-square bg-[#f5f5f0]">
              <img src={image} alt="Preview" className="w-full h-full object-cover" />
              {!loading && !result && (
                <button onClick={reset} className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors">
                  <X size={20} />
                </button>
              )}
            </div>

            {!result && (
              <button
                onClick={analyzeImage}
                disabled={loading}
                className="w-full py-4 bg-[#5A5A40] text-white rounded-full font-medium text-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" /> : <ShieldAlert size={20} />}
                {loading ? t('detecting') : t('scan_plant')}
              </button>
            )}

            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-2">
                <AlertTriangle size={20} />
                {error}
              </div>
            )}

            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6 pt-6 border-t border-[#f0f0f0]"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-medium text-[#5A5A40]">{t('result')}</h3>
                    <div className="flex items-center gap-1 text-green-600 font-bold">
                      <CheckCircle2 size={20} />
                      {Math.round(result.confidence * 100)}% {t('accuracy')}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-[#f5f5f0] rounded-2xl">
                      <p className="text-xs uppercase tracking-widest text-[#5A5A40]/60 mb-1">{t('disease')}</p>
                      <p className="font-bold text-lg">{result.diseaseName}</p>
                    </div>
                    <div className="p-4 bg-[#f5f5f0] rounded-2xl">
                      <p className="text-xs uppercase tracking-widest text-[#5A5A40]/60 mb-1">{t('plant_type')}</p>
                      <p className="font-bold text-lg">{result.plantType}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-6 bg-white border border-[#e5e5e0] rounded-2xl">
                      <h4 className="font-bold text-[#5A5A40] mb-2 flex items-center gap-2">
                        <ShieldAlert size={18} />
                        {t('treatment')}
                      </h4>
                      <p className="text-sm leading-relaxed text-[#1a1a1a]/80">{result.treatment}</p>
                    </div>
                    <div className="p-6 bg-white border border-[#e5e5e0] rounded-2xl">
                      <h4 className="font-bold text-[#5A5A40] mb-2 flex items-center gap-2">
                        <CheckCircle2 size={18} />
                        {t('prevention')}
                      </h4>
                      <p className="text-sm leading-relaxed text-[#1a1a1a]/80">{result.prevention}</p>
                    </div>
                  </div>

                  <button
                    onClick={reset}
                    className="w-full py-4 border border-[#5A5A40] text-[#5A5A40] rounded-full font-medium hover:bg-[#5A5A40]/5 transition-colors"
                  >
                    {t('scan_plant')}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};
