import { Grid3x3, UserCog, Grid2x2Plus } from 'lucide-react';

function Footer() {
    return (
        <footer className="container text-center py-5">
            <div className="d-flex justify-content-center mb-3">
                <a href="/HouseKeeping" className="mx-2">
                    <Grid3x3 color="#D19C1D" size={30} strokeWidth={2.5} />
                </a>
                <a href="/user" className="mx-2">
                    <UserCog color="#D19C1D" size={30} strokeWidth={2.5} />
                </a>
                <a href="/room" className="mx-2">
                    <Grid2x2Plus color="#D19C1D" size={30} strokeWidth={2.5} />
                </a>
            </div>
            <div className="d-flex justify-content-center">
                <p>&copy; Copyright 2025</p>
            </div>
        </footer>
    );
}

export default Footer;