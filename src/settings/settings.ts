import {ref} from "vue";


interface Settings {
  gmView: boolean
  animations: boolean
}

export const settings = ref<Settings>({
  gmView: false,
  animations: true
})
