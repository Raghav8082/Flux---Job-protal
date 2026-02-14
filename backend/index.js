import app from './app.js';
import connectDB from './utils/db.js';

const PORT = process.env.PORT || 8000;

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    process.exitCode = 1;
  }
})();
