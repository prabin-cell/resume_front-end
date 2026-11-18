import React, { useRef } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { FaEdit } from 'react-icons/fa'
import { FaXmark } from 'react-icons/fa6'
import { TextField } from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import jobRoles from '../assets/jobRole.json'
import { UpdateResumeAPI } from '../services/allAPI'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  maxWidth: '95vw',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  maxHeight: '80vh',
  overflow: 'auto'
}

function Edit({ resumeData, setResumeData }) {

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const skillRef = useRef()

  const addSkills = (skill) => {
    if (skill && skill.trim()) {
      const newSkill = skill.trim()
      if (resumeData?.skills?.find(sk => sk.toLowerCase() === newSkill.toLowerCase())) {
        alert("Skill already added. Please add another one")
      } else {
        setResumeData({ ...resumeData, skills: [...(resumeData.skills || []), newSkill] })
        skillRef.current.value = ""
      }
    } else {
      alert("Enter a valid skill")
    }
  }

  const removeSkill = (skill) => {
    setResumeData({ ...resumeData, skills: resumeData.skills?.filter(sk => sk !== skill) })
  }

  const updateResume = async () => {

    const {
      name, JobTitle, Location, Email, phone,
      Github, Linkedin, course, university,
      passout, skills, summary
    } = resumeData;

    if (
      name && JobTitle && Location && Email &&
      phone && Github && Linkedin && course &&
      university && passout &&
      skills?.length > 0 && summary
    ) {
      try {
        const res = await UpdateResumeAPI(resumeData?.id, resumeData);
        console.log(res);

        if (res.status === 200) {
          alert("Resume updated successfully");
          handleClose()
        }
      } catch (error) {
        console.log(error);
        alert("Update failed");
      }
    } else {
      alert("Fill all the fields completely");
    }
  }

  return (
    <>
      <button onClick={handleOpen} className="btn btn-warning">
        <FaEdit className="fs-2" />
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Details
          </Typography>

          <div>
            <h3>Personal Details</h3>

            <TextField
              value={resumeData?.name || ''}
              onChange={(e) => setResumeData({ ...resumeData, name: e.target.value })}
              className='w-100'
              label="Full Name"
              variant="standard"
            />

            <FormControl variant="standard" className='w-100'>
              <InputLabel id="demo-simple-select-label">
                Job Title
              </InputLabel>

              <Select
                value={resumeData?.JobTitle || ''}
                onChange={(e) => setResumeData({ ...resumeData, JobTitle: e.target.value })}
                labelId="demo-simple-select-label"
              >
                {
                  jobRoles.jobRoles.map(job => (
                    <MenuItem key={job} value={job}>
                      {job}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>

            <TextField
              value={resumeData?.Location || ''}
              onChange={(e) => setResumeData({ ...resumeData, Location: e.target.value })}
              className='w-100'
              label="Location"
              variant="standard"
            />
          </div>

          <div>
            <h3>Contact Details</h3>

            <TextField
              value={resumeData?.Email || ''}
              onChange={(e) => setResumeData({ ...resumeData, Email: e.target.value })}
              className='w-100'
              label="Email"
              variant="standard"
            />

            <TextField
              value={resumeData?.phone || ''}
              onChange={(e) => setResumeData({ ...resumeData, phone: e.target.value })}
              className='w-100'
              label="Phone"
              variant="standard"
            />

            <TextField
              value={resumeData?.Linkedin || ''}
              onChange={(e) => setResumeData({ ...resumeData, Linkedin: e.target.value })}
              className='w-100'
              label="LinkedIn"
              variant="standard"
            />

            <TextField
              value={resumeData?.Github || ''}
              onChange={(e) => setResumeData({ ...resumeData, Github: e.target.value })}
              className='w-100'
              label="Github"
              variant="standard"
            />
          </div>

          <div>
            <h3>Educational Details</h3>

            <TextField
              value={resumeData?.course || ''}
              onChange={(e) => setResumeData({ ...resumeData, course: e.target.value })}
              className='w-100'
              label="Course/Degree"
              variant="standard"
            />

            <TextField
              value={resumeData?.university || ''}
              onChange={(e) => setResumeData({ ...resumeData, university: e.target.value })}
              className='w-100'
              label="University / College"
              variant="standard"
            />

            <TextField
              value={resumeData?.passout || ''}
              onChange={(e) => setResumeData({ ...resumeData, passout: e.target.value })}
              className='w-100'
              label="Passout year"
              variant="standard"
            />
          </div>

          <div className='mt-3'>
            <h3>Skills</h3>

            <div className='d-flex align-items-center justify-content-center'>
              <input
                ref={skillRef}
                type="text"
                className='form-control'
                placeholder='enter skill'
              />
              <button
                onClick={() => addSkills(skillRef.current.value)}
                className='btn btn-primary ms-3'
              >
                Add
              </button>
            </div>

            <h5 className='mt-5'>Added skills</h5>

            <div className='d-flex flex-wrap'>
              {
                resumeData?.skills?.map(sk => (
                  <button
                    key={sk}
                    className='btn btn-dark m-1'
                    onClick={() => removeSkill(sk)}
                  >
                    {sk} <FaXmark />
                  </button>
                ))
              }
            </div>
          </div>

          <div className='mt-3'>
            <h3>Professional summary</h3>
            <TextField
              value={resumeData?.summary || ''}
              onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
              className='w-100'
              label="Summary"
              variant="standard"
              multiline
            />
          </div>

          <button onClick={updateResume} className='btn btn-primary my-3 w-100'>
            UPDATE
          </button>

        </Box>
      </Modal>
    </>
  )
}

export default Edit