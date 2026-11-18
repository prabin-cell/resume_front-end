import React, { useEffect, useRef, useState } from 'react'
import Preview from '../components/Preview'
import Edit from '../components/Edit'
import { FaFileDownload, FaHistory, FaBackward } from "react-icons/fa";
import { Link, useParams } from 'react-router-dom';
import { downloadResumeAPI, getResumeAPI } from '../services/allAPI';
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

function ViewResume() {

  const [resumeDetails, setResumeDetails] = useState({})
  const previewRef = useRef()
  const { id } = useParams()

  useEffect(() => {
    getResume()
  }, [id])

  const getResume = async () => {
    try {
      const res = await getResumeAPI(id)
      console.log(res)
      if (res.status === 200) {
        setResumeDetails(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const downloadResume = async () => {
    try {
      const canvas = await html2canvas(previewRef.current, { scale: 2, useCORS: true })
      const imgData = canvas.toDataURL('image/png')

      canvas.toBlob(async (blob) => {
        try {
          // upload the image to Cloudinary (used for the history page)
          const formData = new FormData()
          formData.append("file", blob)
          formData.append("upload_preset", "my_900")

          const response = await fetch(
            "https://api.cloudinary.com/v1_1/didqtzgqz/image/upload",
            { method: "POST", body: formData }
          )
          const res = await response.json()
          console.log(res)

          generatePDF(imgData, res.secure_url)
        } catch (error) {
          console.log(error)
          alert("Upload failed")
        }
      })
    } catch (error) {
      console.log(error)
      alert("Could not create the image")
    }
  }

  const generatePDF = async (imgData, imageUrl) => {
    const today = new Date()
    const timestamp = `${today.toLocaleDateString()} ${today.toLocaleTimeString()}`

    // build the PDF from the canvas image (keeps proportions)
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pageWidth = pdf.internal.pageSize.getWidth()
    const props = pdf.getImageProperties(imgData)
    const imgHeight = (props.height * pageWidth) / props.width
    pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, imgHeight)

    // save the download in history
    const downloadDetails = { resumeId: id, resumeImg: imageUrl, timestamp }
    const result = await downloadResumeAPI(downloadDetails)
    console.log(result)

    if (result.status === 201) {
      pdf.save(`${resumeDetails.name || 'resume'}-resume.pdf`)
    }
  }

  return (
    <div className='d-flex align-items-center justify-content-center flex-column m-5'>
      <div className='d-flex align-items-center justify-content-center'>
        <button onClick={downloadResume} className='btn fs-1 text-danger mx-3'>
          <FaFileDownload />
        </button>

        <div className='mx-3'>
          <Edit resumeData={resumeDetails} setResumeData={setResumeDetails} />
        </div>

        <Link to={'/history'} className='btn fs-1 text-success mx-3'>
          <FaHistory />
        </Link>

        <Link to={'/Userform'} className='btn fs-1 text-primary mx-3'>
          <FaBackward />
        </Link>
      </div>

      <div ref={previewRef} className='my-5'>
        <Preview resumeData={resumeDetails} />
      </div>
    </div>
  )
}

export default ViewResume