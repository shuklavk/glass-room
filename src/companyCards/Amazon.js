import React from 'react';
import { VerticalTimelineElement } from 'react-vertical-timeline-component';
import { FaAmazon } from 'react-icons/fa';

export default ({ cardContent }) => {
  return (
    <VerticalTimelineElement
      className="vertical-timeline-element--work"
      contentStyle={{ background: '#FFB550', color: 'black' }}
      contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
      date="2011 - present"
      iconStyle={{
        background: '#E8E8E8',
        color: 'black',
        borderStyle: 'solid',
        borderColor: '#FFB550',
      }}
      icon={
        <FaAmazon
          style={{ height: '47px', width: '47px', left: '28%', top: '27%' }}
        />
      }
    />
  );
};
