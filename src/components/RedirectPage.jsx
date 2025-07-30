import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { logEvent } from "../middleware/logger";

const RedirectPage = () => {
  const { shortcode } = useParams();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(shortcode));
    if (data) {
      if (Date.now() < data.expiry) {
        data.clicks.push({
          time: new Date().toISOString(),
          source: document.referrer,
          location: "India"
        });
        localStorage.setItem(shortcode, JSON.stringify(data));
        logEvent("Redirect", { shortcode });
        window.location.href = data.longUrl;
      } else {
        alert("Link expired");
      }
    } else {
      alert("Invalid shortcode");
    }
  }, [shortcode]);

  return <div>Redirecting...</div>;
};

export default RedirectPage;
