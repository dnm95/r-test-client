import React from "react";
import App from "next/app";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import { Provider } from "react-redux";
import { fromJS } from "immutable";
import Layout from "components/Layout";
import makeStore from "../store";


class CustomApp extends App {
  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Provider store={store}>
        <Layout>
          <Component
            {...pageProps}
          />
        </Layout>
      </Provider>
    );
  }
}

export default withRedux(makeStore, {
  serializeState: (state) => state.toJS(),
  deserializeState: (state) => fromJS(state)
})(withReduxSaga(CustomApp));
