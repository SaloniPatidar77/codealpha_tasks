export const getUser = () => {
  if (typeof window === "undefined") return null;

  try {
    return JSON.parse(localStorage.getItem("currentUser"));
  } catch (e) {
    return null;
  }
};

// 🔥 USER-SAFE KEY GENERATOR (MOST IMPORTANT)
export const getUserKey = (key) => {
  if (typeof window === "undefined") return null;

  const user = getUser();

  if (!user?.email) {
    return null; // prevent data mixing
  }

  return `${key}_${user.email}`;
};

// 🔥 SAFE GET
export const get = (key) => {
  if (typeof window === "undefined") return null;

  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
};

// 🔥 SAFE SET
export const set = (key, value) => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Storage set error:", e);
  }
};

// 🔥 SAFE REMOVE
export const remove = (key) => {
  if (typeof window === "undefined") return;

  localStorage.removeItem(key);
};