
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { FaTrash } from 'react-icons/fa';
import { dltHistoryAPI, getHistoryAPI } from '../services/allAPI';



function History() {

  const [history, setHistory] = useState([])

  useEffect(() => {
    getHistory()
  }, [])


  const getHistory = async () => {
    const res = await getHistoryAPI()
    //console.log(res);
    if (res.status == 200) {
      setHistory(res.data)
    }

  }

  const dltHistory=async(id)=>{
    const res=await dltHistoryAPI(id)
    console.log(res);
    if(res.status==200){
      getHistory()
    }
    
  }
  return (
    <div className="container m-5">
      <h1 className="text-center text-danger">Downloaded Resume</h1>

      <Link to="/" style={{ float: 'right' }}>Back</Link>

      <div className="row mt-5">
        {
          history?.length > 0 ?

            history?.map(his => (
              <div key={his.id} className="col-md-4">
                <Box className="my-2">
                  <Paper elevation={3} sx={{ padding: 2 }}>
                    <div className="d-flex align-items-center justify-content-between">
                      <h6>Review at:{his?.timestamp}</h6>

                      <button onClick={()=>dltHistory(his.id)} className="btn text-danger fs-5">
                        <FaTrash />
                      </button>
                    </div>

                    <img
                      src={his.resumeImg} className='img-fluid'
                      alt="Resume image" />
                  </Paper>
                </Box>
              </div>
            ))

            :
            <p className='text-center my-5 text-danger'>No resumes Downloaded</p>
        }
      </div>
    </div>
  )
}

export default History
