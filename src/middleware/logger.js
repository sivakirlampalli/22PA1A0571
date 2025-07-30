export const logEvent = (action, details = {}) => {
  const logs = JSON.parse(localStorage.getItem("logs") || "[]");
  logs.push({ time: new Date().toISOString(), action, details });
  localStorage.setItem("logs", JSON.stringify(logs));
};
