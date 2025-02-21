function Header() {
  return (
    <header className="container">
      <div className="d-flex align-items-center justify-content-center mb-3">
        <img 
          src="/RR.svg" 
          alt="RoomReady Logo" 
          style={{ maxWidth: "75px" }} 
          className="img-fluid me-0" 
        />
        <h1 className="mb-0 text-primary">RoomReady</h1>
      </div>
    </header>
  );
}

export default Header;