import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchJobsInformation } from '../features/JobInformation/JobSlice';
import JobList from './JobList';
import Loading from '../components/Loading'

const JobLists = () => {
    

    const {isLoading,isError,jobs} = useSelector((state)=> state.jobs)
    console.log(jobs)
    const {search}  = useSelector(state => state.filter) || ''
    const sort = useSelector(state => state.sort.value)
  
    let jobContent ;
    

    

    // decide to render 
    if(isLoading) jobContent = <Loading />
    if(!isLoading && isError) jobContent = <p>Error..</p>
    if(!isLoading && !isError && jobs.length > 0){
        console.log(jobs)
        jobContent = jobs
        .filter(job => {
            if(search){
                return job.title.toLowerCase().includes(search.toLowerCase())
            }
            return job
        })
        .sort((a,b)=>{
            if(sort === "lowToHigh"){
                console.log('lowToHigh')
                return b.salary - a.salary  
            }else if(sort === "highToLow"){
                return a.salary - b.salary 
            }
            return true
        })
        .map(job => <JobList job={job} key={job.id}/>)
    }
    if(!isLoading && !isError && jobs?.length === 0){
        jobContent = <p>No Jobs Found</p>
    }

    

    return (
        <div className="jobs-list">
                    {/* <!-- Single Job 1--> */}
                        {
                            jobContent
                        }
                    {/* <!-- Single Job 1--> */}
                </div>
    );
};

export default JobLists;