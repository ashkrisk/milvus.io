import React from 'react';
import { graphql } from 'gatsby';
import V2Layout from '../components/layout/v2Layout';
import Button from '../components/button';
import autoscalingIcon from '../images/v2/autoscaling.svg';
import deploymentIcon from '../images/v2/deployment.svg';
import searchIcon from '../images/v2/searchicon.png';
import storageIcon from '../images/v2/storage.svg';
import supportIcon from '../images/v2/support.svg';
import GithubButton from 'react-github-button';
import './index.less';
import Seo from '../components/seo';
import bgImg3 from '../images/v2/bg-img3.png';
import contributor from '../images/v2/contributor.png';

const icons = {
  autoscaling: autoscalingIcon,
  deployment: deploymentIcon,
  search: searchIcon,
  storage: storageIcon,
  supporting: supportIcon,
};

const HomePage = ({ data, pageContext }) => {
  const {
    header,
    banner,
    content: { feature, community },
    footer,
  } = data.allFile.edges.filter(
    edge => edge.node.childI18N
  )[0].node.childI18N.v2;

  const {
    slogan,
    user
  } = data.allFile.edges.filter(
    edge => edge.node.childUsers
  )[0].node.childUsers;
  const { locale, versions } = pageContext;

  return (
    <div className="home-page-container">
      <div className="page-content">
        <V2Layout
          header={header}
          footer={footer}
          locale={locale}
          versions={versions}
        >
          <Seo title="Milvus 2.0" />
          <div className="banner">
            <div className="banner-left">
              <div className="stars-layout">
                <GithubButton
                  className="git-stars"
                  type="stargazers"
                  size="large"
                  namespace="milvus-io"
                  repo="milvus"
                />
              </div>
              <p className="sub-title">{banner.subTitle}</p>
              <div className="title-wrapper">
                {banner.title.map(item => (
                  <p className="title" key={item}>
                    {item.toUpperCase()}
                  </p>
                ))}
              </div>
              <p className="text">{banner.text}</p>
              <div className="banner-btn-wrapper">
                <Button
                  className="banner-btn1"
                  link={banner.startBtn.href}
                  locale={locale}
                  children={
                    <>
                      <span className="btn-label">{banner.startBtn.label}</span>
                      <i className="fa fa-chevron-right"></i>
                    </>
                  }
                />
                <Button
                  className="banner-btn2"
                  variant="outline"
                  link={banner.contributeBtn.href}
                  locale={locale}
                  children={
                    <>
                      <span className="btn-label">{banner.contributeBtn.label}</span>
                      <i className="fas fa-pencil-alt"></i>
                    </>
                  }
                />
              </div>
            </div>
            <div className="banner-right"></div>
          </div>
          <div className="slogan">
            <p className='text'>{slogan.text}</p>
            <p className="author">{slogan.author}</p>
          </div>
          <div className="content">
            <h3 className="title-bar">
              <span className="title">{feature.title}</span>
              <span className="line"></span>
            </h3>
            <ul className="feature-section">
              {feature.list.map(i => {
                const { img, text, title } = i;
                return (
                  <li className="section-item" key={img}>
                    <div className="icon-wrapper">
                      <img src={icons[img]} alt={img} />
                    </div>
                    <p className="title">{title}</p>
                    <p className="text">{text}</p>
                  </li>
                );
              })}
              <li className="section-item">
                <img className='img' src={bgImg3} alt="" />
              </li>
            </ul>
            {
              !!user.list.length ? (
                <div className="user-section">
                  <h3 className="title-bar">
                    <span className="title">{user.title}</span>
                    <span className="line"></span>
                  </h3>
                  <ul className="users-list">
                    {
                      user.list.map(item => {
                        const { name, link } = item;
                        return (
                          <li key={name} className="list-item">
                            <a href={link} target="_blank" rel="noreferrer">
                              <img src={contributor} alt="contributor" />
                            </a>
                          </li>
                        );
                      })
                    }
                  </ul>
                </div>
              ) : null
            }
            <div className="community-section">
              <div className="wrapper">
                <div className="text-wrapper">
                  <p className="title">{community.title}</p>
                  <p className="text">{community.text1}</p>
                  <p className="text ">{community.text2}</p>
                </div>

                <Button
                  className="communityBtn"
                  link={community.gitBtn.href}
                  locale={locale}
                  children={
                    <>
                      <span>{community.gitBtn.label}</span>
                      <i className="fa fa-chevron-right"></i>
                    </>
                  }
                />
              </div>
            </div>
          </div>
        </V2Layout>
      </div>
    </div>
  );
};

export const Query = graphql`
  query V2HomeQuery($locale: String) {
    allFile(filter: { name: { eq: $locale } }) {
      edges {
        node {
          childI18N {
            v2 {
              banner {
                title
                subTitle
                text
                startBtn {
                  href
                  label
                }
                contributeBtn {
                  href
                  label
                }
              }
              content {
                feature {
                  title
                  list {
                    title
                    text
                    img
                  }
                }
                community {
                  title
                  text1
                  text2
                  gitBtn {
                    href
                    label
                  }
                }
              }
              footer {
                list {
                  title
                  text
                  href
                  label
                  icons {
                    href
                    name
                  }
                }
                licence {
                  text1 {
                    label
                    link
                  }
                  text2 {
                    label
                    link
                  }
                  text3 {
                    label
                    link
                  }
                  list {
                    label
                    link
                  }
                }
              }
            }
          }
          childUsers {
            user {
              title
              list {
                link
                name
              }
            }
            slogan {
              author
              text
            }
          }
        }
      }
    }
  }
`;

export default HomePage;
