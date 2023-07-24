import { Layout } from "./components/layout";
import { FormField } from "./components/form-field";
import { useState } from "react"

export default function Login() {
    const [formData, setFormData] = useState({
            email: '',
            password: ''
        })

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
        setFormData(form => ({
            ...form,
            [field]: event.target.value
        }))

    } 
    return (
<Layout>
<div className="h-full flex justify-center items-center flex-col gap-y-4">
    <h2 className="text-5xl font-extrabold text-yellow-300">Welcome to kudos</h2>
    <p className="font-semibold text-slate-300">Log in bruh</p>

    {
        JSON.stringify(formData)    }

    <form>
    <FormField
    htmlFor="email"
    label="Email"
    value={formData.email}
    onChange={e=>handleInputChange(e, 'email')}
    />
    <FormField
    htmlFor="password"
    label="Password"
    type="password"
    value={formData.password}
    onChange={e=>handleInputChange(e, 'password')}
    />
    <div className="w-full text-center">
        <input
        type="submit"
        className="rounded-xl mt-2 bg-yellow-300 px-3 py-2 text-blue-600font-semibold transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1"
        value="Sign In"/>
    </div>
    </form>
</div>

</Layout>
  
      
    );
  }