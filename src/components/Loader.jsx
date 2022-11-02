import React from 'react'

export default function Loader() {
  const styles = {
    svg: {
      margin: 'auto',
      backgroundColor: 'transparent',
      display: 'block',
    },
    loaderContainer: {
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#00000080',
      zIndex: 9999,
      position: 'fixed',
      top: 0,
      left: 0,
    }
  }
  return (
    <div style={styles.loaderContainer}>
      <svg style={styles.svg} width="150px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
        <g transform="translate(50 50)">
          <g>
            <animateTransform attributeName="transform" type="rotate" calcMode="discrete" values="0;90;180;270;360" keyTimes="0;0.25;0.5;0.75;1" dur="2.5s" repeatCount="indefinite"></animateTransform>
            <path d="M-40 0A40 40 0 1 0 40 0" fill="#cad2c5">
              <animate attributeName="fill" calcMode="discrete" values="#cad2c5;#84a98c;#354f52;#abbd81;#cad2c5" keyTimes="0;0.24;0.49;0.74;0.99" dur="2.5s" repeatCount="indefinite"></animate>
            </path>
            <path d="M-40 0A40 40 0 0 1 40 0" fill="#84a98c">
              <animate attributeName="fill" calcMode="discrete" values="#84a98c;#354f52;#abbd81;#cad2c5;#84a98c" keyTimes="0;0.25;0.5;0.75;1" dur="2.5s" repeatCount="indefinite"></animate>
            </path>
            <path d="M-39 0L39 0" stroke="#8b9d80" strokeWidth="2">
              <animate attributeName="stroke" values="#cad2c5;#8b9d80;#577c5f;#84a98c;#577c5f;#253739;#354f52;#253739;#7d924d;#abbd81;#7d924d;#8b9d80;#cad2c5" keyTimes="0;0.124;0.125;0.25;0.374;0.375;0.5;0.624;0.625;0.75;0.874;0.875;1" dur="2.5s" repeatCount="indefinite"></animate>
            </path>
            <g>
              <path d="M-40 0A40 40 0 0 1 40 0Z" fill="#8b9d80">
                <animate attributeName="fill" values="#cad2c5;#8b9d80;#577c5f;#84a98c;#577c5f;#253739;#354f52;#253739;#7d924d;#abbd81;#7d924d;#8b9d80;#cad2c5" keyTimes="0;0.124;0.125;0.25;0.374;0.375;0.5;0.624;0.625;0.75;0.874;0.875;1" dur="2.5s" repeatCount="indefinite"></animate>
              <animateTransform attributeName="transform" type="scale" values="1 1;1 0;1 -1;1 1" keyTimes="0;0.5;0.999;1" dur="0.625s" repeatCount="indefinite"></animateTransform>
            </path></g>
          </g>
        </g>
      </svg>
    </div>
  )
}
