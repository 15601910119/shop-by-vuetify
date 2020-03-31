export default function({ store, redirect }) {
  // 没有登录的话重定向到登录
  if (!store.userInfo || !store.userInfo.username) {
    return redirect('/login');
  }
}
