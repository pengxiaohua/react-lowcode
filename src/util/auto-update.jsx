import { Modal, Button } from 'antd';

let lastSrc;

const scriptReg = /<script.*src=["'](?<src>[^"']+)/gm;

// 通过fetch('/')获取最新页面中的script链接
const getLatestSrc = async () => {
  // 加上时间戳后缀，避免缓存
  const html = await fetch('/?_t=' + Date.now()).then((res) => res.text());
  // 重置scriptReg的lastIndex，避免重复匹配
  scriptReg.lastIndex = 0;

  const result = [];
  // 匹配script标签中的src
  let match;
  while ((match = scriptReg.exec(html))) {
    result.push(match.groups?.src);
  }
  return result;
};

// 是否需要更新
const needUpdate = async () => {
  const newScripts = await getLatestSrc();
  if (!lastSrc) {
    lastSrc = newScripts;
    return false;
  }

  let result = false;
  if (lastSrc.length !== newScripts.length) {
    result = true;
  } else {
    for (let i = 0; i < lastSrc.length; i++) {
      if (lastSrc[i] !== newScripts[i]) {
        result = true;
        break;
      }
    }
  }
  lastSrc = newScripts;
  console.log({ lastSrc, newScripts });
  return result;
};

// 设置轮询定时器
const autoUpdate = () => {
  console.log('autoUpdate');
  // 如果需要更新，则给一个antd Modal组件:是否刷新
  setTimeout(async () => {
    const willUpdate = await needUpdate();
    if (willUpdate) {
      // 弹出更新提示
      Modal.info({
        title: '更新提示',
        content: '有新的版本发布，是否刷新页面',
        onCancel: (close) => close(),
        onOk: () => window.location.reload(),
        footer: (
          <div className='flex justify-end mt-[10px]'>
            <Button key='back' onClick={() => Modal.destroyAll()}>
              取消
            </Button>
            <Button
              key='submit'
              type='primary'
              className='ml-[10px]'
              onClick={() => window.location.reload()}>
              确认
            </Button>
          </div>
        ),
      });
    }
    autoUpdate();
  }, 3000);
};

autoUpdate();
