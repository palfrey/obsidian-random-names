import { Editor, MarkdownView, Plugin } from 'obsidian';
import {alienNames} from './allgenerators'

export default class RandomNames extends Plugin {
	async onload() {
		this.addCommand({
			id: 'sample-editor-command',
			name: 'Sample editor command',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				editor.replaceRange(
					alienNames(),
					editor.getCursor()
				);				
			}
		});
	}
}
