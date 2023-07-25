import { Layout } from "./components/layout";
import { FormField } from "./components/form-field";
import { useState } from "react"

export default function Login() {

    const [action, setAction] = useState('login');
    const [formData, setFormData] = useState({
            email: '',
            password: '',
            firstName: '',
            lastName: ''
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
    <button
    onClick={()=>setAction( action == 'login' ? 'register' : 'login')}
    className="absolute top-8 right-8 rounded-xl bg-yellow-300 font-semibold text-blue-600 px-3 py-2 transition duration-300 ease-in-out hover:bg-yellow-400 hover: translate-y-1"
    >{action === 'login' ? 'Sign Up' : 'Sign In'} '</button>
    <h2 className="text-5xl font-extrabold text-yellow-300">Welcome to kudos</h2>
    <p className="font-semibold text-slate-300">{
        action === 'login' ? 'Log in' : 'Sign up'
    }</p>

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

    {
        action !== 'login' ? (<>
        <FormField
    htmlFor="firstname"
    label="First Name"
    value={formData.firstName}
    onChange={e=>handleInputChange(e, 'firstName')}
    />
    <FormField
    htmlFor="lastname"
    label="Last Name"
    value={formData.lastName}
    onChange={e=>handleInputChange(e, 'lastName')}
    /></>
            
        ) : null
    }
    <div className="w-full text-center">
        <button type="submit" name="_action" value={action} className="rounded-xl mt-2 bg-yellow-300 font-semibold text-blue-600 px-3 py-2 transition duration-300 ease-in-out hover:bg-yellow-400 hover: translate-y-1">
            {
                action === 'login' ? "Sign in" : "Sign up"
            }
        </button>
    </div>
    </form>
</div>

</Layout>
  
      
    );
  }