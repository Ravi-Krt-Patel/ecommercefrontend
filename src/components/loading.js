
import "./home.css"

export const Loader = () => {
	
  return (
    <>
	<div className="loader">
	{/* <button className="btn btn-primary" type="button" disabled>
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Loading...</span>
      </button>
      <button className="btn btn-primary" type="button" disabled>
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        Loading...
      </button> */}

	  <div style={{marginBottom:"5rem",color:"green"}} >
		<h1>Loading.....</h1>
	  </div>


	  <div className="spinner-border text-success" style={{width: "10rem", height: "10rem"}} role="status">
           <span className="visually-hidden">Loading...</span>
</div>


	</div>
      
    </>
  );
};
