import { Image as AntdImage } from 'antd'

interface ImageProps {
  width?: number
  src: string
}
const Image: React.FC<ImageProps> = ({ src, width = 30 }) => {
  return (
    <AntdImage
      width={width}
      src={src}
      fallback="/images/placeholder.jpg"
      placeholder={
        <AntdImage preview={false} src="/images/lazy.png" width={30} />
      }
    />
  )
}

export default Image
