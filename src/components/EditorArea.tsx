import { useEffect } from "react"

import { useComponentsStore } from "../stores/components"

export function EditorArea() {
    const { components, addComponent, updateComponent } = useComponentsStore()

    useEffect(() => {
        addComponent({
            id: 222,
            name: "Container",
            props: {},
            children: [],
        }, 1)

        addComponent({
            id: 333,
            name: "Video",
            props: {},
            children: [],
        }, 222)

        setTimeout(() => {
            updateComponent(333, { title: "Hello World!" })
        }, 3000)
    }, [])

    return <div>
        <pre>{JSON.stringify(components, null, 2)}</pre>
    </div>
}
