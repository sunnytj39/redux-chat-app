import { connect } from 'react-redux';
import { compose } from 'recompose';

import withAuthorization from 'components/Session/withAuthorization';

const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser,
});

const authCondition = (authUser) => !!authUser;

const accountContainer = Component => compose(
    withAuthorization(authCondition),
    connect(mapStateToProps)
)(Component);

export default accountContainer


