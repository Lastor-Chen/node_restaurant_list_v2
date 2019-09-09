// models sortList.js

// 宣告
// =========================

// sort 選項
// @key { mongoose sort 查詢符 } 
// @val { 頁面顯示的中文 }  
const sortMap = {
  '-createdAt': '按最新',
  createdAt: '按最舊',
  name: '按名稱',
  category: '按類別',
  '-rating': '按評價',
}

// 建立，給 each 使用的 keys array
sortMap.keys = Object.keys(sortMap)

// export
// =========================

module.exports = sortMap