# Restaurant List (Node.js)
簡易的餐廳清單網站。

這是一個用 Node.js 架設網站的練習專案。

#### 練習目標
* 用 Node.js + Express.js 架設 Server 並控制 route。
* 用 MVC 模式管理檔案架構。
* 用 RESTful 風格設計 route。
* 使用 handlebars 模板引擎，對HTML內容做預處理。
  * 將 HTML 頁面拆分成 layout 與 partial template。
  * 透過 JSON data 生成 HTML 內容。

## Preview Pages
![preview](./public/img/preview.jpg)

#### 功能
* User 可以在首頁看到所有餐廳與概述
* User 可以點擊查看餐廳的詳細資訊
* User 可以搜尋餐廳名稱

## Dependency packages
#### main
* [Node.js](https://nodejs.org/en/) v10.16.3

#### npm package
* [Express.js](https://expressjs.com/) v4.17.1
* [express-handlebars](https://www.npmjs.com/package/express-handlebars) v3.1.0

#### other package (已包含在專案內)
* [Font Awesome](https://fontawesome.com/) v5.8.1
* [Bootstrap](https://getbootstrap.com/) v4.3.1
  * jQuery v3.4.1
  * popper v1.14.7


## Installation
這是使用 Node.js 於 localhost 架設的網站。
由於沒有發布在網路上，必須下載後於本機端執行。

#### Download Project
1. 直接於 Github 上用瀏覽器下載 ZIP file
2. 用 Git clone 專案
```
$ git clone https://github.com/Lastor-Chen/node_restaurant_list.git [資料夾名稱]
```

#### Download Node.js
本機端必須安裝 Node.js 與相關 package 才能執行此專案。
如尚未安裝 Node.js，建議使用 nvm toolkit 下載指定版本的 Node.js

| install nvm |  |
| -------- | -------- |
| nvm-windows     | [Link to](https://github.com/coreybutler/nvm-windows) |
| nvm-macOS     | [Link to](https://github.com/nvm-sh/nvm) |

#### Download dependency npm packages
```
$ npm install
```

#### 選擇安裝 nodemon
本專案推薦使用 [nodemon](https://github.com/remy/nodemon) 來取代原生的 Node.js 啟動方法。
```
$ npm install -g nodemon
```

## Usage
1. 啟動 Node.js Server
    
    * 有安裝 nodemon，於專案根目錄執行
    ```
    $ npm run dev
    ```

    * 未安裝 nodemon，於專案根目錄執行
    ```
    $ npm run start
    ```

2. 於瀏覽器開啟網頁
    ```
    http://localhost:3000
    ```

3. 關閉 Node.js Server
    
    回到 cmd 按下 Ctrl + C