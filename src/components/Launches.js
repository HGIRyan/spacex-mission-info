import React, { Component, Fragment } from 'react'
import gql from 'graphql-tag'
import { Query } from "react-apollo";
import LaunchItem from './LaunchItem'
import Loading from './../Assets/Infinity-loading.svg'
import LazyLoad from 'react-lazyload';

const LAUNCHES_QUERY = gql`
    query LaunchesQuery {
        launches {
            flight_number
            mission_name
            launch_date_local
            launch_success
        }
    }
`;


export class Launches extends Component {
    render() {
        return (
            <Fragment>
                <h1 className="display-4 my-3">Launches</h1>
                <Query query={LAUNCHES_QUERY}>
                    {
                        ({ loading, error, data }) => {
                            if (loading) return <img src={Loading} alt='Loading' />
                            if (error) console.log(error);
                            return <Fragment>
                                <LazyLoad height={200}>
                                    {

                                        data.launches.map(launch => (
                                            <LaunchItem key={launch.flight_number} launch={launch} />
                                        ))
                                    }
                                </LazyLoad>
                            </Fragment>
                        }
                    }
                </Query>
            </Fragment>
        )
    }
}

export default Launches
