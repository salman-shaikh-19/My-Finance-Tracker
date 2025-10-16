import React, { useEffect, useState } from "react";
import { suggestions } from "../../../utils/suggestions";

const PerformanceSuggestions = ({ performanceRating }) => {
  const performanceSuggestions =suggestions

  const [currentSuggestion, setCurrentSuggestion] = useState("");

  // pick random suggestion
  const getRandomSuggestion = () => {
    // const rating = performanceRating >= 4 ? 4 : performanceRating <= 1 ? 1 : performanceRating;
    const rating = performanceRating >= 4 ? 4 : performanceRating <= 0 ? 0 : performanceRating;

    const suggestionList = performanceSuggestions[rating];
    return suggestionList[Math.floor(Math.random() * suggestionList.length)];
  };

  useEffect(() => {
    // init set suggestion
    setCurrentSuggestion(getRandomSuggestion());

    // change suggestion every 5 seconds 
    const interval = setInterval(() => {
      setCurrentSuggestion(getRandomSuggestion());
    }, 5000);

    return () => clearInterval(interval);
  }, [performanceRating]);

  return (
    <p className="text-xs text-gray-500 break-words w-full mt-1  ">
      {currentSuggestion}
    </p>
  );
}
export default React.memo(PerformanceSuggestions);
