import inquire from "inquirer";
async function main() {
  console.log("Welcome to the Number Guessing Game!\n");
  console.log(
    "I'm thinking of a number between 1 and 100.\nYou have 5 chances to guess the correct number.",
  );
  const secretNumber = Math.floor(Math.random() * 100) + 1;
  let attempts = 5;
  while (attempts > 0) {
    const { guess } = await inquire.prompt([
      {
        type: "number",
        name: "guess",
        message: "Your guess:",
        validate: (input: string) => {
          const number = parseInt(input);
          return number >= 1 && number <= 100
            ? true
            : "Enter a number between 1-100";
        },
      },
    ]);

    attempts--;

    if (guess === secretNumber) {
      console.log(`🎉 Correct! The number was ${secretNumber}!`);
      console.log(`You won in ${6 - attempts} attempts!`);
      return;
    } else if (attempts === 0) {
      console.log(`💀 Game Over! The number was ${secretNumber}.`);
      return;
    } else {
      const hint = guess < secretNumber ? "Too low!" : "Too high!";
      console.log(`\n${hint} (${attempts} attempts left)\n`);
    }
  }
}
main();