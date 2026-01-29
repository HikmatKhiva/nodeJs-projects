import { GitHubEvent } from "../types/activity.js";
export function getActivitySummary(activity: GitHubEvent): string {
  switch (activity.type) {
    case "PushEvent":
      return `Pushed to ${activity.repo.name}`;
    case "IssuesEvent": {
      const action = activity.payload?.action ?? "updated";
      return action === "opened"
        ? `Opened a new issue in ${activity.repo.name}`
        : `${action} an issue in ${activity.repo.name}`;
    }
    case "PullRequestEvent": {
      const action = activity.payload?.action ?? "updated";
      return action === "opened"
        ? `Opened a new pull request in ${activity.repo.name}`
        : `${action} a pull request in ${activity.repo.name}`;
    }
    case "WatchEvent":
      return `Starred ${activity.repo.name}`;
    case "ForkEvent":
      return `Forked ${activity.repo.name}`;
    case "CreateEvent":
      return `Created ${activity.payload?.ref_type ?? "resource"} in ${activity.repo.name}`;
    default:
      return `${activity.type.replace("Event", "")} in ${activity.repo.name}`;
  }
}
export function displayActivity(activities: GitHubEvent[]) {
  console.log("Output:");
  activities.forEach((activity, index) => {
    console.log(`${index + 1} - ${getActivitySummary(activity)}`);
  });
}