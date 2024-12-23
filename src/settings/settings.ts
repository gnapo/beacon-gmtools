import {ref} from "vue";


interface Settings {
  gmControls: boolean
  animations: boolean
}

export const settings = ref<Settings>({
  gmControls: false,
  animations: true
})
