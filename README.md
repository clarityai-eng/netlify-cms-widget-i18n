# netlify-cms-widget-i18n

### A custom Netlify CMS widget for editing i18n files.

[![npm version](https://img.shields.io/npm/v/netlify-cms-widget-i18n)](https://www.npmjs.com/netlify-cms-widget-i18n)

## Installation

### As an npm package:

```shell
yarn add netlify-cms-widget-i18n
```

```js
import I18n from 'netlify-cms-widget-i18n'

CMS.registerWidget('I18n', I18nControl, I18nPreview)
```

### Via `script` tag:

```html
<script src="https://unpkg.com/netlify-cms-widget-i18n"></script>

<script>
const {controlComponent, previewComponent} = NetlifyCmsWidgetI18n;
  CMS.registerWidget('i18n', NetlifyCmsWidgetI18n.controlComponent, NetlifyCmsWidgetI18n.previewComponent)
</script>
```

## Usage

Add to your Netlify CMS configuration:
Add a collection per language that you want to support with your i18n files
For example, English and Spanish should be configured like:

```yaml
collections:
  - name: "spanish-i18-file"
    label: "Spanish file"
    folder: "content/i18n/es"
    create: true
    preview: false,
    fields:
      - { name: title, widget: string, pattern: ['^(?!.*\.json$).*$','A JSON file name can have no spaces or special characters'], hint: 'The JSON file name (do not include folder or file extension) and a field 'name' inside of the JSON file. *NOTE: When modifying an existing file changes in this name only will change the field called 'name' inside the file content.'}
      - { name: es, label: i18n content, widget: i18n }
  - name: "english-i18-file"
    label: "English file"
    folder: "content/i18n/en"
    create: true
    preview: false,
    fields:
      - { name: title, widget: string, pattern: ['^(?!.*\.json$).*$','A JSON file name can have no spaces or special characters'], hint: 'The JSON file name (do not include folder or file extension) and a field 'name' inside of the JSON file. *NOTE: When modifying an existing file changes in this name only will change the field called 'name' inside the file content.'}
      - { name: en, label: i18n content, widget: i18n }
```


## Support

For help with this widget, open an [issue](https://github.com/<user>/<repo>)