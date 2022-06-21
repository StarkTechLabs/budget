import React from 'react'
import { ResponsivePie } from '@nivo/pie'

import useMobile from '../../../hooks/useMobile/useMobile'

const Pie = ({ data, width = '100%', height = '400px' }) => {
  const { isMobile } = useMobile()
  return (
    <div style={{ width, height }}>
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: 'color',
          modifiers: [
            [
              'darker',
              0.2
            ]
          ]
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor='#333333'
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: 'color',
          modifiers: [
            [
              'darker',
              2
            ]
          ]
        }}
        defs={[]}
        fill={[]}
        legends={!isMobile && [
          {
            anchor: isMobile ? 'bottom' : 'left',
            direction: isMobile ? 'row' : 'column',
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: isMobile ? 0 : 1,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000'
                }
              }
            ]
          }
        ]}
      />
    </div>
  )
}

export default Pie