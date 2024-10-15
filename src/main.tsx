import { createRoot } from 'react-dom/client'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import './util/auto-update';
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  // DndProvider 组件 提供拖放上下文，用来跨组件传递数据
  <DndProvider backend={HTML5Backend}>
    <App />
  </DndProvider>
)
