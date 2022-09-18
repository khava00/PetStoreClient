import { useEffect, useState,useMemo } from "react"
import { Input,Button } from "@nextui-org/react"
import toast from "react-hot-toast";
import "./style.css"
const CustomForm =({ status, message, onValidated })=>{

    const [email, setEmail] = useState('')
    const [emailToched, setEmailToched] = useState(false);
    const validateEmail = (value) => {
        return value?.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
      };
    const helperEmail = useMemo(() => {
        if ((!email && !emailToched)) {
          return {
            text: "",
          };
        }  
        if (email === "" && emailToched)
          return {
            text: "Email không được để trống",
          };
        else {
          const isValid = validateEmail(email);
          return {
            text: !isValid ? "Email không hợp lệ" : "",
          };
        }
      }, [email, emailToched]);
    
    const handleSubmit = () => {
       if(email===""){
        toast.error("Vui lòng nhập email")
       }
        email &&
        email.indexOf("@") > -1 &&
        onValidated({
            MERGE0:email,
        });
        
    }

    const clearFields = () => {
        setEmail('');
    }

    useEffect(() => {
        if(status === "success") {
            clearFields()
            toast.success("Đăng kí thành công")
        }
        if(status === "error") {
            clearFields()
            toast.error("Không thành công, vui lòng kiểm tra lại")
            
        }
    }, [status])

    return(
        <>
        
                <div className="subcribe f_flex"> 
                    <div className="subcribe-input">
                        <Input
                            onChange={(e)=>setEmail(e.target.value)}
                            type="email"
                            value={email}
                            placeholder="your@email.com"
                            helperColor="error"
                            helperText={emailToched && helperEmail.text}
                            onFocus={() => setEmailToched(true)}
                            required
                        />
                    </div>      
                    <div className="subcribe-button">
                        <Button onClick={handleSubmit}>Đăng kí</Button>
                    </div>
                    

                </div>
          
        </>
    )

}
export default CustomForm