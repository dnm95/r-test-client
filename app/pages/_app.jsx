import React from "react";
import App, { Container } from "next/app";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import { Provider } from "react-redux";
import { fromJS } from "immutable";
import Layout from "components/Layout";
import makeStore from "../store";


class CustomApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  constructor(props) {
    super(props);
    props.store.runSagaTask();
  }

  render() {
    const {
      Component, pageProps, store, router
    } = this.props;

    return (
      <Container>
        <Provider store={store}>
          <Layout>
            <Component
              {...pageProps}
              router={router}
            />
          </Layout>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(makeStore, {
  serializeState: state => state.toJS(),
  deserializeState: state => fromJS(state)
})(withReduxSaga(CustomApp));
