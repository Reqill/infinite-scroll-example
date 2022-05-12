import React, { useState, useEffect } from 'react'
import axios from 'axios';

const ENDPOINT = `https://api.spacex.land/graphql/`
const RESPONSE_LENGTH = 18;

export default function useFetchLaunches(page: number, querry: string | null) {

    const [launchTitles, setLaunchTitles] = useState<Array<string>>([])
    const [launchLinks, setLaunchLinks] = useState<Array<string>>([])
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(false)
    const [error, setError] = useState(false)

    let currentQuerry = querry === '' ? null : querry

    const PAST_LAUNCHES = `{
        launchesPast(limit: ${RESPONSE_LENGTH}, offset: ${(page - 1) * RESPONSE_LENGTH}${currentQuerry !== null ? `, find: {mission_name: "${currentQuerry}"}` : ""}) {
        mission_name
            links {
                article_link
            }
        }
    }`

    useEffect(() => {
        setLaunchLinks([])
        setLaunchTitles([])
    }, [querry])

    useEffect(() => {
        let cancel: any;
        setLoading(true);
        setError(false)

        axios({
            method: "POST",
            url: ENDPOINT,
            data: {
                query: PAST_LAUNCHES
            },
            cancelToken: new axios.CancelToken(c => cancel = c)

        }).then(response => {
            setLaunchTitles(previousLaunchDataTitles => {
                return [...previousLaunchDataTitles, ...response.data.data.launchesPast?.map((el: any) => el.mission_name)]
            })
            setLaunchLinks(previousLaunchDataLinks => {
                return [...previousLaunchDataLinks, ...response.data.data.launchesPast?.map((el: any) => el.links.article_link)]
            })
            setHasMore(response.data.data.launchesPast?.length === RESPONSE_LENGTH)
            setLoading(false)

        }).catch(e => {
            if (axios.isCancel(e)) return
            console.error(e)
            setError(true)
        })

        return () => cancel()
    }, [page, querry])

    return { loading, launchLinks, launchTitles, hasMore, error };
};