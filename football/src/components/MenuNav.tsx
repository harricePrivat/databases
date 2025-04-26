
interface MenuNavProps  {
    handleNavClick: ()=> void ,
    currentView: string,
    darkMode: boolean,
    title: string
}


const  MenuNav : React.FC<MenuNavProps> = ({
    currentView,
    darkMode,
    title,
    handleNavClick
})=> {
  return (
    <button 
    onClick={handleNavClick} 
    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ease-in-out ${
      currentView === title 
        ? (darkMode ? 'bg-slate-700 text-white' : 'bg-slate-200 text-slate-900') 
        : (darkMode ? 'text-gray-300 hover:bg-slate-800' : 'text-gray-700 hover:bg-gray-100')
    }`}
  >
    {title}
  </button>
  )
}


export default MenuNav