import React from 'react';
import * as styles from './index.module.less';

const BannerCard = ({
  title,
  content = [],
  children,
  className = '',
  img,
  isMobile = false,
  locale
}) => {

  return (
    <>
      {
        isMobile ? (
          <div className={`${styles.mobileBannerCard} ${className}`}>
            <h1 className={styles.title} lang={locale}>{title}</h1>
            <div className={styles.bannerImg}>
              <img src={img} alt="banner" className={styles.img} />
            </div>
            {
              !!content.length ? (
                <div>
                  {
                    content.map(item => (
                      <p
                        className={styles.text}
                        key={item}
                        lang={locale}
                      >{item}</p>
                    ))
                  }
                </div>
              ) : children
            }
          </div>
        ) : (
          <div className={`${styles.bannerCard} ${className}`}>
            <div className={styles.contentWrapper}>
              <h1 className={styles.title} lang={locale}>{title}</h1>
              {
                !!content.length ? (
                  <div>
                    {
                      content.map(item => (
                        <p
                          className={styles.text}
                          key={item}
                          lang={locale}
                        >{item}</p>
                      ))
                    }
                  </div>
                ) : children
              }
            </div>
            <div className={styles.bannerImg}>
              <img src={img} alt="banner" className={styles.img} />
            </div>
          </div>
        )
      }
    </>
  );
};

export default BannerCard;