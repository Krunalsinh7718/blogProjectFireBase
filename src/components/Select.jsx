import React, { useId, useState } from "react";

function Select({
    label,
    options,
    className,
    ...props },ref) {

    const id = useId();

    return (<>
        <div className="w-fill flex-1">
            {label && <label htmlFor={id} className="text-base font-medium text-gray-900">{label}</label>}
            <div className="">
                <select
                    className={`bg-white flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
                    id={id}
                    ref={ref}
                    {...props}>
                    {options.map(e => <option key={e} value={e}>{e.toUpperCase()}</option>)}
                </select>
            </div>
        </div>
    </>);
}

export default React.forwardRef(Select);