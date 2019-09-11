import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import Header from "./Header";
import Footer from "./Footer";
import MRoot from "./modals/Root";
import "static/assets/scss/main.scss";

const Layout = (props) => (
  <div>
    <Head>
      <title>{ props.title }</title>
      <link rel="shortcut icon" type="image/x-icon" href="/static/favicon.ico" />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" key="viewport" />
    </Head>
    <Header />
    <div>{ props.children }</div>
    <Footer />
    <MRoot />
  </div>
);

Layout.defaultProps = {
  title: "Luuna"
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string
};

export default Layout;
