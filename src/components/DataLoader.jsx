function DataLoader({button, light, className, ...props}) {
    return !button ?  (<>
    <div className={`fixed flex align-center h-full w-full inset-0 grid place-content-center ${className}`} {...props}>
        <div
            className={`inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid ${light ? "border-white" : "border-black"} border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`}
            role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >Loading...</span>
        </div>
    </div>
    </>) : 
    (<div
        className={`inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid ${light ? "border-white" : "border-black"} border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] ${className}`}
        role="status">
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        >Loading...</span>
    </div>)
}

export default DataLoader;