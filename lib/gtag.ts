// lib/gtag.ts
export const GA_TRACKING_ID = "G-2BDC5M35R1";

// Detect device info (simplified)
const getDeviceInfo = () => {
  if (typeof window === "undefined") return {};
  const ua = navigator.userAgent;
  return {
    platform: navigator.platform,
    language: navigator.language,
    mobile: /Mobi|Android/i.test(ua),
    browser: ua.includes("Chrome")
      ? "Chrome"
      : ua.includes("Firefox")
      ? "Firefox"
      : ua.includes("Safari")
      ? "Safari"
      : "Other",
  };
};

type GAEventProps = {
  action: string;
  project_id: string;
};

export const event = ({ action, project_id }: GAEventProps) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", action, {
      project_id,
      ...getDeviceInfo(),
    });
  }
};
