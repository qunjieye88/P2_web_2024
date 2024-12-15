'use client'
import { useRouter } from 'next/navigation';

export default function BotonLogin({path, functions, children, type}){

    const router = useRouter();
    
    function redirigie(){
        path && router.push(path);
        functions && functions()
    }

    return(
        <button type={type ? type : "button"} onClick={redirigie}>{children}</button>
    )

}