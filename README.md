# netlify-cms-widget-nested-json

### A custom Netlify CMS widget for editing nested JSON data.

[![npm version](https://img.shields.io/npm/v/netlify-cms-widget-nested-json)](https://www.npmjs.com/netlify-cms-widget-nested-json)

[Check out a demo!](https://netlify-cms-widget-nested-json.netlify.com/demo)


Similar standalone version [here](https://nested-json-editor.netlify.com/).

## GIF
Here's an animation of the CMS widget, if you don't want to check out the demo link above.
![Screenshot gif](https://github.com/LukeStorry/netlify-cms-widget-nested-json/raw/master/demo.gif)

## Installation

### As an npm package:

```shell
yarn add netlify-cms-widget-nested-json
```

```js
import NestedJsonEditor from 'netlify-cms-widget-nested-json'

CMS.registerWidget('NestedJsonEditor', NestedJsonEditorControl, NestedJsonEditorPreview)
```

### Via `script` tag:

```html
<script src="https://unpkg.com/netlify-cms-widget-nested-json"></script>

<script>
  CMS.registerWidget('NestedJsonEditor', NestedJsonEditorControl, NestedJsonEditorPreview)
</script>
```

## Usage

Add to your Netlify CMS configuration:

```yaml
    fields:
      - { name: <fieldname>, label: <fieldlabel>, widget: NestedJsonEditor }
```


## Support

For help with this widget, open an [issue](https://github.com/<user>/<repo>) or [message me](https://twitter.com/messages/compose?recipient_id=102070492).