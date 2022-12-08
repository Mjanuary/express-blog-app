// CORS Options
const whitelist = [process.env.BASE_URL, "http://localhost:3000"];

const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: false,
};

export default corsOptions;
