
import ReactModernDrawer from "react-modern-drawer";
// import Button from "./primitive/button";
import { Button } from "@radix-ui/themes";
import classNames from "classnames";
import { FindOne } from "@icon-park/react";
import { DEFAULT_BASIC_INFO, DEFAULT_CUSTOM_BLOCK_TEMPLATE, DEFAULT_EDUCATION_EXPERIENCE, DEFAULT_PROFESSIONAL_SKILL, DEFAULT_PROJECT_EXPERIENCE, DEFAULT_WORK_EXPERIENCE } from "@/constants/defaultSchema";


export interface ISettingDrawerProps {

}

const BlockControlDrawer: React.FC<ISettingDrawerProps> = ({
}) => {

  const blockList = [
    DEFAULT_BASIC_INFO,
    DEFAULT_PROFESSIONAL_SKILL,
    DEFAULT_PROJECT_EXPERIENCE,
    DEFAULT_WORK_EXPERIENCE,
    DEFAULT_EDUCATION_EXPERIENCE,
    DEFAULT_CUSTOM_BLOCK_TEMPLATE,
  ]

  return (
    <ReactModernDrawer
      open={true}
      direction='left'
      style={{
        width: '20%',
        maxWidth: '560px'
      }}
      enableOverlay={false}
      lockBackgroundScroll={true}
    >
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-4 mx-auto">
          <div className="h-max pb-4 mb-4 border-b border-gray-200 flex justify-between items-center">
            <a className="flex title-font font-medium items-center text-gray-900">
              <FindOne
                className='bg-indigo-500 rounded-full p-2 w-10 h-10'
                theme="outline"
                size="24"
                fill="#fff"
                strokeWidth={3}
              />
              <span className="ml-3 text-xl">Rubik Resume</span>
            </a>
          </div>
          <div className="flex flex-wrap -m-2">
            {[
              '基本信息',
              '专业技能',
              '项目经验',
              '任职经历',
              '教育背景',
              '自定义',
            ].map((title, index) => (
              <div key={title} className="p-1 w-1/2">
                <Button className="!w-full !cursor-pointer !h-9" color={index % 3 === 0 ? "teal" : 'gray'} variant={index % 3 === 0 ? 'soft' : "outline"}>
                  {title}
                </Button>
              </div>
            ))}

          </div>
        </div>
      </section>
    </ReactModernDrawer>
  )
}

export default BlockControlDrawer