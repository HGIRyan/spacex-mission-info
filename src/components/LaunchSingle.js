import React, { Component, Fragment } from 'react'
import gql from 'graphql-tag'
import { Query } from "react-apollo";
import Loading from './../Assets/Infinity-loading.svg'



export class LaunchSingle extends Component {
    componentDidMount() {

    }
    render() {
        const LAUNCH_QUERY = gql`
        query LaunchQuery($search: Int!) {
            launch(flight_number: $search ) {
            flight_number
            mission_name
            launch_date_local
            launch_success
    }
        }
    `;
        console.log(this.props.match.params.search)
        let { search } = this.props.match.params;
        search = parseInt(search)
        return (
            <Fragment>
                <h5>Search: {this.props.match.params.search}</h5>
                <Query query={LAUNCH_QUERY} variables={{search}}>
                    {
                        ({ loading, error, data }) => {
                            if (loading) return <img src={Loading} alt='Loading' />
                            if (error) console.log(error);
                            console.log(data)
                            return <Fragment>
                                {
                                    <div className="card card-body mb-3">
                                        <div className="row">
                                            <div className="col-md-9">
                                                <h4>Mission: {data.launch.mission_name}</h4>
                                                <p>Date: {data.launch.launch_date_local.split('T')[0]}</p>
                                                <p>Time: {data.launch.launch_date_local.split('T')[1].split('+')[0]}</p>
                                            </div>
                                            <div className="col-md-3">
                                                <button className="btn btn-secondary">Launch Details: </button>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </Fragment>
                        }
                    }
                </Query>
            </Fragment>
        )
    }
}

export default LaunchSingle
