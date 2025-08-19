"use client"
export default function AuthPage({isSignin}:{isSignin: boolean}){
    return <div className="flex h-dvh w-dvw justify-center items-center ">
        <div className="flex flex-col justify-center items-center rounded p-4 bg-slate-500 min-w-96 gap-4">
            <h2 className="text-2xl font-bold">Sign {isSignin ? "in" : "up"} </h2>
            <div className="flex flex-col min-w-full gap-2">
            <label htmlFor="email">Email</label>
            <input type="text" className="text-black bg-white px-4 py-2 rounded" />
            </div>
            <div className="flex flex-col min-w-full gap-2">
            <label htmlFor="password">Password</label>
            <input type="password" className="text-black bg-white px-4 py-2 rounded" />
            </div>
            <button className="py-2 px-4 rounded bg-black" 
            onClick={()=>{}}
            >Sign {isSignin ? "in" : "up"}</button>
        </div>
    </div>
}