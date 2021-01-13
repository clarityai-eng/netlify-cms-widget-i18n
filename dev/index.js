import './bootstrap.js'
import CMS, { init } from 'netlify-cms'
import 'netlify-cms/dist/cms.css'
import { Control, Preview } from '../src'

const config = {
backend: {
  // name: 'test-repo',
  // login: false,
 name: 'github',
 repo: 'arturogalan/i18n-netlify-widget',
},
media_folder: 'assets',
// collections: [{
//  name: 'test',
//  label: 'Test',
//  folder: 'content/i18n',
//  create: true,
//  extension: 'json',
//  editor: {
//    preview: false,
//  },
//  fields: [
//    {label: "Title", name: "title", widget: "string"},
//    {label: "Body", name: "body", widget: "code"}
//   ],
//  files: [{
//     file: 'test.json',
//     name: 'test',
//     label: 'Test',
//     fields: [
//       { name: 'body', label: 'Body', widget: 'code'},
//       { name: 'title', label: 'Title', widget: 'string'},     
//     ],
//  }],  
// }],
collections: [{
  name: 'test',
  label: 'Test',
  extension: 'json',
  editor: {
    preview: false,
  },
  create: true, 
  folder: 'content/i18n',
  fields: [
    {label: "Title", name: "title", widget: "string"},
    { name: 'test_widget', label: 'Test Widget', widget: 'test'},
  ],  
  // files: [{
  //   file: 'test.json',
  //   name: 'test',
  //   label: 'Test',
  //   fields: [
  //     { name: 'test_widget', label: 'Test Widget', widget: 'test'},
  //   ],
  // }],
 }],
}

CMS.registerWidget('test', Control, Preview)

init({ config })