import NavBar from "../components/NavBar";
import CardCreate from "../components/CardCreate";

function Create() {

     return (
       <div className="container">
         <NavBar home={false} create={true} detail={false} edit={false}/>
         <div className="form-wrapper">
         <CardCreate/>
         </div>
       </div>
     );
   }
   
   export default Create;