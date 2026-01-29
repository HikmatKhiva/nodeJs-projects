# Github User Activity

A lightweight Node.js CLI github-user-activity application that fetches and displays the recent public activity of a GitHub user using the GitHub API.

# github-user-activity
Sample solution for the [github-user-activity](https://roadmap.sh/projects/github-user-activity) challenge from [roadmap.sh](https://roadmap.sh/).

**Live Project:** 
* [GitHub - github-user-activity CLI](https://github.com/HikmatKhiva/nodeJs-projects/tree/main/github-user-activity)

##  Features
- Fetches recent public activity of any GitHub user
- Displays activity in a human-readable format
- Handles common GitHub events such as:
- Push events
- Issues
- Pull requests
- Stars
- Forks
- Repository creation
- Graceful error handling for invalid usernames or API failures
- No external libraries used for fetching data

## 🚀 Quick Start

```bash
# Clone and install
npm install

# Build the project
npm run build

# Run project
npm run start <github-username>
# Run project limit number of events displayed
npm run start <github-username> 10

Output:
1 - Pushed to username/developer-roadmap
2 - Opened a new issue in username/developer-roadmap
3 - Starred username/developer-roadmap
4 - Forked username/developer-roadmap
```
