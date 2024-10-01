import { useState } from 'react';
import { useComponentsStore } from '../stores/components';
import MonacoEditor, { OnMount } from '@monaco-editor/react'

export interface ICustomJSConfig {
    type: 'customJS',
    code: string
}

export interface ICustomJSProps {
    defaultValue?: string
    onChange?: (config: ICustomJSConfig) => void
}

const SettingCommon = () => {
    return (
        <div>
            <h1>Setting Page</h1>
        </div>
    );
};

export default SettingCommon;