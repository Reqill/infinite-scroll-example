import React, { useState, useEffect, useRef, useCallback } from 'react'
import LaunchCard from './LaunchCard'
import useFetchLaunches from '../hooks/useFetchLaunches'
import ReactLoading from 'react-loading';

// index of item that will trigger loading of new data (caounting from last)
const PRELOAD_END_INDEX = 6;

interface Props {
    querry?: string | null
}

const InfiniteScroll: React.FC<Props> = ({ querry = null }) => {
    const [page, setPage] = useState<number>(1)
    const { loading, launchLinks, launchTitles, hasMore, error } = useFetchLaunches(page, querry)

    // trigger loading if selected item is in viewport
    const observer = useRef<any>()
    const fetchTriggerElement = useCallback((container: any) => {

        if (loading) return
        if (observer.current) observer.current.disconnect()

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) setPage(prevPage => prevPage + 1)
        })

        if (container) observer.current.observe(container)
    }, [loading, hasMore])


    useEffect(() => {
        setPage(1)
    }, [querry])

    return (
        <div className="w-full flex gap-3 flex-col mb-12">

            {launchTitles?.map((el: any, idx: number) => {
                if (launchTitles.length - PRELOAD_END_INDEX === idx) {
                    return <LaunchCard refference={fetchTriggerElement} key={`${el} + ${idx}`} title={el} link={launchLinks[idx]} />
                } else {
                    return <LaunchCard key={`${el} + ${idx}`} title={el} link={launchLinks[idx]} />
                }
            })}
            {
                loading &&
                <div className="w-full justify-center">
                    <ReactLoading type="bars" color="#1F2937" height={'50px'} width={'50px'} className="mx-auto" />
                </div>
            }


            {
                error &&
                <p className="text-gray-600 text-lg font-light my-2 text-center mx-auto w-full">An error accured :c</p>
            }
            {
                (!hasMore && launchTitles.length !== 0) &&
                <p className="text-gray-600 text-lg font-light my-2 text-center mx-auto w-full">You've reached the rock bottom ;o</p>
            }
            {
                (launchTitles.length === 0 && !loading) &&
                <p className="text-gray-600 text-lg font-light my-2 text-center mx-auto w-full">No data maches the querry :v</p>
            }
        </div>
    );
}
export default InfiniteScroll