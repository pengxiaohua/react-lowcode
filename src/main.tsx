import React from 'react';
import { createRoot } from 'react-dom/client'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import whyDidYouRender from '@welldone-software/why-did-you-render';

import App from './App.tsx'
import './index.css'

if (process.env.NODE_ENV === 'development') {
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}

createRoot(document.getElementById('root')!).render(
  // DndProvider 组件 提供拖放上下文，用来跨组件传递数据
  <DndProvider backend={HTML5Backend}>
    <App />
  </DndProvider>
)
