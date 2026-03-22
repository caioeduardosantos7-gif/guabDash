import { ref } from 'vue'

const collapsed = ref(false)

export function useSidebarStore() {
  return { collapsed }
}
