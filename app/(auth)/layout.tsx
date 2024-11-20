const AuthLayout = ({children} : {children : React.ReactNode}) => {
    return (
        <div className="flex items-center justify-center min-h-screen w-full bg-[#13131a] bg-dotted-pattern bg-cover bg-fixed bg-center">
            {children}
        </div>
    )
}

export default AuthLayout;