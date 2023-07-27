import { useState, useEffect } from 'react'

interface FormFieldProps {
    htmlFor: string,
    label: string,
    type?: string,
    value: any,
    onChange?: (...args: any) => any,
    error?: string
}

export function FormField({
    htmlFor,
    label,
    type = "text",
    value,
    onChange = () => {},
    error = ""
}: FormFieldProps) {
    const [errorText, setErrorText] = useState(error)

    useEffect(() => {
        setErrorText(error)
    }, [error])

    return <>
    <label htmlFor={htmlFor} className="text-blue-600 font-semibold">{label}</label>
    <input onChange={onChange} type={type} id={htmlFor} className="w-fu;; p-2 rounded-xl my-2" value={value}/>
    <div className="text-xs font-semibold text-center tracking-wide text-red-500 w-full">
        {errorText || ''}
    </div>
    </>
}