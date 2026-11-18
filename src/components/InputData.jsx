import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import JobTitle from '../assets/jobRole.json'
import skills from '../assets/jobSkills.json'
import jobsummary from '../assets/summaries.json'
import { addResumeAPI } from '../services/allAPI';
import { useNavigate } from 'react-router-dom';

const steps = [
  'Basic informations',
  'Contact Details',
  'Education Details',
  'Review & Submit'
];

function InputData({ resumeData, setResumeData }) {
  console.log(resumeData);

  

  const [activeStep, setActiveStep] = useState(0);
     const navigate = useNavigate()


  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const renderStepContent = (stepcount) => {

    switch (stepcount) {

      case 0:
        return (
          <div>
            <h3>Personal Details</h3>

            <TextField
              value={resumeData.name}
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
                value={resumeData.JobTitle}
                onChange={(e) => setResumeData({ ...resumeData, JobTitle: e.target.value })}
                labelId="demo-simple-select-label"
              >
                {
                  JobTitle.jobRoles.map(job => (
                    <MenuItem key={job} value={job}>
                      {job}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>

            <TextField
              value={resumeData.Location}
              onChange={(e) => setResumeData({ ...resumeData, Location: e.target.value })}
              className='w-100'
              label="Location"
              variant="standard"
            />
          </div>
        );

      case 1:
        return (
          <div>
            <h3>Contact Details</h3>

            <TextField
              value={resumeData.Email}
              onChange={(e) => setResumeData({ ...resumeData, Email: e.target.value })}
              className='w-100'
              label="Email"
              variant="standard"
            />

            <TextField
              value={resumeData.phone}
              onChange={(e) => setResumeData({ ...resumeData, phone: e.target.value })}
              className='w-100'
              label="Phone"
              variant="standard"
            />

            <TextField
              value={resumeData.Linkedin}
              onChange={(e) => setResumeData({ ...resumeData, Linkedin: e.target.value })}
              className='w-100'
              label="LinkedIn"
              variant="standard"
            />

            <TextField
              value={resumeData.Github}
              onChange={(e) => setResumeData({ ...resumeData, Github: e.target.value })}
              className='w-100'
              label="Github"
              variant="standard"
            />
          </div>
        );

      case 2:
        return (
          <div>
            <h3>Educational Details</h3>

            <TextField
              value={resumeData.course}
              onChange={(e) => setResumeData({ ...resumeData, course: e.target.value })}
              className='w-100'
              label="Course/Degree"
              variant="standard"
            />

            <TextField
              value={resumeData.university}
              onChange={(e) => setResumeData({ ...resumeData, university: e.target.value })}
              className='w-100'
              label="University / College"
              variant="standard"
            />

            <TextField
              value={resumeData.passout}
              onChange={(e) => setResumeData({ ...resumeData, passout: e.target.value })}
              className='w-100'
              label="Passout year"
              variant="standard"
            />
          </div>
        );

      case 3:
        return (
          <div>
            <h3>Skills</h3>

            <p>
              Our AI will generate skills and summary according
              to your job role. Click the
              <span className='fw-bold'> AI SKILL & SUMMARY </span>
              button to proceed.
            </p>

            <h5></h5>
            <p>{resumeData.skills.join(", ")}</p>

            <h5></h5>
            <p>{resumeData.summary}</p>
          </div>
        );

      default:
        return null;
    }
  };

  const generateSkillsum = () => {

    if (!resumeData.JobTitle) {
      alert("Please select a job title");
      return;
    }

    setResumeData({
      ...resumeData,
      skills: skills[resumeData.JobTitle] || [],
      summary: jobsummary[resumeData.JobTitle] || ""
    });

    handleNext();
  };

  const addResume = async () => {

    const {
      name, JobTitle, Location, Email, phone,
      Github, Linkedin, course, university,
      passout, skills: resumeSkills, summary
    } = resumeData;

    if (
      name && JobTitle && Location && Email &&
      phone && Github && Linkedin && course &&
      university && passout &&
      resumeSkills.length > 0 && summary
    ) {

      try {

        const res = await addResumeAPI(resumeData);

        console.log(res);

        if (res.status === 201) {
          alert("Resume generated successfully");
          navigate(`/view/${res.data.id}`)        }

      } catch (error) {
        console.log(error);
        alert("Something went wrong");
      }

    } else {
      alert("Fill all the fields completely");
    }
  };

  return (

    <Box sx={{ width: '100%' }}>

      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === steps.length ? (

        <React.Fragment>

          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you're finished
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>

            <Box sx={{ flex: '1 1 auto' }} />

            <Button onClick={addResume}>
              Finish
            </Button>

            

          </Box>

        </React.Fragment>

      ) : (

        <React.Fragment>

          <Typography sx={{ mt: 2, mb: 1 }}>
            Step {activeStep + 1}
          </Typography>

          <Box>
            {renderStepContent(activeStep)}
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>

            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>

            <Box sx={{ flex: '1 1 auto' }} />

            {
              activeStep === steps.length - 1 ?

                <button
                  className='btn'
                  onClick={generateSkillsum}
                >
                  Generate skills and summary
                </button>

                :

                <Button className='btn' onClick={handleNext}>
                  Next
                </Button>
            }

          </Box>

        </React.Fragment>

      )}

    </Box>
  );
}

export default InputData;