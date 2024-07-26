import { useSelector } from "react-redux"
import { RootState } from "../store"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";



const Loader = () => {

    const loading = useSelector((state: RootState) => state.todos.loading);

    useGSAP(() => {
        if (loading) {
            gsap.fromTo('#loader', {
                opacity: 0,
                y: 20,
                ease: "power3.out"
            }, { opacity: 1, duration: 0.5, y: 0 });
        } else {
            gsap.to('#loader', {
                opacity: 0,
                duration: 0.5,
                y: -20,
                ease: "power3.in"
            });
        }
    }, [loading])

    return (
        <>
            < div id="loader" className="fixed bg-slate-300 dark:bg-slate-400 rounded-md bottom-2 left-5 p-2 shadow-lg" >
                <div className='flex items-center'>Loading <AiOutlineLoading3Quarters className='animate-spin' /></div>
            </div >
        </>
    )
}

export default Loader