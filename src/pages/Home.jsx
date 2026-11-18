
import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <section id='part1'>
  <div className='container h-100 d-flex align-items-center justify-content-center'>
    <div className="box border p-4 p-md-5 rounded bg-white bg-opacity-25 text-center">
      <h1>Designed to <br />hire your next</h1>
      <h4>
        Your skill, your story, <br />
        job - all in one
      </h4>
      <Link to='/steps' className='btn btn-dark text-light mt-5'>
        MAKE YOUR RESUME
      </Link>
    </div>
  </div>
</section>

      <section className='p-5'>
        <h1 className='text-center'>Tools</h1>

        <div className='row align-items-center'>
          <div className='col-md-6'>
            <h4>Resume</h4>
            <p>Create unlimited new resumes and easily edit them afterward</p>

            <h4>Cover Letters</h4>
            <p>Easily write professional cover letters</p>

            <h4>Jobs</h4>
            <p>Automatically receive new and relevant job postings</p>

            <h4>Applications</h4>
            <p>
              Effortlessly manage and track your job applications
              in an organized manner
            </p>
          </div>

          <div className='col-md-6 p-5'>
            <img
              src="https://instaresume.io/section_1.webp"
              alt="Resume creation tools"
              width={500}
              className='img-fluid'
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
