import NavBar from "../components/NavBar";
import { useLocation } from "react-router-dom";
import CardEdit from "../components/CardEdit";

function Detail(props) {
  
  const location = useLocation();

     return (
       <div className="container">
         <NavBar home={false} create={false} detail={true} edit={false}/>
         <div className="form-wrapper">
         <CardEdit detail={location.state.detail} editar={false}/> 
         </div>
       </div>
     );
   }
   
   export default Detail;