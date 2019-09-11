import React from "react";
import { withRouter } from "next/router";
import PropTypes from "prop-types";
import cookies from 'next-cookies'
import api from "Api";
import { connect } from "helpers";
import selectors from "selectors";


export default (mapStateToProps, mapDispatchToProps) => (BaseComponent, actions) => {
  class HOC extends React.PureComponent {
    static async getInitialProps(ctx) {
      const { store, isServer, ...rest } = ctx;

      let action = ((actions && actions.type) ? actions : { type: "" });
      if (actions) {
        action = actions.server || actions.client || action;
      }
      const dispatch = Object.assign({}, action, { isServer }, { query: rest.query });
      if (isServer) {
        const rootTask = store.runSagaTask();
        const { token, user } = cookies(ctx);

        store.dispatch({
          type: "INJECT_FROM_SERVER",
          payload: {
            accessToken: token || null,
            user: user ? JSON.parse(user) : null,
          },
        });
        store.dispatch(dispatch);
        store.close();
        await rootTask.toPromise().then();
      } else {
        store.runSagaTask();
        store.dispatch(dispatch);
      }

      const pageProps = BaseComponent.getInitialProps
        ? await BaseComponent.getInitialProps(ctx)
        : {};
      return { pageProps };
    }

    render() {
      api.accessToken = this.props.accessToken;
      return (
        <BaseComponent
          {...this.props}
        />
      );
    }
  }

  HOC.defaultProps = {
    accessToken: null,
  };

  HOC.propTypes = {
    accessToken: PropTypes.string,
  };

  const superMapStateToProps = (state) => ({
    ...selectors.globals(state),
    ...(mapStateToProps ? mapStateToProps(state) : {})
  });

  return withRouter(connect(
    superMapStateToProps,
    mapDispatchToProps
  )(HOC));
};
