import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";
import { useI18next } from "gatsby-plugin-react-i18next";
import clsx from "clsx";
import Layout from "../components/layout";
import LeftNav from "../components/leftNavigation";
import "highlight.js/styles/stackoverflow-light.css";
import "./docTemplate.less";
import { useWindowSize } from "../http/hooks";
import Aside from "../components/aside";
import Footer from "../components/footer";
import { useCodeCopy } from "../hooks/doc-dom-operation";
import Seo from "../components/seo";
import { useOpenedStatus } from "../hooks";

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          data
          language
          ns
        }
      }
    }
  }
`;

export default function Template({ data, pageContext }) {
  const {
    doc,
    name,
    allApiMenus,
    allMenus,
    version,
    locale,
    docVersions,
    docVersion,
    category,
    // newestVersion,
  } = pageContext;

  const [targetDocVersion, setTargetDocVersion] = useState();
  const [windowSize, setWindowSize] = useState("desktop1440");
  const [isOpened, setIsOpened] = useState(false);
  useOpenedStatus(setIsOpened);

  const currentWindowSize = useWindowSize();
  useEffect(() => {
    setWindowSize(currentWindowSize);
  }, [currentWindowSize]);

  const isMobile = ["phone", "tablet"].includes(windowSize);
  const { t } = useI18next();

  // https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md
  // Specify supported languages to fix Java doc code layout.
  const hljsCfg = {
    languages: ["java", "go", "python", "javascript"],
  };

  useEffect(() => {
    // Get docVersion from local stroage, to keep the doc verison consistent.
    const localStorageDocVer = window?.localStorage?.getItem("docVersion");
    // To judge if docVersion includes local storage doc verion or not.
    // Reset to the latest doc version if not including.
    const ver =
      (docVersion.includes(localStorageDocVer)
        ? localStorageDocVer
        : docVersion[0]) || "master";
    setTargetDocVersion(ver);
    window?.localStorage?.setItem("docVersion", ver);
  }, [docVersion]);

  useCodeCopy(
    {
      copy: t("v3trans.copyBtn.copyLabel"),
      copied: t("v3trans.copyBtn.copiedLabel"),
    },
    hljsCfg
  );

  const apiReferenceData = {
    projName: category,
    relativePath: name,
    apiVersion: version,
  };

  // Generate apiReferenceData.sourceUrl for final page's Edit Button.
  switch (category) {
    case "pymilvus":
      const path = name?.split("pymilvus_")?.[1]?.replace(".html", ".rst");
      const url = `https://github.com/milvus-io/pymilvus/edit/${version.slice(
        1
      )}/docs/source/${path}`;
      apiReferenceData.sourceUrl = url;
      break;
    case "node":
      const relativePath = name
        ?.split("node_")?.[1]
        ?.replace(".html", ".ts")
        ?.split("/")
        ?.pop();
      const transformName = (originName = "") => {
        if (originName === "index.ts") return "MilvusIndex.ts";
        return originName.charAt(0).toUpperCase() + originName.slice(1);
      };
      if (name.includes("api reference")) {
        const fileName = transformName(relativePath);
        apiReferenceData.sourceUrl = `https://github.com/milvus-io/milvus-sdk-node/edit/main/milvus/${fileName}`;
      }
      if (name.includes("tutorial")) {
        apiReferenceData.sourceUrl =
          "https://github.com/milvus-io/milvus-sdk-node/edit/main/README.md";
      }
      break;
    default:
      break;
  }

  // For left nav
  const leftNavHomeUrl = `/docs/${targetDocVersion}`;
  const menuList =
    allMenus.find(
      v => v.absolutePath.includes(targetDocVersion) && v.lang === locale
    ) || [];

  return (
    <Layout t={t} showFooter={false} headerClassName="docHeader">
      <Seo
        title={`API Reference: ${category}`}
        lang={locale}
        version={version}
      />
      <div className={"doc-temp-container"}>
        <LeftNav
          homeUrl={leftNavHomeUrl}
          homeLabel={t("v3trans.docs.homeTitle")}
          menus={menuList.menuList}
          apiMenus={allApiMenus}
          currentVersion={targetDocVersion}
          locale={locale}
          docVersions={docVersions}
          mdId={name}
          isMobile={isMobile}
          pageType="api"
          trans={t}
          isOpened={isOpened}
          onMenuCollapseUpdate={setIsOpened}
        />
        <div
          className={clsx("doc-right-container", {
            [`is-opened`]: isOpened,
          })}
        >
          <div className={"doc-content-container"}>
            <div className="doc-post-wrapper doc-style">
              <div
                className={`api-reference-wrapper doc-style ${category}`}
                dangerouslySetInnerHTML={{ __html: doc }}
              ></div>
            </div>
            <div className="doc-toc-container">
              <Aside
                apiReferenceData={apiReferenceData}
                category="api"
                isHome={false}
              />
            </div>
          </div>
          <Footer t={t} darkMode={false} className="doc-right-footer" />
        </div>
      </div>
    </Layout>
  );
}
