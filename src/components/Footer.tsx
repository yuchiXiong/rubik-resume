import React from "react"
import Button from "./primitive/button"

interface IFooterProps {
  handleCancel: () => void
  handleSubmit: () => void
}

const Footer: React.FC<IFooterProps> = ({
  handleCancel,
  handleSubmit,
}) => {

  return (
    <footer className="text-gray-600 body-font fixed bottom-0 w-full bg-white border-t border-solid border-gray-200 z-50">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Button type="secondary" onClick={handleCancel}>取消</Button>
          <Button className="ml-4" onClick={handleSubmit}>保存</Button>
        </nav>
      </div>
    </footer>
  )
}

export default Footer;