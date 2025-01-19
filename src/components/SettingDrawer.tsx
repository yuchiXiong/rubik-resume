import classNames from "classnames";
import { CloseSmall } from "@icon-park/react";
import ReactModernDrawer from "react-modern-drawer";
import { TSchema } from "@/constants/defaultSchema";
import { getSettingComponent } from "@/utils/blocks";


export interface ISettingDrawerProps {
  visible: boolean;
  handleClose: () => void;
  handleSubmit: (schema: TSchema) => void;
  schema: TSchema[];
  schemaInfo: {
    blockId: string;
    subBlockId?: string;
  }
}

const SettingDrawer: React.FC<ISettingDrawerProps> = ({
  visible,
  handleClose,
  handleSubmit,
  schema,
  schemaInfo
}) => {

  const currentBlock = schema.find(item => item.id === schemaInfo.blockId);

  if (!currentBlock) return null;


  return (
    <ReactModernDrawer
      open={visible}
      onClose={handleClose}
      direction='right'
      style={{
        width: '30%',
        maxWidth: '560px'
      }}
      lockBackgroundScroll={true}
    >
      <div
        className={classNames(
          'relative',
          'flex flex-col',
          'h-screen'
        )}
      >
        <div
          style={{
            backgroundImage: "url('https://www.tailwindcss.cn/_next/static/media/docs@30.8b9a76a2.avif')",
            backgroundSize: 'cover',
          }}
          className='w-full h-28 absolute pointer-events-none'
        >
        </div>
        {/* 顶部 */}
        <nav className='p-6 flex items-center border-b border-gray-100 border-solid'>
          <span className='text-lg'>{currentBlock?.blockName}</span>
          <span
            className='ml-auto cursor-pointer'
            onClick={handleClose}
          >
            <CloseSmall theme="outline" size="24" fill="#333" />
          </span>
        </nav>
        {getSettingComponent(schema, schemaInfo, handleClose, handleSubmit)}
      </div>
    </ReactModernDrawer>
  )
}

export default SettingDrawer