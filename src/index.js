import I18nControl from './I18nControl'
import I18nPreview from './I18nPreview'

if (typeof window !== 'undefined') {
  window.I18nControl = I18nControl
  window.I18nPreview = I18nPreview
}

export { I18nControl, I18nPreview }