/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import LandingScreen from './screens/LandingScreen';
import UploadScreen from './screens/UploadScreen';
import ProcessingScreen from './screens/ProcessingScreen';
import DashboardScreen from './screens/DashboardScreen';
import { DashboardData } from './types';

export default function App() {
  const [screen, setScreen] = useState<'LANDING' | 'UPLOAD' | 'PROCESSING' | 'DASHBOARD'>('LANDING');
  const [data, setData] = useState<DashboardData | null>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-slate-200 font-sans selection:bg-indigo-500/30">
      {screen === 'LANDING' && <LandingScreen onDemo={() => { setUploadFile(null); setScreen('PROCESSING'); }} onUpload={() => setScreen('UPLOAD')} />}
      {screen === 'UPLOAD' && <UploadScreen onUploadStart={(file) => { setUploadFile(file); setScreen('PROCESSING'); }} onBack={() => setScreen('LANDING')} />}
      {screen === 'PROCESSING' && <ProcessingScreen file={uploadFile} setData={setData} onComplete={() => setScreen('DASHBOARD')} />}
      {screen === 'DASHBOARD' && data && <DashboardScreen data={data} onExit={() => setScreen('LANDING')} />}
    </div>
  );
}
