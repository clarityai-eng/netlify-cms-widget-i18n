import controlComponent from './I18nControl';
import previewComponent from './I18nPreview';

const Widget = (opts = {}) => ({
  name: 'i18n',
  controlComponent,
  previewComponent,
  ...opts,
});

export const NetlifyCmsWidgetI18n = { Widget, controlComponent, previewComponent };
export default NetlifyCmsWidgetI18n;