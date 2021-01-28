# netlify-cms-widget-i18n

### A custom Netlify CMS widget for editing i18n files.

[![npm version](https://img.shields.io/npm/v/netlify-cms-widget-i18n)](https://www.npmjs.com/netlify-cms-widget-i18n)

This is a widget to handle your internationalization files with Netlify CMS that you can use for your MIT projects. This widget uses the awesome table component [Handsometable](https://handsontable.com/) on its Non-commercial version.

Once installed, you will have a widget to manage your key-value internazionalization JSON files with:
  -Key duplicate detection
  -Copy/paste capable
  -Insert/delete rows
  -Search and filter the content for large files


## GIF
Here's an animation of the CMS widget.  
![Screenshot gif](https://github.com/clarityai-eng/netlify-cms-widget-i18n/raw/main/netlifyWidgeti18n.gif)


## Installation

### As an npm package:

```shell
yarn add netlify-cms-widget-i18n

or

npm install --save netlify-cms-widget-i18n
```

```js
import NetlifyCmsWidgetI18n from 'netlify-cms-widget-i18n'

CMS.registerWidget('I18n', I18nControl, I18nPreview)
```

## Usage

Add to your Netlify CMS configuration a collection per language that you want to support with your i18n files.  
A field named title is required to be able to give the JSON file a name when creating new ones, and also a prop named title will have this value inside the i18n JSON file itself.  
A second field with widget: 'i18n' will be the widget itself, the field name inside this one will be the name of the prop inside the JSON file.  
If name: "en" then the i18n JSON file will be  
```json
{
  "en": {
    "MY_KEY": "My literal in english"
  }
}
```

For example, English and Spanish can be configured like:

```yaml
collections:
  - name: "english-i18n-file"
    label: "English files"
    folder: "content/i18n/en"
    extension: json
    create: true
    editor:
      preview: false
    fields:
      - {label: "Title", name: "title", widget: "string"}
      - {label: "i18n content", name: "en", widget: "i18n", pattern: ['^(?!.*\.json$).*$','A JSON file name can have no spaces or special characters']}
  - name: "spanish-i18n-file"
    label: "Spanish files"
    folder: "content/i18n/es"
    extension: json
    create: true
    editor:
      preview: false
    fields:
      - {label: "Title", name: "title", widget: "string"}
      - {label: "i18n content", name: "es", widget: "i18n", pattern: ['^(?!.*\.json$).*$','A JSON file name can have no spaces or special characters']}
```


## Support

For help with this widget, open an [issue](https://github.com/clarityai-eng/netlify-cms-widget-i18n/issues)