import { fetchActivity } from "./utils/api.js";
import { displayActivity } from "./utils/util.js";
async function main() {
  const username = process.argv[2];
  const limit = parseInt(process.argv[3]) || 10;
  if (!username) {
    console.error("Usage: npm run start <github-username> [page]");
    process.exit(1);
  }
  try {
    const activities = await fetchActivity(username, limit);
    if (activities.length === 0) {
      console.log("No recent activity found.");
      return;
    }
    displayActivity(activities);
  } catch (error) {
    console.error("Failed to display activity:", error);
    process.exit(1);
  }
}
main();