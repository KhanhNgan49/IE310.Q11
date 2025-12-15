import React from 'react'
import HeaderComponent from './HeaderComponent/HeaderComponent'
import FooterComponent from './FooterComponent/FooterComponent'

const DefaultComponent = ({ children , isShowFooter = true}) => {
  return (
    <div>
      <HeaderComponent />
      {children}

      {isShowFooter && <FooterComponent />}
    </div>
  );
};
export default DefaultComponent