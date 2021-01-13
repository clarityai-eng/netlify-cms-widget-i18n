import i18nEditorControl from './i18nEditorControl'
import i18nEditorPreview from './i18nEditorPreview'

if (typeof window !== 'undefined') {
  window.i18nEditorControl = i18nEditorControl
  window.i18nEditorPreview = i18nEditorPreview
}

export { i18nEditorControl, i18nEditorPreview }