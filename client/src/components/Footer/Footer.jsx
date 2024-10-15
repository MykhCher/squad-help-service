import { Link } from 'react-router-dom';
// =====
import CONSTANTS from '../../constants';
import styles from './Footer.module.sass';

function Footer() {
  const topFooterItemsRender = item => (
    <div key={item.title}>
      <h4>{item.title}</h4>
      {item.items.map(i => {
        if (i === 'How It Works') return <Link key={i} to='/how-it-works'>{i}</Link>
        return (
          <a key={i} href='https://google.com'>
            {i}
          </a>
        );
      })}
    </div>
  );

  function topFooterRender () {
    return CONSTANTS.FooterItems.map(item => topFooterItemsRender(item));
  }

  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerTop}>
        <div>{topFooterRender()}</div>
      </div>
    </div>
  );
}

export default Footer;
