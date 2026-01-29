# 💸 Expense Tracker CLI

A simple **Node.js command-line application** to track daily expenses.  
You can add expenses, store them persistently, and view summaries by month or overall.

---

**Live Project:** 
* [GitHub - expense-tracker CLI](https://github.com/HikmatKhiva/nodeJs-projects/tree/main/expense-tracker)


## 📦 Features

- Add expenses with description and amount
- Persistent storage using a local JSON file
- View total expenses
- Filter expense summary by month
- Clean CLI interface using **Commander**
- Works as a real CLI command (`expense-tracker`)

---

## 🛠️ Tech Stack

- **Node.js**
- **TypeScript**
- **Commander.js**
- **File system (JSON storage)**

---

## 🗄️ Data Storage

Expenses are stored in a local file called `expenses.json`.
Example:

```json
[
  {
    "id": 1,
    "description": "Lunch",
    "amount": 20,
    "date": "2026-01-10T12:30:00.000Z"
  }
]
```
## 🧪 Development Mode
```bash
# Clone and install
npm install

# Build the project
npm run build

# Expense add
node .\dist\main.js add --description "Lunch" --amount 20 or
npm run start add --description "Lunch" --amount 20
# Expense added successfully (ID)

npm run start list
# ID  Date       Description  Amount
# 1   202*-0*-0*  Lunch        $20
# 2   202*-0*-0*  Dinner       $10

npm run start summary
# Total expenses: $30

node .\dist\main.js delete --id 1 or
npm run start delete --id 1

# Expense deleted successfully

node .\dist\main.js --month 8 or
npm run start summary --month 8

# Total expenses for August: $20
```
