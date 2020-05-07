# vscode 常用配置

使用prettier eslint插件

```
{
  "workbench.iconTheme": "vscode-icons",
  "files.autoSave": "off",
  "gitlens.advanced.messages": {
    "suppressShowKeyBindingsNotice": true
  },
  // 注释作者信息 快捷键ctrl+alt+i 
  "fileheader.Author": "shixun.xie",
  "fileheader.LastModifiedBy": "shixun.xie",
  "window.zoomLevel": -1,
  "editor.tabSize": 2,
  "editor.formatOnPaste": true,
  "editor.formatOnSave": true,
  "vetur.format.defaultFormatter.js": "vscode-typescript",
  "files.associations": {
    "*.wpy": "vue"
  },
  // 每次保存的时候代码按eslint代码格式进行修复
  "eslint.autoFixOnSave": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "html",
    {
      "language": "vue",
      "autoFix": true
    }
  ],
  "eslint.options": {
    "plugins": ["html"]
  },
  // 让prettier使用eslint的代码格式进行校验
  "prettier.eslintIntegration": true,
  // 去掉结尾的分号
  "prettier.semi": false,
  // 使用单引号代替双引号
  "prettier.singleQuote": true,
  // 函数名和括号之间加个空格
  "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
  "vetur.format.defaultFormatter.html": "js-beautify-html",
  "vetur.format.defaultFormatter.ts": "vscode-typescript",
  "vetur.format.defaultFormatterOptions": {
    "js-beautify-html": {
      "wrap_attributes": "force-aligned"
    }
  },
  "editor.fontSize": 20,
  "editor.mouseWheelZoom": true
}

```