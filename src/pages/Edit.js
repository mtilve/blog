import NavBar from "../components/NavBar";
import CardEdit from "../components/CardEdit";
import { useLocation } from "react-router-dom";

function Edit() {

  const location = useLocation();
  
  return (
    <div className="container">
      <NavBar home={false} create={false} detail={false} edit={true} />
      <div className="form-wrapper">
        <CardEdit detail={location.state ? location.state.detail : {}} editar={true} />
      </div>
    </div>
  );
}

export default Edit;
