const Test = ({
  children,
  text,
}: {
  children: React.ReactNode
  text: string
}) => {
  return (
    <>
      <div>
        {text}
        <div>test Component</div>
        {children}
      </div>
    </>
  )
}
export default Test
