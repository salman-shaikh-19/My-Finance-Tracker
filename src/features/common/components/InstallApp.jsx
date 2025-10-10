import React, { useState, useEffect } from 'react';

const InstallApp = ({ className }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
       console.log("beforeinstallprompt fired!", e);
      // Prevent the default install prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      // Show the install button
      setIsInstallable(true);
    };

    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if the app is already installed
    window.addEventListener('appinstalled', () => {
      // console.log('App was installed');
      setDeferredPrompt(null);
      setIsInstallable(false);
    });

    // Clean up
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', () => {});
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
     await deferredPrompt.userChoice;
    // console.log(`User response to the install prompt: ${outcome}`);
    
    // Reset the deferred prompt variable, as it can only be used once
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  // Only show the install button if the app can be installed
  if (!isInstallable) {
    return null;
  }

  return (
    <button
      className={className}
      onClick={handleInstallClick}
      aria-label="Install app"
    >
      Install App
    </button>
  );
};

export default InstallApp;