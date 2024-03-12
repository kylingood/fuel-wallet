
const program = require("commander");
const allOptions = require("./scripts/mainWork");

program
  .command("start")
  .description("sol多线程")
  .action(() => {
    allOptions.init();
  });
  

program.parse(process.argv);
