import { createInjectionState } from "@vueuse/core"
import { onMounted, ref } from "vue"

const [useProvideMegaMenu, useInjectMegaMenu] = createInjectionState(
  () => {
    const rootRef = ref<HTMLElement>()
    const megaMenuTop = ref("0px")

    function updateTop() {
      if (rootRef.value) {
        const rect = rootRef.value.getBoundingClientRect()
        megaMenuTop.value = `${rect.bottom}px`
      }
    }

    onMounted(() => {
      updateTop()
    })

    return {
      rootRef,
      megaMenuTop,
      updateTop,
    }
  },
)

function useMegaMenu() {
  const context = useInjectMegaMenu()

  if (!context) throw new Error("useMegaMenu must be used within a <MegaMenu />")

  return context
}

export { useMegaMenu, useProvideMegaMenu }
