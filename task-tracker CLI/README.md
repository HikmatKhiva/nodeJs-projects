# Task Tracker
Sample solution for the [task-tracker](https://roadmap.sh/projects/task-tracker) challenge from [roadmap.sh](https://roadmap.sh/).

A lightweight Node.js CLI task management application. Add, update, delete, and track tasks using simple npm commands. Tasks persist in a local `db/db.json` file.

**Live Project:** 
* [GitHub - task-tracker CLI](https://github.com/HikmatKhiva/nodeJs-projects/tree/main/task-tracker%20CLI)

## ✨ Features

- ✅ Add new tasks with unique IDs
- ✏️ Update task descriptions
- 🗑️ Delete tasks by ID
- 📊 Mark tasks as "in-progress" or "done"
- 📋 List all tasks
- ✅ List completed tasks
- ⏳ List in-progress tasks
- 📄 List pending tasks
- 💾 Automatic JSON persistence
- 🛡️ Full error handling

## 🚀 Quick Start

```bash
# Clone and install
npm install

# Build the project
npm run build

# Add tasks
npm run start add "Learn Node.js CLI"
npm run start add "Write README.md"
npm run start add "Deploy to GitHub"

# View all tasks
npm run start list

# Listing tasks by status
npm run start list done
npm run start list todo
npm run start list in-progress

# Update and mark progress
npm run start update 1 "Master Node.js CLI development"
npm run start mark-in-progress 1

# Check progress
npm run start list in-progress

# Complete and review
npm run start mark-done 1
npm run start list done

# Clean up
npm run start delete 3
