const { exec } = require("child_process");
const fs = require('fs');

let args = process.argv.slice(2);
let wind = args[0];

if (wind !== "Notos" && wind !=="Zephyr"){
    console.error("SPECIFY WIND TYPE!!");
    return;
}

let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

for(let a=1; a<args.length; a+=2){
    let paramType = args[a];
    if (paramType === "-p"){
        config.worldPath = "./EoS/worlds/"+args[a+1]+".json";
    }
}
fs.writeFileSync("./config.json",JSON.stringify(config));

exec(`tsc --p ./${wind}/tsconfig.json && neu run -- --url=/${wind}/resources/`,(err,stdout,stderr) => {
    console.log(stdout);
    console.error(stderr);
    console.error(err);
});
