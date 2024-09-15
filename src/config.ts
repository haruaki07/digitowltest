export const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  db_url: process.env.DB_URL || "mongodb://localhost:27017/digitowltest",
};
