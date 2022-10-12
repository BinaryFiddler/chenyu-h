import * as React from 'react'
import cs from 'classnames'
import { IoSunnyOutline } from '@react-icons/all-files/io5/IoSunnyOutline'
import { IoMoonSharp } from '@react-icons/all-files/io5/IoMoonSharp'
import { Breadcrumbs, Search, useNotionContext } from 'react-notion-x'
import * as types from 'notion-types'
import useDarkModeImpl from '@fisch0920/use-dark-mode'
import styles from './styles.module.css'
import { navigationLinks } from '../lib/config'

function useDarkMode() {
    const darkMode = useDarkModeImpl(false, { classNameDark: 'dark-mode' })

    return {
        isDarkMode: darkMode.value,
        toggleDarkMode: darkMode.toggle
    }
}


const ToggleThemeButton = () => {
    const [hasMounted, setHasMounted] = React.useState(false)
    const { isDarkMode, toggleDarkMode } = useDarkMode()

    React.useEffect(() => {
        setHasMounted(true)
    }, [])

    const onToggleTheme = React.useCallback(() => {
        toggleDarkMode()
    }, [toggleDarkMode])

    return (
        <div
            className={cs('breadcrumb', 'button', !hasMounted && styles.hidden)}
            onClick={onToggleTheme}
        >
            {hasMounted && isDarkMode ? <IoMoonSharp /> : <IoSunnyOutline />}
        </div>
    )
}

export const NotionPageHeader: React.FC<{ block: types.CollectionViewPageBlock | types.PageBlock }> = ({ block }) => {
    const { components, mapPageUrl } = useNotionContext()

    return (
        <header className='notion-header'>
            <div className='notion-nav-header'>
                <Breadcrumbs block={block} rootOnly={true} />

                <div className='notion-nav-header-rhs breadcrumbs'>
                    {navigationLinks
                        ?.map((link, index) => {
                            return (
                                <components.PageLink
                                    href={mapPageUrl(link.pageId)}
                                    key={index}
                                    className={cs(styles.navLink, 'breadcrumb', 'button')}
                                >
                                    {link.title}
                                </components.PageLink>
                            )
                        })
                        .filter(Boolean)}

                    <ToggleThemeButton />
                    <Search block={block} title={null} />
                </div>
            </div>
        </header>
    )
}