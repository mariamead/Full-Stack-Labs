import "./footer.css"

function Footer() {
    const currentYear = new Date().getFullYear();
    return(
        <footer className="copyright">
            &copy; Copyright Pixell River Financial. {currentYear}
        </footer>
    );
}

export default Footer;