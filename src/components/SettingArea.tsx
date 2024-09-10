import { useComponentsStore } from "../stores/components"

export function SettingArea() {
    const { components } = useComponentsStore()

    return <pre>
        {JSON.stringify(components, null, 2)}
    </pre>
}
