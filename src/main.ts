import { App, Editor, MarkdownPostProcessorContext, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { Extension } from '@codemirror/state';
import { TRIGGER_WORD } from './plugin.const';
import { ActionMarkdownRenderChild } from './render-child';
import { StormActionsLivePlugin } from './live-preview';

export const ACTION_STRINGS = {
	reaction: 'r',
	free: '0',
	one: '1',
	two: '2',
	three: '3',
	unlimited: '8',
	opportunity: 'o',
	complication: 'c',
	star: 's'
}

interface StormlightIconSettings {
	reaction: string;
	opportunity: string;
	complication: string;
	unlimited: string;
	one: string;
	two: string;
	three: string;
	free: string;
}

const DEFAULT_SETTINGS: StormlightIconSettings = {
	reaction: 'r',
	opportunity: 'o',
	complication: 'c',
	unlimited: 'u',
	one: '1',
	two: '2',
	three: '3',
	free: 'f'
}

export default class StormlightIcons extends Plugin {
	settings: StormlightIconSettings;

	private editorExtensions: Extension[] = []

	actionReplacements() {
		const trigger = TRIGGER_WORD
		return [
			{ regex: new RegExp(`^\\s*${trigger}:\\s*${this.settings.reaction}\\s*$`, 'ig'), actionText: ACTION_STRINGS.reaction, command: DEFAULT_SETTINGS.reaction },
			{ regex: new RegExp(`^\\s*${trigger}:\\s*${this.settings.opportunity}\\s*$`, 'ig'), actionText: ACTION_STRINGS.opportunity, command: DEFAULT_SETTINGS.opportunity },
			{ regex: new RegExp(`^\\s*${trigger}:\\s*${this.settings.complication}\\s*$`, 'ig'), actionText: ACTION_STRINGS.complication, command: DEFAULT_SETTINGS.complication },
			{ regex: new RegExp(`^\\s*${trigger}:\\s*${this.settings.one}\\s*$`, 'ig'), actionText: ACTION_STRINGS.one, command: DEFAULT_SETTINGS.one },
			{ regex: new RegExp(`^\\s*${trigger}:\\s*${this.settings.two}\\s*$`, 'ig'), actionText: ACTION_STRINGS.two, command: DEFAULT_SETTINGS.two },
			{ regex: new RegExp(`^\\s*${trigger}:\\s*${this.settings.three}\\s*$`, 'ig'), actionText: ACTION_STRINGS.three, command: DEFAULT_SETTINGS.three },
			{ regex: new RegExp(`^\\s*${trigger}:\\s*${this.settings.free}\\s*$`, 'ig'), actionText: ACTION_STRINGS.free, command: DEFAULT_SETTINGS.unlimited },
			{ regex: new RegExp(`^\\s*${trigger}:\\s*${this.settings.unlimited}\\s*$`, 'ig'), actionText: ACTION_STRINGS.unlimited, command: DEFAULT_SETTINGS.unlimited },
		]
	}

	async onload() {
		await this.loadSettings()

		// This register the plugin to process the text
		this.registerMarkdownPostProcessor(this.markdownPostProcessor.bind(this))

		// Register the live preview plugin
		this.registerEditorExtension(this.editorExtensions)
		this.updateExtensions()

		// Everything ready
		console.log('Stormlight Actions Actions loaded')
	}


	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData())
	}

	updateExtensions() {
		this.editorExtensions.length = 0
		this.editorExtensions.push(StormActionsLivePlugin(this))
		this.app.workspace.updateOptions()
	}

	async saveSettings() {
		await this.saveData(this.settings)
		this.updateExtensions()
	}


	async markdownPostProcessor(element: HTMLElement, context: MarkdownPostProcessorContext): Promise<any> {
		let codes = element.querySelectorAll('code');

		// No code found
		if (!codes.length) {
			return
		}

		// Get all the transformations that need to be done...
		const replacements = this.actionReplacements()

		// ... and does them
		codes.forEach(codeBlock => {
			for (const replacement of replacements) {
				if (codeBlock.innerText.match(replacement.regex)) {
					context.addChild(new ActionMarkdownRenderChild(codeBlock, replacement.actionText))
					break
				}
			}
		})
	}
}
