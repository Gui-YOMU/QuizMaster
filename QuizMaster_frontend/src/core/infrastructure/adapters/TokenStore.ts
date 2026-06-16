let token: string | null = localStorage.getItem("token");
let userId: string | null = localStorage.getItem("userId");

export const tokenStore = {
  getToken: () => token,
  getUserId: () => userId,
  set: (newToken: string, newUserId: string) => {
    token = newToken;
    userId = newUserId;
    localStorage.setItem("token", newToken);
    localStorage.setItem("userId", newUserId);
  },
  clear: () => {
    token = null;
    userId = null;
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  },
};