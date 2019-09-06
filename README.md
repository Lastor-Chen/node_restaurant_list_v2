# Restaurant List v2.0 (Node.js + MongoDB)
A restaurant list app.
This is a student project that built on Node.js with Express framework.
Database used mongoDB.

簡易的餐廳清單APP。 <br>
這是一個用 Node.js 架設網站的練習專案。

#### 練習目標
* 使用 Node.js 連結並操作 NoSQL 資料庫 mongoDB。
* 操作資料庫實作 CRUD。
* 於 Node.js 建立資料庫之 Model，學習 MVC 架構。


## Preview Pages
<img src="./public/img/preview.jpg" alt="preview" width="500px">

#### 功能
* User 可以在首頁看到所有餐廳與概述。
* User 可以點擊查看餐廳的詳細資訊。
* User 可以搜尋餐廳名稱或分類。
* User 可以新建餐廳資料。
* User 可以編輯餐廳資料。
* User 可以刪除餐廳資料。

## Usage
此為本機端之練習專案，需下載後安裝依賴套件才可執行。

安裝方法，請參考下方 [Dependency packages](#Dependency-packages) 與 [Installation](#Installation) 項目。 <br>
安裝完成後，使用以下步驟於本機端啟動專案。

1. 於 mongoDB 安裝目錄，啟動 mongoDB。 
    
    * macOS [官方文件](https://docs.mongodb.com/manual/tutorial/install-mongodb-enterprise-on-os-x/#run-mongodb)
    ```
    $ ~/mongodb/bin> mongod --dbpath <path to data directory>
    ```
    
    * windows(需用系統管理員執行) [官方文件](https://docs.mongodb.com/manual/tutorial/install-mongodb-enterprise-on-windows/#start-mdb-edition-as-a-windows-service)
    ```
    $ net start mongodb
    ```

2. 回到專案目錄，執行 seed，用於 mongoDB 建立基本資料 (非必須)
    ```
    $ npm run seed
    ```

3. 啟動 Node.js Server
    
    * 有安裝 nodemon，於專案根目錄執行
    ```
    $ npm run dev
    ```

    * 未安裝 nodemon，於專案根目錄執行
    ```
    $ npm run start
    ```

4. 於瀏覽器開啟網頁
    ```
    http://localhost:3000
    ```

5. 瀏覽完畢後，關閉 Node.js Server
    ```
    回到 cmd 按下 Ctrl + C
    ```

6. 關閉 mongoDB
    * macOS
    ```
    關閉 Terminal 即可
    ```
    
    * windows(需用系統管理員執行)
    ```
    $ net stop mongodb
    ```

## Dependency packages
#### main
* [Node.js](https://nodejs.org/en/) v10.16.3
* [mongoDB](https://www.mongodb.com/) v4.0.12

#### npm package
* [Express.js](https://expressjs.com/) v4.17.1
* [express-handlebars](https://www.npmjs.com/package/express-handlebars) v3.1.0
* [mongoose](https://mongoosejs.com/) v5.6.12

#### other package (imported from CDN)
* [Bootstrap](https://getbootstrap.com/) v4.3.1
  * jQuery v3.4.1
  * popper v1.14.7
* [Font-Awesome](https://fontawesome.com/) v5.10.2


## Installation
這是使用 Node.js 於 localhost 架設的網站。 <br>
必須下載後於本機端執行。

#### Download Project
1. 直接於 Github 上用瀏覽器下載 ZIP file
2. 用 Git clone 專案
```
$ git clone https://github.com/Lastor-Chen/node_sound_stupid.git [資料夾名稱]
```

#### Download Node.js
本機端必須安裝 Node.js 與相關 package 才能執行此專案。 <br>
如尚未安裝 Node.js，建議使用 nvm toolkit 下載指定版本的 Node.js

| install nvm |  |
| -------- | -------- |
| nvm-windows     | [Link to](https://github.com/coreybutler/nvm-windows) |
| nvm-macOS     | [Link to](https://github.com/nvm-sh/nvm) |

#### Download dependency npm packages
已在 package.json 中登入相關訊息，可直接執行下列指定安裝所需套件。
```
$ npm install
```

#### Download mongoDB
本機端必須安裝 mongoDB 才能執行此專案。 <br>
請連結到 mongoDB 官方網站[下載](https://www.mongodb.com/download-center/community)。

※ 注意，Windows 用戶可能會於安裝 GUI Compass 時出問題。建議安裝時不勾選，改用 [Robo 3T](https://robomongo.org/) 取代。

#### 選擇安裝 nodemon
本專案推薦使用 [nodemon](https://github.com/remy/nodemon) 來取代原生的 Node.js 啟動方法。
```
$ npm install -g nodemon
```