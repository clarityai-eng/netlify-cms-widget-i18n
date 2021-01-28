import './bootstrap.js'
import CMS, { init } from 'netlify-cms'
import 'netlify-cms/dist/cms.css'
import NetlifyCmsWidgetI18n from '../src'
const {controlComponent, previewComponent} = NetlifyCmsWidgetI18n;

const config = {
backend: {
 name: 'test-repo',
 login: false,
},
publish_mode: 'editorial_workflow',
media_folder: 'assets',
collections: [
  {
    name: 'english-i18-file',
    label: 'English i18n files',
    extension: 'json',
    editor: {
      preview: false,
    },
    create: true, 
    folder: '_english_files',
    fields: [
      { label: "Name of the JSON file (without extension)", name: "title", widget: "string",
        "pattern": ['^(?!.*\.json$).*$','A JSON file name can have no spaces or special characters'],
      },
      { name: 'en', label: 'i18n content', widget: 'i18n',},
    ],  
 },
],
}

CMS.registerWidget('i18n', controlComponent, previewComponent)
init({ config })

// Add some fake files
window.repoFiles._english_files = {};
var fakeContent = {
  "en": {}
}

for (var i=1; i<=200; i++) {
  fakeContent.en['KEY_' + i] = "This is the literal of the key KEY_" + i
}

var ONE_DAY = 60 * 60 * 24 * 1000;
for (var i=1; i<=10; i++) {
  var date = new Date();

  date.setTime(date.getTime() + ONE_DAY);
  var month = ('0' + (date.getMonth()+1)).slice(-2)
  var day = ('0' + (date.getDate())).slice(-2)
  var dateString = '' + date.getFullYear() + '-' + month + '-' + day;
  var slug = dateString + "-json-file-" + i + ".json";
  fakeContent.title = "i18n-en-file" + i,

  window.repoFiles._english_files[slug] = {
    content: JSON.stringify(fakeContent)
  }
}
