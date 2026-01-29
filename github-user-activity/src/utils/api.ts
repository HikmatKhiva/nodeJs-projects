import { GitHubEvent } from "../types/activity.js";
export const fetchActivity = async (
  username: string,
  limit: number,
): Promise<GitHubEvent[]> => {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/events?per_page=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (!response.ok) {
      console.error(`Error: ${response.status} ${response.statusText}`);
      return [];
    }
    const data = (await response.json()) as GitHubEvent[];
    return data;
  } catch (error) {
    console.error(`Failed to fetch events for ${username}:`, error);
    return [];
  }
};
