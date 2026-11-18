import React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'

function Preview({ resumeData }) {
  return (
    <Box component="section">
      <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>

        <h3>{resumeData.name}</h3>
        <h4>{resumeData.JobTitle}</h4>

        <p>
          <span>{resumeData.Location}</span>{' | '}
          <span>{resumeData.Email}</span>{' | '}
          <span>{resumeData.phone}</span>
        </p>

        <p>
          <Link href={resumeData.Github} target="_blank" rel="noreferrer">
            {resumeData.Github}
          </Link>{' '}
          <Link href={resumeData.Linkedin} target="_blank" rel="noreferrer">
            {resumeData.Linkedin}
          </Link>
        </p>

        <Divider>
          <h2>SUMMARY</h2>
        </Divider>
        <p>{resumeData.summary}</p>

        <Divider>
          <h2>SKILLS</h2>
        </Divider>
        {resumeData?.skills?.map((sk, index) => (
          <button key={index} className="btn border m-2">{sk}</button>
        ))}

        <Divider>
          <h2>EDUCATION</h2>
        </Divider>
        <h4>{resumeData.course}</h4>
        <p>
          <span>{resumeData.university}</span>{' '}
          <span>{resumeData.passout}</span>
        </p>

      </Paper>
    </Box>
  )
}

export default Preview