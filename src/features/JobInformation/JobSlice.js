import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addJobs, deleteJobs, editJobs, getJobs } from "./JobApi"

const initialState = {
    jobs:[],
    isLoading:false,
    isError:false,
    error:''
}


// async 
export const fetchJobsInformation = createAsyncThunk('jobs/fetchJobsInformation',async(search)=>{
    const jobs = await getJobs(search)
    return jobs
})

export const fetchAddJobsInformation = createAsyncThunk('addJobs/fetchJobsInformation',async(data)=>{
    const jobs = await addJobs(data)
    return jobs
})

export const fetchEditJobsInformation = createAsyncThunk('editJobs/fetchJobsInformation',async({id,data})=>{
    const jobs = await editJobs(id,data)
    return jobs
})

export const fetchDeleteJobsInformation = createAsyncThunk('deleteJobs/fetchJobsInformation',async(id)=>{
    const jobs = await deleteJobs(id)
    return jobs
})


// slice 
const JobsSlice = createSlice({
    name:'jobs',
    initialState,
    extraReducers:(builder)=>{
        builder
            .addCase(fetchJobsInformation.pending,(state)=>{
                state.isLoading = true
                state.isError=false
            })
            .addCase(fetchJobsInformation.fulfilled,(state,action)=>{
                state.isLoading=false
                state.isError=false 
                state.jobs = action.payload
            })
            .addCase(fetchJobsInformation.rejected,(state,action)=>{
                state.isLoading=false
                state.isError=true 
                state.error = action.error?.message
                state.jobs = []
            })


            .addCase(fetchAddJobsInformation.pending,(state)=>{
                state.isLoading = true
                state.isError=false
            })
            .addCase(fetchAddJobsInformation.fulfilled,(state,action)=>{
                state.isLoading=false
                state.isError=false 
                state.jobs=action.payload
            })
            .addCase(fetchAddJobsInformation.rejected,(state,action)=>{
                state.isLoading=false
                state.isError=true 
                state.error = action.error?.message
            })


            .addCase(fetchEditJobsInformation.pending,(state)=>{
                state.isLoading = true
                state.isError=false
            })
            .addCase(fetchEditJobsInformation.fulfilled,(state,action)=>{
                state.isLoading=false
                state.isError=false 
                    const indexId = state.jobs.findIndex(job => job.id === action.payload.id)
                    state.jobs[indexId] = action.payload
            })
            .addCase(fetchEditJobsInformation.rejected,(state,action)=>{
                state.isLoading=false
                state.isError=true 
                state.error = action.error?.message
            })


            .addCase(fetchDeleteJobsInformation.pending,(state)=>{
                state.isLoading = true
                state.isError=false
            })
            .addCase(fetchDeleteJobsInformation.fulfilled,(state,action)=>{
                state.isLoading=false
                state.isError=false 
                state.jobs = state.jobs.filter(
                    (job) => job.id !== action.meta.arg
                );
                    
            })
            .addCase(fetchDeleteJobsInformation.rejected,(state,action)=>{
                state.isLoading=false
                state.isError=true 
                state.error = action.error?.message
            })
    }
})


export default JobsSlice.reducer