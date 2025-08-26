import React from 'react'

// 简化版的 Toaster 组件
export const Toaster: React.FC = () => {
  return <div id="sonner-toaster" />
}

export const toast = {
  success: (message: string) => {
    console.log('Success:', message)
  },
  error: (message: string) => {
    console.log('Error:', message)
  },
  info: (message: string) => {
    console.log('Info:', message)
  }
}