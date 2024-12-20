import {ref} from "vue";


interface Settings {
  gmView: boolean
}

export const settings = ref<Settings>({
  gmView: false
})
