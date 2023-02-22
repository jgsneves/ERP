const dev = process.env.NODE_ENV !== "production";
console.log({ nodeEnv: process.env.NODE_ENV });
export const server = dev
  ? "http://localhost:3000"
  : "https://lysimed-dashboard-jgsneves.vercel.app/";
