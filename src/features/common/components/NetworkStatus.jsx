import { useEffect, useState } from "react";
import { MdWarning } from "react-icons/md";

export default function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      //remove listner on unmount
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isOnline) {
    return null; // do nothing when online
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="card bg-error text-error-content shadow-2xl w-80 select-none pointer-events-auto">
        <div className="card-body items-center text-center">
          <MdWarning className="text-4xl mb-2" />
          <h2 className="card-title text-lg font-bold">You are offline</h2>
          <p className="text-sm opacity-90">
            Check your internet connection to continue using the app.
          </p>
          <div className="card-actions mt-3">
            <button
              className="btn btn-sm btn-outline btn-light"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
