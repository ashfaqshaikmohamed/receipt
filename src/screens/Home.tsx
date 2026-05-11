import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  ReceiptText, 
  LogOut, 
  History as HistoryIcon, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  AlertCircle,
  Calculator,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user, signInWithGoogle, signOut, loading, authError, setAuthError } = useAuth();
  const [showDemo, setShowDemo] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  // Custom cursor movement
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  // Lock scroll when modal is open
  useEffect(() => {
    if (showDemo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setCurrentSlide(0); // Reset slide on close
    }
  }, [showDemo]);

  const dots = [0, 1, 2, 3];

  const handleNext = () => {
    if (currentSlide < 3) setCurrentSlide(s => s + 1);
  };

  const handlePrev = () => {
    if (currentSlide > 0) setCurrentSlide(s => s - 1);
  };

  return (
    <>
      <div className="custom-cursor hidden md:block" style={{ left: cursorPos.x, top: cursorPos.y }} />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 flex flex-col items-center justify-between p-6 bg-background overflow-hidden"
      >
        {/* SVG Noise Texture Overlay */}
        <div className="absolute inset-0 noise-overlay z-10" />

        {/* Animated Background Gradient */}
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 50% 50%, #0d0d18 0%, #0a0a0f 100%)',
              'radial-gradient(circle at 10% 20%, #1a1a35 0%, #0a0a0f 100%)',
              'radial-gradient(circle at 90% 80%, #15152a 0%, #0a0a0f 100%)',
              'radial-gradient(circle at 50% 50%, #0d0d18 0%, #0a0a0f 100%)',
            ],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        />

        {/* Floating Abstract Visuals */}
        <div className="absolute inset-x-0 top-[25%] bottom-[40%] flex items-center justify-center pointer-events-none z-0 overflow-hidden">
           <motion.div 
             animate={{ 
               y: [0, -20, 0],
               rotate: [0, 5, 0],
               opacity: [0.3, 0.4, 0.3]
             }}
             transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
             className="w-[400px] h-[400px] border border-accent/10 rounded-full flex items-center justify-center"
           >
              <div className="w-[300px] h-[300px] border border-accent/5 rounded-full" />
           </motion.div>
        </div>

        <div className="relative z-20 flex-1 flex flex-col items-center justify-center text-center mt-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            style={{ animation: 'pulse-glow 4s infinite ease-in-out' }}
            className="w-16 h-16 bg-gradient-to-br from-accent to-accent-soft rounded-2xl flex items-center justify-center mb-10 shadow-glow"
          >
            <ReceiptText size={32} className="text-white" />
          </motion.div>
          
          <motion.div className="space-y-4">
            <motion.h1
              initial={{ filter: 'blur(8px)', opacity: 0, y: 10 }}
              animate={{ filter: 'blur(0)', opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="text-6xl font-display leading-[0.9] tracking-tight"
            >
              Split bills.<br />
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="text-accent"
              >
                No awkwardness.
              </motion.span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-text-secondary text-lg max-w-[280px] mx-auto font-medium"
            >
              The itemized split that actually text everyone for you.
            </motion.p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            onClick={() => setShowDemo(true)}
            className="mt-8 text-accent font-semibold text-sm flex items-center gap-2 hover:brightness-125 active:scale-95 transition-all group"
          >
            <Sparkles size={16} />
            See how it works
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </motion.button>
        </div>

        <div className="relative z-20 w-full max-w-sm mb-16 space-y-6">
          {/* Auth Error Toast */}
          <AnimatePresence>
            {authError && (
              <motion.div 
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute -top-16 left-0 right-0 p-3 bg-error/10 border border-error/20 rounded-xl flex items-center gap-2 text-error text-xs font-medium"
              >
                <AlertCircle size={14} />
                <span className="flex-1">{authError}</span>
                <button onClick={() => setAuthError(null)} className="p-1"><X size={14} /></button>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            onClick={() => navigate('/setup')}
            className="w-full h-14 bg-accent text-white font-bold rounded-2xl text-lg flex items-center justify-center relative overflow-hidden group"
          >
            <span className="relative z-10 font-sans">Start New Bill</span>
            {/* Shimmer sweep */}
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 1.5, delay: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 5 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
            />
          </motion.button>
          
          <div className="pt-2">
            {!loading && (
              user ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between bg-surface/80 backdrop-blur-md border border-border p-3 rounded-2xl"
                >
                  <div className="flex items-center gap-3">
                    <img src={user.photoURL || ''} alt="" className="w-9 h-9 rounded-full border border-accent/20" />
                    <span className="text-sm font-semibold text-text-primary truncate max-w-[100px]">{user.displayName?.split(' ')[0]}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => navigate('/history')}
                      className="p-2 text-accent flex items-center gap-1 text-xs font-bold hover:bg-accent/10 rounded-xl transition-colors"
                    >
                      <HistoryIcon size={16} />
                      History
                    </button>
                    <button 
                      onClick={signOut}
                      className="p-2 text-text-secondary hover:text-text-primary transition-colors"
                    >
                      <LogOut size={16} />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.8 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={signInWithGoogle}
                  className="w-full h-12 bg-white text-[#1a1a1a] font-bold rounded-2xl flex items-center justify-center gap-3 shadow-md border-none transition-transform"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Continue with Google
                </motion.button>
              )
            )}
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="text-center text-text-secondary text-[10px] uppercase font-bold tracking-[0.2em] mt-6"
          >
            No account needed
          </motion.p>
        </div>
      </motion.div>

      {createPortal(
        <AnimatePresence>
          {showDemo && (
            <div className="fixed inset-0 z-[100] flex flex-col justify-end">
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowDemo(false)}
                className="absolute inset-0 bg-black/90 backdrop-blur-sm"
              />
              
              <motion.div
                key="modal"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 32, stiffness: 250, mass: 0.8 }}
                className="relative w-full h-[90vh] bg-[#111118] rounded-t-[40px] overflow-hidden flex flex-col shadow-2xl"
              >
                <div className="flex flex-col items-center pt-3 mb-2 px-6">
                  <div className="w-12 h-1 bg-white/10 rounded-full mb-3" />
                  <div className="w-full flex justify-end">
                    <button 
                      onClick={() => setShowDemo(false)}
                      className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                {/* Slides Container */}
                <div className="flex-1 relative overflow-hidden">
                  <motion.div 
                    className="flex h-full w-full"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(e, { offset }) => {
                      if (offset.x < -50 && currentSlide < 3) handleNext();
                      if (offset.x > 50 && currentSlide > 0) handlePrev();
                    }}
                    animate={{ x: `-${currentSlide * 100}%` }}
                    transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                  >
                    {/* Slide 1 - SCAN */}
                    <div className="w-full flex-shrink-0 flex flex-col h-full">
                      <div className="mx-6 h-[360px] bg-[#09090e] border border-white/5 rounded-3xl overflow-hidden relative flex items-center justify-center">
                        <div className="w-[180px] h-[220px] bg-[#fdfdfd] rounded-xl shadow-2xl relative p-6 flex flex-col items-center">
                          <div className="space-y-4 w-full h-full">
                            <div className="h-2 w-[130px] bg-[#ececec] rounded-full" />
                            <div className="h-2 w-[90px] bg-[#ececec] rounded-full" />
                            <div className="h-2 w-[110px] bg-[#ececec] rounded-full" />
                            <div className="mt-8 flex flex-col items-end gap-3">
                              <div className="h-2 w-[70px] bg-[#ececec] rounded-full" />
                              <div className="h-2 w-[50px] bg-[#ececec] rounded-full" />
                            </div>
                          </div>
                          
                          {/* Success Flash */}
                          <motion.div 
                            animate={{ 
                              opacity: [0, 0.4, 0],
                            }}
                            transition={{ 
                              duration: 1.8, 
                              repeat: Infinity,
                              times: [0, 0.8, 1]
                            }}
                            className="absolute inset-0 bg-success rounded-xl pointer-events-none"
                          />

                          <motion.div 
                            animate={{ y: [0, 200, 0] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                            className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#5b4fff] to-transparent shadow-[0_0_15px_#5b4fff]"
                          />
                        </div>
                      </div>
                      <div className="mt-8 px-8 text-center">
                        <h3 className="text-2xl mb-4">Scan any receipt</h3>
                        <p className="text-text-secondary leading-relaxed">
                          Photograph your bill and our AI extracts line items + prices instantly. Completely secure, private scanning.
                        </p>
                      </div>
                    </div>

                    {/* Slide 2 - ASSIGN */}
                    <div className="w-full flex-shrink-0 flex flex-col h-full">
                      <div className="mx-6 h-[360px] bg-[#09090e] border border-white/5 rounded-3xl p-6 flex flex-col">
                        <div className="flex justify-between items-center mb-8">
                          <div className="h-1.5 flex-1 bg-accent/10 rounded-full mr-4">
                            <motion.div 
                              initial={{ width: 0 }}
                              whileInView={{ width: '100%' }}
                              transition={{ duration: 1.5, delay: 0.5 }}
                              className="h-full bg-accent rounded-full" 
                            />
                          </div>
                          <span className="text-[10px] font-bold text-accent uppercase tracking-widest">COMPLETE</span>
                        </div>
                        
                        <div className="flex justify-center gap-4 mb-8">
                          <motion.div 
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                            className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-accent/20"
                          >
                            Ad
                          </motion.div>
                          <motion.div 
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                            className="w-12 h-12 rounded-full bg-[#7c3aed] flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-[#7c3aed]/20"
                          >
                            Af
                          </motion.div>
                        </div>

                        <div className="space-y-3">
                          <div className="bg-surface/50 rounded-2xl p-4 flex justify-between items-center border border-white/5">
                            <div>
                              <span className="text-xs text-white font-bold block mb-2">Truffle Pizza</span>
                              <div className="flex gap-1.5">
                                <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-[10px] font-bold text-white border-2 border-[#111118]">Ad</div>
                                <div className="w-6 h-6 rounded-full bg-[#7c3aed] flex items-center justify-center text-[10px] font-bold text-white border-2 border-[#111118]">Af</div>
                              </div>
                            </div>
                            <span className="text-sm font-bold text-accent">$24.00</span>
                          </div>
                          <div className="bg-surface/50 rounded-2xl p-4 flex justify-between items-center border border-white/5">
                            <div>
                              <span className="text-xs text-white font-bold block mb-2">Aperol Spritz</span>
                              <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-[10px] font-bold text-white">Ad</div>
                            </div>
                            <span className="text-sm font-bold text-accent">$14.00</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-8 px-8 text-center">
                        <h3 className="text-2xl mb-4">Assign in seconds</h3>
                        <p className="text-text-secondary leading-relaxed">
                          Tap person circles to claim items. Shared dishes split cost automatically. Watch everyone's total update live.
                        </p>
                      </div>
                    </div>

                    {/* Slide 3 - MATH */}
                    <div className="w-full flex-shrink-0 flex flex-col h-full">
                      <div className="mx-6 h-[360px] bg-[#09090e] border border-white/5 rounded-3xl flex flex-col p-8 overflow-hidden">
                        <div className="mb-8">
                          <p className="text-text-secondary font-bold text-xs uppercase tracking-widest mb-1">THE SPLIT</p>
                          <p className="text-3xl font-bold font-display text-accent">$38.00 total</p>
                        </div>

                        <div className="space-y-4 flex-1">
                          <motion.div 
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="bg-surface/80 rounded-2xl p-5 border border-white/5"
                          >
                            <div className="flex justify-between items-center mb-1">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white font-bold">Ad</div>
                                <span className="font-bold">Ashad</span>
                              </div>
                              <CountingValue value={21.50} />
                            </div>
                            <p className="text-[10px] text-text-secondary font-bold mt-2">Pizza share $12 · Spritz $14 · Tax split</p>
                          </motion.div>
                          
                          <motion.div 
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="bg-surface/80 rounded-2xl p-5 border border-white/5"
                          >
                            <div className="flex justify-between items-center mb-1">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#7c3aed] flex items-center justify-center text-white font-bold">Af</div>
                                <span className="font-bold">Ashfaq</span>
                              </div>
                              <CountingValue value={16.50} />
                            </div>
                            <p className="text-[10px] text-text-secondary font-bold mt-2">Pizza share $12 · Tax split proportionally</p>
                          </motion.div>
                        </div>

                        <div className="pt-4 flex items-center justify-center gap-2">
                           <Calculator size={14} className="text-accent" />
                           <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest">Fair tax + proportional split</p>
                        </div>
                      </div>
                      <div className="mt-8 px-8 text-center">
                        <h3 className="text-2xl mb-4">No math needed</h3>
                        <p className="text-text-secondary leading-relaxed">
                          Tax is automatically split by how much each person ordered. Tip divides equally. Everyone pays their fair share.
                        </p>
                      </div>
                    </div>

                    {/* Slide 4 - SEND */}
                    <div className="w-full flex-shrink-0 flex flex-col h-full">
                      <div className="mx-6 h-[360px] bg-[#09090e] border border-white/5 rounded-3xl p-6 flex flex-col overflow-hidden relative">
                        <p className="text-[10px] text-text-secondary text-center mb-6 font-bold uppercase tracking-tighter">MESSAGES</p>
                        
                        <div className="relative pl-4">
                          <motion.div 
                            initial={{ x: -50, scale: 0.8, opacity: 0 }}
                            whileInView={{ x: 0, scale: 1, opacity: 1 }}
                            transition={{ type: "spring", damping: 15, delay: 0.2 }}
                            className="bg-accent rounded-3xl rounded-tl-sm p-5 max-w-[90%] shadow-xl shadow-accent/20"
                          >
                            <p className="text-xs text-white font-medium mb-3">Hey Ashad 👋 here is your share from dinner!</p>
                            <div className="text-[11px] text-white/80 space-y-2">
                              <div className="flex justify-between">
                                <span className="font-medium">Pizza share</span>
                                <span className="font-bold">$12.00</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium">Spritz</span>
                                <span className="font-bold">$14.00</span>
                              </div>
                              <div className="h-[1px] w-full bg-white/10 my-2" />
                              <div className="flex justify-between font-bold text-white text-[13px]">
                                <span>Total share</span>
                                <span>$21.50</span>
                              </div>
                            </div>
                          </motion.div>
                        </div>

                        <div className="mt-10 flex gap-2 overflow-x-auto pb-4">
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="bg-surface border border-white/5 rounded-2xl py-2 px-4 text-xs font-bold text-accent whitespace-nowrap"
                          >
                            💸 Venmo
                          </motion.div>
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="bg-surface border border-white/5 rounded-2xl py-2 px-4 text-xs font-bold text-accent whitespace-nowrap"
                          >
                            🏦 Zelle
                          </motion.div>
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="bg-surface border border-white/5 rounded-2xl py-2 px-4 text-xs font-bold text-accent whitespace-nowrap"
                          >
                            🔐 Crypto
                          </motion.div>
                        </div>
                        
                        <div className="mt-auto flex justify-center py-2 animate-bounce">
                           <MessageSquare size={20} className="text-accent/50" />
                        </div>
                      </div>
                      <div className="mt-8 px-8 text-center">
                        <h3 className="text-2xl mb-4">One tap to notify</h3>
                        <p className="text-text-secondary leading-relaxed">
                          Each person gets an itemized SMS with their total and payment links. No more tracking down friends.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Navigation Arrows */}
                  <div className="absolute inset-x-0 top-[35%] -translate-y-1/2 flex justify-between px-2 pointer-events-none z-30">
                    <div className="pointer-events-auto">
                      {currentSlide > 0 && (
                        <button 
                          onClick={handlePrev}
                          className="w-12 h-12 bg-surface/50 border border-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-text-secondary hover:text-white transition-all shadow-xl"
                        >
                          <ChevronLeft size={24} />
                        </button>
                      )}
                    </div>
                    <div className="pointer-events-auto">
                      {currentSlide < 3 && (
                        <button 
                          onClick={handleNext}
                          className="w-12 h-12 bg-surface/50 border border-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-text-secondary hover:text-white transition-all shadow-xl"
                        >
                          <ChevronRight size={24} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Footer */}
                <div className="px-8 pb-12 pt-4">
                  <div className="flex items-center justify-center gap-3 mb-10 h-2">
                    {dots.map(d => (
                      <motion.div 
                        key={d}
                        initial={false}
                        animate={{ 
                          width: currentSlide === d ? 32 : 8,
                          height: 8,
                          backgroundColor: currentSlide === d ? '#5b4fff' : '#2a2a3a'
                        }}
                        transition={{ duration: 0.3 }}
                        className="rounded-full"
                      />
                    ))}
                  </div>

                  <div className="flex justify-center h-14">
                    <AnimatePresence mode="wait">
                      {currentSlide === 3 ? (
                        <motion.button
                          key="try-button"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          onClick={() => setShowDemo(false)}
                          className="bg-accent text-white font-bold py-3 px-12 rounded-2xl active:scale-95 transition-transform w-[200px] shadow-xl shadow-accent/20"
                        >
                          Try it now
                        </motion.button>
                      ) : (
                        <motion.div
                          key="swipe-hint"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-text-secondary font-bold text-xs uppercase tracking-[0.2em] flex items-center gap-2"
                        >
                          Swipe to walk through
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

// Micro-component for counting up values in Demo
const CountingValue: React.FC<{ value: number }> = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1500;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="text-[20px] font-bold font-display text-accent tracking-tighter">
      ${displayValue.toFixed(2)}
    </span>
  );
};

export default Home;
