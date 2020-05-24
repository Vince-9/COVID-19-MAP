import React from 'react';
import {Button} from 'antd';

export default function HomeHeader() {
  return (
    <div className="home-header">
      <h1>疫情地图 · 中国</h1>
      <h2>©唐文城</h2>
      <Button ghost className="logout-btn" onClick={logout}>退出登录</Button>
    </div>
  )
}

function logout() {
  window.sessionStorage.removeItem('user');
  window.location.reload();
}
