import React, { useState, useEffect } from 'react'
import { Select, MenuItem} from '@mui/material';
import axios from 'axios';
import './Query1.css'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Label
  } from "recharts";

const Query4Business = () => {
    const[crimeTypeList, setCrimeTypeList] = useState()
    const[surroundingsList, setSurroundingsList] = useState()
    const[latitude, setLatitude] = useState()
    const[longitude, setLongitude] = useState()
    const[surroundings, setSurroundings] = useState()
    const[crimeType1, setCrimeType1] = useState()
    const[crimeType2, setCrimeType2] = useState()
    const[val, setValue] = useState()
    const [showGraph, setShowGraph] = useState(false)

    const crimeType1Handler = (event) =>{
        setCrimeType1(event.target.value)
    }
  
    const crimeType2Handler = (event) =>{
        setCrimeType2(event.target.value)
    }

    const surroundingsHandler = (event) =>{
        setSurroundings(event.target.value)
    }


    useEffect (() => {
    axios.get(`http://localhost:8080/crimetypes`).then((response)=>{
        setCrimeTypeList(response.data)
    })
    }, [])

    useEffect (() => {
        axios.get(`http://localhost:8080/surroundings`).then((response)=>{
            setSurroundingsList(response.data)
        })
    }, [])



    const createGraph = () => {
        axios.post(`http://localhost:8080/query4`, {
          latitude: "41.7",
          longitude: "-87.7",
          business: surroundings,
          crimeType1: crimeType1,
          crimeType2: crimeType2
        }).then((response)=>{
          setValue(response.data)
          setShowGraph(true)
          
          console.log(val)
        })
    
    }

  return (
    <div className='timeDisplay'>
    <h3 className='title'>Select 2 Crime Type</h3>
      {console.log(crimeTypeList)}
      <Select variant="outlined" onChange={crimeType1Handler}  style={{ marginTop: 0, marginLeft: 0, width: 220, height: 35 , borderBlockColor:"blue", color:"black"}}>
              <MenuItem value={-1}>Select Crime Type...</MenuItem>
              {crimeTypeList && crimeTypeList.map((crime)=> {
                return <MenuItem value={crime}>{crime}</MenuItem>
              })}
      </Select>
      <p></p>
      <Select variant="outlined" onChange={crimeType2Handler}  style={{ marginTop: 0, marginLeft: 0, width: 220, height: 35 , borderBlockColor:"blue", color:"black"}}>
              <MenuItem value={-1}>Select Crime Type...</MenuItem>
              {crimeTypeList && crimeTypeList.map((crime)=> {
                return <MenuItem value={crime}>{crime}</MenuItem>
              })}
      </Select>
      <h3 className='title'>Select Surroundings</h3>
      <Select variant="outlined" onChange={surroundingsHandler}  style={{ marginTop: 0, marginLeft: 0, width: 220, height: 35 , borderBlockColor:"blue", color:"black"}}>
              <MenuItem value={-1}>Select Surroundings...</MenuItem>
              {surroundingsList && surroundingsList .map((item)=> {
                return <MenuItem value={item}>{item}</MenuItem>
              })}
      </Select>

      <button onClick={createGraph}>Create Graph</button>

      {showGraph ? 
      (<div> {console.log(val.Data1)}

      <LineChart width={800} height={500}>
         
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type='number' dataKey={"Year"} domain={['auto','auto']}> 
          <Label value="Years" offset={-5} position="insideBottom"/>
        </XAxis>
        <YAxis dataKey= "CountYear" domain={[0, 100]} >
          <Label value="Count of Crime Type" angle={-90} position="insideLeft"/>
        </YAxis>
        <Tooltip />
        <Legend  verticalAlign='top' height={40} />
    
        <Line data = {val.Data1} name={`${crimeType1} crime rates in ${surroundings}`} type="monotone" dataKey="CountYear" stroke="#82ca9d" activeDot={{ r: 8 }}/> 
        <Line data = {val.Data2} name={`${crimeType2} crime rates in ${surroundings}`} type="monotone" dataKey="CountYear" stroke="black" activeDot={{ r: 8 }}/> 
      </LineChart>
      
      </div>
      ):
      (<div></div>)
  }



    </div>
  )
}

export default Query4Business