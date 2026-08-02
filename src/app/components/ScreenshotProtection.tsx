import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function ScreenshotProtection() {
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');

  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      setWarningMessage('Right-click is disabled on this site');
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 2000);
      return false;
    };

    // Detect screenshot keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Windows: PrintScreen, Alt+PrintScreen, Win+PrintScreen, Win+Shift+S
      // Mac: Cmd+Shift+3, Cmd+Shift+4, Cmd+Shift+5
      
      if (
        e.key === 'PrintScreen' ||
        (e.metaKey && e.shiftKey && ['3', '4', '5'].includes(e.key)) ||
        (e.metaKey && e.key === 'p') || // Print
        (e.ctrlKey && e.key === 'p') || // Print
        (e.key === 's' && (e.metaKey || e.ctrlKey) && e.shiftKey) // Windows Snipping Tool
      ) {
        e.preventDefault();
        setWarningMessage('Screenshot attempt detected');
        setShowWarning(true);
        setTimeout(() => setShowWarning(false), 3000);
        
        // Temporarily blur the page
        document.body.style.filter = 'blur(20px)';
        setTimeout(() => {
          document.body.style.filter = 'none';
        }, 1000);
        
        return false;
      }

      // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U (DevTools)
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) ||
        (e.ctrlKey && e.key.toLowerCase() === 'u')
      ) {
        e.preventDefault();
        setWarningMessage('Developer tools are disabled');
        setShowWarning(true);
        setTimeout(() => setShowWarning(false), 2000);
        return false;
      }
    };

    // Blur content when window loses focus (potential screenshot tool)
    const handleBlur = () => {
      document.body.style.filter = 'blur(10px)';
      document.body.style.transition = 'filter 0.2s';
    };

    const handleFocus = () => {
      document.body.style.filter = 'none';
    };

    // Detect if user switches windows/apps (additional screenshot detection)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.body.style.filter = 'blur(10px)';
      } else {
        document.body.style.filter = 'none';
      }
    };

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.body.style.filter = 'none';
    };
  }, []);

  return (
    <>
      {/* Warning Toast */}
      <AnimatePresence>
        {showWarning && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-[10000] bg-red-600 text-white px-6 py-3 rounded-lg shadow-2xl"
          >
            <div className="flex items-center gap-3">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span className="font-medium">{warningMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}