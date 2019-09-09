// 點擊刪除按鈕後，將 id 傳給 Modal 的表單
$('.del').on('click', e => {
  const id = e.target.dataset.id
  
  // 將 id 注入 form action
  let formAction = $('#del-form').attr('action')
  formAction = formAction.replace('{id}', id)
  
  $('#del-form').attr('action', formAction)
})