import './bootstrap.js'
import CMS, { init } from 'netlify-cms'
import 'netlify-cms/dist/cms.css'
import { Control, Preview } from '../src'

const config = {
backend: {
 name: 'github',
 repo: 'arturogalan/i18n-netlify-widget',
//  login: false,
},
media_folder: 'content/assets',
collections: [{
 name: 'test',
 label: 'Test',
 folder: 'content/i18n',
 create: true,
 extension: 'json',
 fields: [{label: "Title", name: "title", widget: "string"}],
//  files: [{
//    file: 'test.json',
//    name: 'en_file',
//    label: 'English file',
//    fields: [
//      { name: 'test_widget', label: 'i18 editor', widget: 'test'},
//    ],
//  }],
}],
}

CMS.registerWidget('test', Control, Preview)

init({ config })