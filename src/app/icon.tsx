import { ImageResponse } from 'next/og'

export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#9CCFC8', // primary-soft from globals.css
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#0E2A2A', // nav color
          borderRadius: '6px',
          fontSize: 22,
          fontWeight: 800,
        }}
      >
        +
      </div>
    ),
    { ...size }
  )
}
