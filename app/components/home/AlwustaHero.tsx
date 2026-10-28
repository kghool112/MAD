import { Link } from '@salla.sa/twilight-theme-engine/common';
import { useTranslation } from '@salla.sa/twilight-theme-engine/i18n';
import { useTwilight } from '@salla.sa/twilight-theme-engine/providers';
import { useQuery } from '@tanstack/react-query';
import { menu } from '@salla.sa/twilight-theme-engine/api/menu';

function StoreDepartments() {
  const { t } = useTranslation();
  const { data: items = [] } = useQuery(menu.queries.header());
  const links = items.filter((item) => item.title && item.url && !item.url.startsWith('#')).slice(0, 6);
  if (!links.length) return null;

  return (
    <nav className="aw-departments" aria-label={t('alwusta.home.departments', 'Explore the store')}>
      <div className="aw-departments__heading">
        <span className="aw-eyebrow">{t('alwusta.home.discover', 'Find your next favourite')}</span>
        <h2>{t('alwusta.home.departments', 'Explore the store')}</h2>
      </div>
      <div className="aw-departments__links">
        {links.map((item) => (
          <Link
            key={String(item.id) + item.url}
            to={item.url}
            className="aw-department"
            {...(item.target && item.target !== '_self' ? { target: item.target, rel: 'noopener noreferrer' } : {})}
          >
            <span>{item.title}</span>
            <span className="aw-arrow" aria-hidden="true">↗</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

export function AlwustaHero() {
  const { theme } = useTwilight();
  const { t } = useTranslation();
  if (theme?.settings?.alwusta_light_design === false || theme?.settings?.alwusta_show_hero === false) {
    return null;
  }

  return (
    <div className="aw-home container">
      <section className="aw-hero" aria-labelledby="aw-hero-title">
        <div className="aw-hero__copy">
          <span className="aw-eyebrow"><span className="aw-status-dot" aria-hidden="true" />{t('alwusta.home.eyebrow', 'Technology for your everyday')}</span>
          <h2 id="aw-hero-title">
            {t('alwusta.home.title', 'Your everyday tech.')}
            <span>{t('alwusta.home.title_accent', 'A smarter choice.')}</span>
          </h2>
          <p>{t('alwusta.home.description', 'Discover phones, tablets, computers and accessories that fit your day. A simple way to find what suits you.')}</p>
          <Link to="/products" className="aw-button">
            {t('alwusta.home.shop', 'Explore products')}
            <span className="aw-arrow" aria-hidden="true">↗</span>
          </Link>
          <ul className="aw-hero__tags" aria-label={t('alwusta.home.range', 'Our range')}>
            <li>{t('alwusta.home.phones', 'Phones & tablets')}</li>
            <li>{t('alwusta.home.computers', 'Computers')}</li>
            <li>{t('alwusta.home.accessories', 'Accessories')}</li>
          </ul>
        </div>
        <div className="aw-scene" aria-hidden="true">
          <div className="aw-scene__orbit" />
          <div className="aw-scene__orbit aw-scene__orbit--inner" />
          <div className="aw-laptop">
            <div className="aw-laptop__display"><div className="aw-wallpaper" /><span className="aw-display-dot" /></div>
            <div className="aw-laptop__base" />
          </div>
          <div className="aw-phone">
            <div className="aw-wallpaper" /><span className="aw-phone__camera" /><span className="aw-phone__bar" />
          </div>
          <div className="aw-earbuds"><span /><span /></div>
          <span className="aw-scene__spark aw-scene__spark--one" />
          <span className="aw-scene__spark aw-scene__spark--two" />
          <span className="aw-scene__label">{t('alwusta.home.scene_label', 'Your next upgrade starts here')}</span>
        </div>
      </section>
      <StoreDepartments />
    </div>
  );
}
