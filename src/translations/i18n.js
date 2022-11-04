import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { content } from './languages'

i18n.use(LanguageDetector).init({
  debug: false,
  defaultNS: ['translations'],
  fallbackLng: 'en',
  ns: ['translations'],
  resources: content,
})

export { i18n }
