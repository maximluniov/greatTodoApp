import { MdOutlineDarkMode } from "react-icons/md";
import { useState, useEffect } from "react"


const Header = () => {

const [theme, setTheme] = useState<string|null>(null)


  useEffect(()=>{
    if(window.matchMedia('(prefers-color-scheme:dark)').matches){
      setTheme('dark');
    }else{
      setTheme('light')
    }
  },[])

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme])

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }
      
    return (<div className="flex flex-col h-1/8 w-full items-center ">
        <div className="flex w-full justify-between font-semibold shadow-lg p-2 md:p-4">
            <div className="text-lg">
                TodoApp
            </div>
            <div onClick={handleThemeSwitch} className="flex items-center cursor-pointer">
               <MdOutlineDarkMode size={25}  />
            </div>
        </div>
    
        <header className="text-2xl sm:text-4xl font-semibold drop-shadow-lg m-4">
            Track your tasks with us
        </header>
    </div>
    )
}

export default Header