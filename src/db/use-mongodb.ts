const mongoose = require('mongoose');

export const useMongoDB = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  };
  // Using new database connection
  await mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    // useSeparateProcesses: true
  });
};