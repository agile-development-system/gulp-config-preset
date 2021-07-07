<p align="center">
    <img src="https://gitee.com/agile-development-system/agds-doc-preset/raw/master/lib/docs/logos/light/1.png" alt="logo">
</p>

# @agds/gulp-config-preset

**版本** ：1.0.1

构建npm包的gulp配置

## 快速开始

### 安装

```bash
npm i -D @agds/gulp-config-preset
```

### 引入

```js
// gulpfile.js
const gulpPreset = require('@agds/gulp-config-preset');
exports.default = gulpPreset();
```




### 添加build脚本

在`package.json`的`scripts`下添加build命令；

```json
{
  "scripts": {
    "build": "gulp",
    "prepublishOnly": "npm run build"
  }
}
```



## API文档
<a name="gulppreset"></a>

### gulppreset(options) ⇒ <code>Undertaker.TaskFunction</code>
**性质**: 函数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| options | <code>object</code> | gulp出入口配置 |
| options.input | <code>string</code> | gulp构建入口 |
| options.output | <code>string</code> | gulp构建出口 |

<a name="gulppreset..clean"></a>

#### gulppreset~clean() ⇒ <code>Promise</code>
清除构建目录

**性质**: [<code>gulppreset</code>](#gulppreset)的内部方法
<a name="gulppreset..build"></a>

#### gulppreset~build() ⇒ <code>merge.Merge2Stream</code>
构建

**性质**: [<code>gulppreset</code>](#gulppreset)的内部方法
<a name="gulppreset..cp"></a>

#### gulppreset~cp() ⇒ <code>NodeJS.ReadWriteStream</code>
复制无法构建的文件

**性质**: [<code>gulppreset</code>](#gulppreset)的内部方法





<a name="source"></a>

## 配置源码

```js
const { series, src, dest, parallel } = require('gulp');
const rimraf = require('rimraf');
const babel = require('gulp-babel');
const ts = require('gulp-typescript');
const merge = require('merge2');
const { FastPath } = require('@agds/node-utils');
const path = require('path');
/**
 * @param {object} options gulp出入口配置
 * @param {string} options.input gulp构建入口
 * @param {string} options.output gulp构建出口
 * @returns {Undertaker.TaskFunction}
 */
function gulppreset({ input = 'src', output = 'lib' } = {}) {
    const tsProject = ts.createProject('tsconfig.json');
    const _input = FastPath.getCwdPath(input);
    const _output = FastPath.getCwdPath(output);
    /**
     * 清除构建目录
     *
     * @returns {Promise}
     */
    function clean() {
        return new Promise((resolve) => rimraf(_output, resolve));
    };
    /**
     * 构建
     *
     * @returns {merge.Merge2Stream}
     */
    function build() {
        const tsResult = src(path.join(_input, '**/*.[tj]s'))
            .pipe(tsProject());

        return merge([
            tsResult.dts.pipe(dest(path.join(_output, 'types'))),
            tsResult.js.pipe(babel()).pipe(dest(_output)),
        ]);
    }

    /**
     * 复制无法构建的文件
     *
     * @returns {NodeJS.ReadWriteStream}
     */
    function cp() {
        return src(path.join(_input, '**/*.!([tj]s)')).pipe(dest(_output));
    }
    return series(clean, parallel(build, cp));
}

module.exports = gulppreset;
```




<a name="license"></a>

## 许可证

[MIT License](https://gitee.com/agile-development-system/gulp-config-preset/blob/master/LICENSE)
Copyright (c) 2021 锦阳



<a name="donate"></a>

## 请维护者喝杯咖啡

<img src="https://gitee.com/agile-development-system/agds-doc-preset/raw/master/lib/docs/qrcode/alipay.jpeg" width="209px" >
<img src="https://gitee.com/agile-development-system/agds-doc-preset/raw/master/lib/docs/qrcode/wechatpay.jpeg" width="237px" >




<a name="dingtalk"></a>

## 加入钉钉群讨论或加入开发

<img src="https://gitee.com/agile-development-system/agds-doc-preset/raw/master/lib/docs/qrcode/dingtalk.jpeg" width="188px" >


