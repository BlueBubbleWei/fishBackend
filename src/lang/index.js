import Vue from 'vue'
import VueI18n from 'vue-i18n'
import cookies from 'js-cookie'
import elementEnLocale from 'element-ui/lib/locale/lang/en'
import elementZnLocale from 'element-ui/lib/locale/lang/zh-CN'
import enLocate from './en'
import zhLocate from './zh'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocate,
    ...elementEnLocale
  },
  zh: {
    ...zhLocate,
    ...elementZnLocale
  }
}

const i18n = new VueI18n({
  locale: cookies.get('language') || 'zh',
  messages
})

export default i18n
