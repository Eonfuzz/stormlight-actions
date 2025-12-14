import {
    PluginValue,
    EditorView,
    ViewPlugin,
    ViewUpdate,
    WidgetType,
    Decoration,
    DecorationSet
} from "@codemirror/view";
import { PREVIEW_CLASS } from "./plugin.const";
import type StormlightIcons from "./main";
import { editorLivePreviewField } from "obsidian";
import { syntaxTree } from "@codemirror/language"; 
import { RangeSetBuilder } from '@codemirror/state'

class StormlightWidget extends WidgetType {
    constructor(
		public command: string,
        public actionText: string
    ) { super() }

    toDOM( view: EditorView): HTMLElement {
        const span = document.createElement('span')
        span.innerText = this.actionText;
        span.classList.add(PREVIEW_CLASS);
        span.classList.add(PREVIEW_CLASS+`-${this.command}`);
        return span
    }
}

export function StormActionsLivePlugin(plugin: StormlightIcons) {
    return ViewPlugin.fromClass(
        class implements PluginValue {
            decorations: DecorationSet

            constructor(view: EditorView) {
                this.decorations = this.buildDecorations(view)
            }

            update(update: ViewUpdate): void {
                this.decorations = this.buildDecorations(update.view)
            }

            private buildDecorations(view: EditorView) {
                // Only for live preview
                if (!view.state.field(editorLivePreviewField)) {
                    return Decoration.none
                }

                // Build the decorations
                const builder = new RangeSetBuilder<Decoration>();

                // List the replacements to be used
                const replacements = plugin.actionReplacements()

                for (const {from, to} of view.visibleRanges) {
                    syntaxTree(view.state).iterate({
                        from,
                        to,
                        enter: ({ node }) => {
                            if (!node.type.name.contains('inline-code')) return
                            if (node.type.name.includes('formatting')) return

                            for (const range of view.state.selection.ranges) {
                                if (range.from <= node.to+1 && range.to >= node.from-1) return
                            }

                            const original = view.state.doc.sliceString(node.from, node.to)
                            for (const replacement of replacements) {
                                if (original.match(replacement.regex)) {
                                    builder.add(
                                        node.from-1,
                                        node.to+1,
                                        Decoration.replace({
                                            widget: new StormlightWidget(replacement.command, replacement.actionText),
                                            inclusive: false,
                                            block: false
                                        })
                                    )
                                    break
                                }
                            }
                        }
                    })
                }

                return builder.finish()
            }
        },
        { decorations: (v) => v.decorations }
    )
}
