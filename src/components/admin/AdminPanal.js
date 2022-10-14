import "../home.css";
import {Link} from "react-router-dom";
export const AdminPanal = () => {
  return (
    <>
      <div className="PaymentContainerDivAdmin">
		<Link to="/admin/AdminPanal/ProductMake" >
		<button type="button" class="btn btn-primary m-5">
          Create Products
        </button>
		</Link>
        
        <button type="button" class="btn btn-secondary m-5">
          Secondary
        </button>
        <button type="button" class="btn btn-success m-5">
          Success
        </button>
        <button type="button" class="btn btn-danger m-5">
          Danger
        </button>
        <button type="button" class="btn btn-warning m-5">
          Warning
        </button>
        <button type="button" class="btn btn-info m-5">
          Info
        </button>
      </div>
    </>
  );
};
