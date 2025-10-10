// import React, { useState, useEffect } from 'react';

// const InstallApp = ({ className }) => {
//   const [deferredPrompt, setDeferredPrompt] = useState(null);
//   const [isInstallable, setIsInstallable] = useState(false);

//   useEffect(() => {
//     const handleBeforeInstallPrompt = (e) => {
//        console.log("beforeinstallprompt fired!", e);
//       // Prevent the default install prompt
//       e.preventDefault();
//       // Stash the event so it can be triggered later
//       setDeferredPrompt(e);
//       // Show the install button
//       setIsInstallable(true);
//     };

//     // Listen for the beforeinstallprompt event
//     window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

//     // Check if the app is already installed
//     window.addEventListener('appinstalled', () => {
//       // console.log('App was installed');
//       setDeferredPrompt(null);
//       setIsInstallable(false);
//     });

//     // Clean up
//     return () => {
//       window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
//       window.removeEventListener('appinstalled', () => {});
//     };
//   }, []);

//   const handleInstallClick = async () => {
//     if (!deferredPrompt) return;
    
//     // Show the install prompt
//     deferredPrompt.prompt();
    
//     // Wait for the user to respond to the prompt
//      await deferredPrompt.userChoice;
//     // console.log(`User response to the install prompt: ${outcome}`);
    
//     // Reset the deferred prompt variable, as it can only be used once
//     setDeferredPrompt(null);
//     setIsInstallable(false);
//   };

//   // Only show the install button if the app can be installed
//   if (!isInstallable) {
//     return null;
//   }

//   return (
//     <button
//       className={className}
//       onClick={handleInstallClick}
//       aria-label="Install app"
//     >
//       Install App
//     </button>
//   );
// };

// export default InstallApp;
import React, { useState, useEffect } from "react";

const InstallApp = ({ className }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true) {
      setIsInstalled(true);
    }

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setIsInstalled(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isInstalled) {
      alert("App is already installed. You can continue using it in app mode.");
      return;
    }

    if (!deferredPrompt) {
      alert("App cannot be installed at this time.");
      return;
    }

    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  };

  return (
    <button className={className} onClick={handleInstallClick}>
      {isInstalled ? "Open App" : "Install App"}
    </button>
  );
};

export default InstallApp;
