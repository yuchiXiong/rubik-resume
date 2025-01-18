import React from "react"

interface IFooterProps {
  handleCancel: () => void
  handleSubmit: () => void
}

const Footer: React.FC<IFooterProps> = ({
  handleCancel,
  handleSubmit,
}) => {

  return (
    <footer className="text-gray-600 body-font fixed bottom-0 w-full bg-white border-t border-solid border-gray-200 ">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <a className="cursor-pointer bg-gray-300 px-5 py-2 rounded-md text-white hover:bg-gray-400 transition-all duration-150" onClick={handleCancel}>取消</a>
          <a className="ml-4 cursor-pointer bg-green-500 px-5 py-2 rounded-md text-white hover:bg-green-600 transition-all duration-150" onClick={handleSubmit}>保存</a>
        </nav>
      </div>
    </footer>
  )
}

export default Footer;