// index.js
import { AlldbServices } from './services/indexServices';

const { dbServices } = AlldbServices;

(async () => {
  try {
    await dbServices.connect();
    console.log("Database connection established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
})();
