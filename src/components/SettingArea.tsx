import { useComponentsStore } from "../stores/components"

export function SettingArea() {
    const { components } = useComponentsStore()

    return <div>
        {JSON.stringify(components, null, 2)}
    </div>
}
