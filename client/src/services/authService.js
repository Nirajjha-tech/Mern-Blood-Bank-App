import { userLogin, userRegister } from "../redux/features/auth/authAction";
import store from "../redux/store"
export const handleLogin=(e,email,password,role)=>{
  e.preventDefault();
  try {
    if(!role || !password ||!email){
        return alert('please provide all field');
    }
    store.dispatch(userLogin({email,password,role}));
  } catch (error) {
    console.log(error);
  }
};
export const handleRegister=(e,name,email,role,password,organisationName,hospitalName,website,phone,address)=>{
e.preventDefault();
try {
   store.dispatch(userRegister({
   name,email,role,password,organisationName,hospitalName,website,phone,address
   }))
} catch (error) {
    console.log(error);
}
};