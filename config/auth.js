// config auth.js

// 設定瀏覽權限
// ==============================

function isAuthed(req, res, next) {
  // 已登入
  if (req.isAuthenticated() ) return next()

  // 未登入
  res.redirect('/users/signin')
}

// Export
// ==============================

module.exports = isAuthed