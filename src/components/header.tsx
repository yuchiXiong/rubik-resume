import React, { MutableRefObject, useState } from "react"
import { FindOne, GithubOne } from "@icon-park/react";
import { TScheme } from "@/constants/mockSchema";
import { getPageHeightByA4 } from "@/utils/page";
import { useDispatch } from "@/hooks/useResumeStyle";
import { useSession, signIn, signOut } from "next-auth/react"
import { Avatar, DropdownMenu } from "@radix-ui/themes";
import classNames from "classnames";

const LoginBtn = () => {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger >
            <Avatar
              src={session.user?.image || ''}
              radius="full"
              fallback={session.user?.name?.charAt(0) || '-'}
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item onClick={() => signOut()}>登出</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </>
    )
  }
  return (
    <>
      <button className={classNames(
        'bg-black rounded px-2 py-1 flex items-center',
        'text-white text-sm'
      )} onClick={() => signIn()}><GithubOne className="mr-1" /> 登录</button>
    </>
  )
}
interface IHeaderProps {
  schemeList: TScheme[]
  containerRef: MutableRefObject<HTMLDivElement | null>
}

const Header: React.FC<IHeaderProps> = ({
  schemeList,
  containerRef,
}) => {

  const [isOnePage, setIsOnePage] = useState(false);

  const {
    updateBlockGap
  } = useDispatch()

  const onePageHeight = getPageHeightByA4();

  const handleOnePage = () => {
    if (isOnePage) {
      setIsOnePage(false);
      updateBlockGap(0)
      return;
    }
    if (!containerRef.current) return;

    const allSchemeHeight = schemeList.reduce((sum, cur) => {
      const currentTargetHeight = containerRef.current?.querySelector(`#block-${cur.id}`)?.clientHeight || 0;
      return currentTargetHeight + sum;
    }, 0)

    if (allSchemeHeight > onePageHeight) {
      console.log('Behavior: 当前内容过多，无法一纸化')
      return;
    } else {
      updateBlockGap((onePageHeight - allSchemeHeight) / schemeList.length);
      setIsOnePage(true);
    }
  }

  return (
    <header className="text-gray-600 body-font fixed top-0 w-full bg-white border-b border-solid border-gray-200">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <FindOne
            className='bg-indigo-500 rounded-full p-2 w-10 h-10'
            theme="outline"
            size="24"
            fill="#fff"
            strokeWidth={3}
          />
          <span className="ml-3 text-xl">Rubik Resume</span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <a onClick={handleOnePage}
            className="mr-5 hover:text-gray-900 cursor-pointer">{isOnePage ? '取消一页' : '智能一页'}</a>
          <LoginBtn />
          {/*<a className="mr-5 hover:text-gray-900">Second Link</a>*/}
          {/*<a className="mr-5 hover:text-gray-900">Third Link</a>*/}
          {/*<a className="mr-5 hover:text-gray-900">Fourth Link</a>*/}
        </nav>
        {/*<button*/}
        {/*    className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Button*/}
        {/*    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"*/}
        {/*         stroke-width="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">*/}
        {/*        <path d="M5 12h14M12 5l7 7-7 7"></path>*/}
        {/*    </svg>*/}
        {/*</button>*/}
      </div>
    </header>
  )
}

export default Header;