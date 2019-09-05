import React from "react";
import { connect } from "helpers";


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
        store.dispatch(dispatch);
        store.close();
        await rootTask.toPromise().then();
      } else {
        store.runSagaTask();
        store.dispatch(dispatch);
      }

      const props = {};
      if (ctx.req.csrfToken) {
        props.csrfToken = ctx.req.csrfToken();
      }
      return props;
    }

    render() {
      return (
        <BaseComponent
          {...this.props}
        />
      );
    }
  }

  const hoc = connect(
    mapStateToProps,
    mapDispatchToProps
  )(HOC);
  return hoc;
};
