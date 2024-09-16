import { useMemo } from "react"

import { useComponentConfigStore } from "../stores/component-config"
import MaterialItem from "./MaterialItem"

const MaterialArea = () => {
    const { componentConfig } = useComponentConfigStore()

    const components = useMemo(() => {
        return Object.values(componentConfig).filter((item) => item.name !== "Page")
    }, [componentConfig])

    return <div>
        {
            components.map((item, index) => {
                return <MaterialItem key={item.name + index} desc={item.desc} name={item.name} />
            })
        }
    </div>
}

export default MaterialArea;
