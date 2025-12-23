import React from 'react'
import HeaderComponent from './HeaderComponent/HeaderComponent'
import FooterComponent from './FooterComponent/FooterComponent'

const DefaultComponent = ({ children , isShowFooter = true}) => {
  return (
    <div>
      <HeaderComponent />
      {children}

      {/* Tắt Footer với nhưng trang không cần thiết */}
      {isShowFooter && <FooterComponent />}
    </div>
  );
};
export default DefaultComponent