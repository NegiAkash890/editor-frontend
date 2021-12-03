import { useTheme } from "../../context/Themeprovider"
import { FiSun, FiMoon } from "react-icons/fi"
import togglerStyles from "./Themetoggler.module.css"

export const ThemeToggler = ( ) => {
    const { theme, setTheme } = useTheme()

    return(
        <button
        className={`${ togglerStyles['toggler-btn']}`}
            onClick={()=> setTheme({ type : "TOGGLE_THEME" })}
        >
            { theme === "dark" ? <FiSun size={20}/> : <FiMoon size={20}/> }
        </button>
    )
}