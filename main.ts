import { Editor, MarkdownView, Plugin } from "obsidian";
import { choices } from "./allgenerators";
import * as _ from "lodash";

function toTitleCase(str: string): string {
	return str.replace(/\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
}

const specialCases: { [key: string]: string } = {
	xMens: "X-men",
	sciFiGuns: "Sci-fi guns",
	twentiethCenturyEnglishs: "20th Century English",
	englishs: "English",
};

function toPretty(str: string): string {
	if (_.has(specialCases, str)) {
		return specialCases[str];
	}
	if (str.includes("_")) {
		return str.split("_").map(toPretty).join(" ");
	} else if (str.slice(1).toLowerCase() != str.slice(1)) {
		const num = str.slice(1).search(/[A-Z]/);
		return [str.slice(0, num + 1), str.slice(num + 1)]
			.map(toPretty)
			.join(" ");
	} else {
		return toTitleCase(str);
	}
}

export default class RandomNames extends Plugin {
	async onload() {
		_.keys(choices)
			.sort()
			.forEach((first) => {
				_.keys(choices[first])
					.sort()
					.forEach((second) => {
						this.addCommand({
							id: `random-names-${first}-${second}`,
							name: `Insert name (${toPretty(first)} - ${toPretty(second)})`,
							editorCallback: (
								editor: Editor,
								view: MarkdownView,
							) => {
								editor.replaceRange(
									choices[first][second](),
									editor.getCursor(),
								);
							},
						});
					});
			});
	}
}
