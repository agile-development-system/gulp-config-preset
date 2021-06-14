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
