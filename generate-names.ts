import * as fs from 'fs';
import * as path from 'path';
import * as _ from "lodash";

const rootName = "node_modules/@xaroth8088/random-names/generators";

const walk = (dir: string) => {
	let items: string[][] = [];
	fs.readdirSync(dir).forEach(fname => {
 		const fullname = path.join(dir, fname);		
		const stats = fs.statSync(fullname);
		if (stats.isDirectory()) {
			const moreitems = walk(fullname);
			items.push(...moreitems);
		} else {
			const relname = path.relative(rootName, fullname);
			const bits = relname.replace(".mjs", "").split("/")
			items.push(bits);
		}
	});
	return items;
};

const output = fs.openSync("allgenerators.ts", "w");
fs.writeSync(output, "// Generated file\n");

let choices: { [key: string] : { [key: string] : string; }} = {};
const items = walk(rootName);
items.forEach(item => {
	if (!_.has(choices, item[0])) {
		choices[item[0]] = {}
	}
	const import_name = `${item[0]}_${item[1]}`;
	fs.writeSync(output, `import ${import_name} from '@xaroth8088/random-names/generators/${item[0]}/${item[1]}.mjs';\n`);
	choices[item[0]][item[1]] = import_name;
});
fs.writeSync(output, `export const choices: { [key: string] : { [key: string] : () => string; }} = {\n`);
_.keys(choices).forEach(first => {
	fs.writeSync(output, `  ${first}: {\n`);
	_.keys(choices[first]).forEach(second => {
		fs.writeSync(output, `    ${second}: ${choices[first][second]},\n`);
	});
	fs.writeSync(output, `  },\n`);
})
fs.writeSync(output, `};\n`);

fs.closeSync(output);

