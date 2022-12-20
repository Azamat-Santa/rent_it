import "./footer.scss";

const Footer = () => {
  return (
    <footer className="footer-wrapper">
        <div className="content footer">
        <div className="footer__left header__logo">Rentit</div>
      <div className="footer__middle">
        Платформа, которая поможет арендодателям разных товаров, найти своих
        клиентов.
      </div>
      <div className="footer__right">
        <h3>Связаться с нами</h3>
        <br />
        rentit.kg@gmail.com <br />
        +996 123 456 789
      </div>
        </div>
    </footer>
  );
};

export default Footer;
