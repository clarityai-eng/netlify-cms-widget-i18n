import './bootstrap.js'
import CMS, { init } from 'netlify-cms'
import 'netlify-cms/dist/cms.css'
import NetlifyCmsWidgetI18n from '../src'
const {controlComponent, previewComponent} = NetlifyCmsWidgetI18n;

const config = {
backend: {
  // name: 'test-repo',
  // login: false,
 name: 'github',
 repo: 'clarityai-eng/netlify-cms-widget-i18n',
 branch: 'main',
},
publish_mode: 'editorial_workflow',
media_folder: 'assets',
collections: [
  {
    name: 'spanish-i18-file',
    label: 'Spanish file',
    extension: 'json',
    editor: {
      preview: false,
    },
    create: true, 
    folder: 'content/i18n/es',
    fields: [
      { label: "Name of the JSON file (without extension)", name: "title", widget: "string",
        "pattern": ['^(?!.*\.json$).*$','A JSON file name can have no spaces or special characters'],
      },
      { name: 'es', label: 'i18n content', widget: 'i18n',},
    ],  
 },
 {
  name: 'english-i18-file',
  label: 'English file',
  extension: 'json',
  editor: {
    preview: false,
  },
  create: true, 
  folder: 'content/i18n/en',
  fields: [
    { label: "Title", name: "title", widget: "string"},
    { name: 'en', label: 'i18n content', widget: 'i18n'},
  ],  
} 
],
}

CMS.registerWidget('i18n', controlComponent, previewComponent)

init({ config })