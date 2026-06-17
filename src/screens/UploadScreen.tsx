import { useState } from "react";
import { Upload, X, File as FileIcon, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { uploadCandidatesAndRank } from "../api";
import { DashboardData } from "../types";
import { cn } from "../lib/utils";

interface Props {
  onUploadStart: (file: File) => void;
  onBack: () => void;
}

export default function UploadScreen({ onUploadStart, onBack }: Props) {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const f = e.dataTransfer.files[0];
      if (f.name.endsWith('.zip') || f.name.endsWith('.jsonl')) {
         setFile(f);
      } else {
         alert("Please upload a .zip or .jsonl file");
      }
    }
  };

  const handleProcess = () => {
    if (file) {
      onUploadStart(file);
    }
  };

  return (
    <div className="min-h-screen bg-black p-6 lg:p-12 relative flex flex-col items-center justify-center">
      <button 
        onClick={onBack}
        className="absolute top-8 left-8 text-slate-400 hover:text-white flex items-center gap-2 text-sm"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl"
      >
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-semibold mb-2">Upload Dataset</h2>
          <p className="text-slate-400">Supported formats: .zip, .jsonl</p>
        </div>

        {!file ? (
          <div 
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={cn(
              "border-2 border-dashed rounded-xl p-16 flex flex-col items-center justify-center text-center transition-colors",
              dragActive ? "border-indigo-500 bg-indigo-500/5" : "border-slate-800 bg-slate-900/20 hover:border-slate-700"
            )}
          >
             <Upload className="w-10 h-10 text-slate-400 mb-4" />
             <p className="text-lg font-medium text-slate-200 mb-1">Drag and drop your file here</p>
             <p className="text-slate-500 text-sm mb-6">or click to browse</p>
             <label className="px-6 py-2 bg-white/10 hover:bg-white/15 text-white text-sm font-medium rounded-lg cursor-pointer transition-colors">
               Select File
               <input 
                 type="file" 
                 className="hidden" 
                 accept=".zip,.jsonl" 
                 onChange={(e) => {
                   if (e.target.files?.[0]) setFile(e.target.files[0]);
                 }} 
               />
             </label>
          </div>
        ) : (
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 flex flex-col items-center">
             <div className="w-16 h-16 bg-indigo-500/10 rounded-full flex items-center justify-center mb-4">
               <FileIcon className="w-8 h-8 text-indigo-400" />
             </div>
             <h3 className="text-xl font-medium mb-1">{file.name}</h3>
             <p className="text-slate-500 text-sm mb-8">{(file.size / 1024 / 1024).toFixed(2)} MB • Ready for intelligence extraction</p>
             
             <div className="flex gap-4 w-full justify-center">
               <button 
                 onClick={() => setFile(null)}
                 className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
               >
                 <X className="w-4 h-4" /> Cancel
               </button>
               <button 
                 onClick={handleProcess}
                 className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
               >
                 Extract Intelligence <ArrowRight className="w-4 h-4" />
               </button>
             </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
