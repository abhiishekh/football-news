"use client"
import React from 'react';
import Page1 from './page1/page';
import Page2 from './page2/page';
import Page3 from './page3/page';
import Page4 from './page4/page';
import Page5 from './page5/page';
import Page6 from './page6/page';
import Page7 from './page7/page';

const SeriesA = () => {
  return (
    <>
    <div className=' mt-10 sm:mt-0'>

      <Page1 />
      <Page2 />
      <Page3 />
      <Page4 />
      <Page5/>
      <Page6/>
      <Page7/>
    </div>
    </>
  );
};

export default SeriesA;
