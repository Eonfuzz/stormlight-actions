import { MarkdownRenderChild } from "obsidian"
import { PREVIEW_CLASS } from "./plugin.const"

export class ActionMarkdownRenderChild extends MarkdownRenderChild {

	constructor(
		element: HTMLElement,
		private actionText: string
	) {
		super(element)
	}

	onload(): void {
		const action = this.containerEl.createSpan({ text: this.actionText, cls: PREVIEW_CLASS})
		this.containerEl.replaceWith(action)
	}
}
