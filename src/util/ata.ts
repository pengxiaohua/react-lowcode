import { setupTypeAcquisition } from '@typescript/ata';
import typescript from 'typescript';

// 帮助代码输入区域，提示ts类型
export function createATA(
  onDownloadFile: (code: string, path: string) => void
) {
  const ata = setupTypeAcquisition({
    projectName: 'my-ata',
    typescript: typescript,
    logger: console,
    delegate: {
      receivedFile: (code, path) => {
        // 自动下载 dts 类型包的功能
        console.log('自动下载的包', path);
        onDownloadFile(code, path);
      },
    },
  });

  return ata;
}
