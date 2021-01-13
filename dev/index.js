import './bootstrap.js'
import CMS, { init } from 'netlify-cms'
import 'netlify-cms/dist/cms.css'
import { i18nEditorControl, i18nEditorPreview } from '../src'

const config = {
backend: {
  // name: 'test-repo',
  // login: false,
 name: 'github',
 repo: 'arturogalan/i18n-netlify-widget',
 branch: 'main',
},
media_folder: 'assets',
collections: [
  {
    name: 'es',
    label: 'Spanish file',
    extension: 'json',
    editor: {
      preview: false,
    },
    create: true, 
    folder: 'content/i18n',
    fields: [
      { label: "Title", name: "title", widget: "string"},
      { name: 'es', label: 'i18n content', widget: 'i18nEditor'},
    ],  
 },
 {
  name: 'en',
  label: 'English file',
  extension: 'json',
  editor: {
    preview: false,
  },
  create: true, 
  folder: 'content/i18n',
  fields: [
    { label: "Title", name: "title", widget: "string"},
    { name: 'en', label: 'i18n content', widget: 'i18nEditor'},
  ],  
} 
],
}

CMS.registerWidget('i18nEditor', i18nEditorControl, i18nEditorPreview)

init({ config })