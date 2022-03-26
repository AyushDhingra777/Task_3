import React, { useEffect, useState } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import validator from 'validator';
import InputBox from './InputBox';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';


function App() {

  const [allData, setAllData] = useState({
    name: { value: '', title: 'Name', isValidated: false, errorMessage: 'Minimum length should be 4 characters' },
    mail: { value: '', title: 'Email', isValidated: false, errorMessage: 'Enter a valid mail' },
    password: { value: '', title: 'Password', isValidated: false, errorMessage: 'Pass should have minimum 12 char, 2 special char ,2 numbers and 2 Uppercase cletters. ' },
    address: { value: '', title: 'Address', isValidated: false, errorMessage: 'Minimum length should be 16 characters' },
    zipCode: { value: '', title: 'Zip Code', isValidated: false, errorMessage: 'Minimum length should be 6 characters' },
    dob: { value: '', title: 'Date Of Birth', isValidated: false, errorMessage: 'Age should be 1+' },
  })
  const [allValidated, setAllValidated] = useState(false)
  const [startDate, setStartDate] = useState(new Date());

  const changeName = (val) => {
    if (val.length <= 28) {
      if (/^[a-zA-Z0-9]+$/.test(val[val.length - 1])
        || !isNaN(val[val.length - 1])
        || val[val.length - 1] === '.'
        || val[val.length - 1] === ','
        || val[val.length - 1] === '-'
        || val[val.length - 1] === ' ') {
        if (val.length >= 4) { setAllData({ ...allData, name: { ...allData.name, isValidated: true, value: val } }) }
        else {
          setAllData({ ...allData, name: { ...allData.name, isValidated: false, value: val } })
        }
      }
    }
  }
  const changeMail = (val) => {
    if (validator.isEmail(val)) {
      setAllData({ ...allData, mail: { ...allData.mail, isValidated: true, value: val } })
    }
    else {
      setAllData({ ...allData, mail: { ...allData.mail, isValidated: false, value: val } })
    }
  }
  const changePassword = (val) => {

    if (val.length <= 28) {
      if (validator.isStrongPassword(val, { minLength: 12, minLowercase: 0, minUppercase: 2, minNumbers: 2, minSymbols: 2 })) {
        setAllData({ ...allData, password: { ...allData.password, isValidated: true, value: val } })
      }
      else {
        setAllData({ ...allData, password: { ...allData.password, isValidated: false, value: val } })

      }
    }
  }
  const changeAddress = (val) => {

    if (val.length <= 512) {
      if (/^[a-zA-Z0-9]+$/.test(val[val.length - 1])
        || !isNaN(val[val.length - 1])
        || val[val.length - 1] === '#'
        || val[val.length - 1] === ','
        || val[val.length - 1] === '-'
        || val[val.length - 1] === ':'
        || val[val.length - 1] === ' ') {
        if (val.length >= 16) { setAllData({ ...allData, address: { ...allData.address, isValidated: true, value: val } }) }
        else {
          setAllData({ ...allData, address: { ...allData.address, isValidated: false, value: val } })
        }
      }
    }
  }
  const changeZip = (val) => {

    if (val.length <= 10) {
      if (
        !isNaN(val[val.length - 1])
        || val[val.length - 1] === '-'
        || val[val.length - 1] === ' '
        || val === '') {
        if (val.length >= 6) { setAllData({ ...allData, zipCode: { ...allData.zipCode, isValidated: true, value: val } }) }
        else {
          setAllData({ ...allData, zipCode: { ...allData.zipCode, isValidated: false, value: val } })
        }
      }
    }

  }

  const changeDob = (val) => {
    setStartDate(val)
    const currentYear = new Date().getFullYear()
    const selectedYear = val.getFullYear()

    const currentMonth = new Date().getMonth()
    const selectedMonth = val.getMonth()

    const currentDate = new Date().getDate()
    const selectedDate = val.getDate()

    if (currentYear - selectedYear > 1) {
      const temp = moment(val).format('MMMM Do YYYY')
      setAllData({ ...allData, dob: { ...allData.dob, isValidated: true, value: temp.toString() } })

    }
    else if (currentYear - selectedYear === 1) {
      if (selectedMonth < currentMonth) {
        const temp = moment(val).format('MMMM Do YYYY')
        setAllData({ ...allData, dob: { ...allData.dob, isValidated: true, value: temp.toString() } })
        console.log('validated');
      }
      else if (selectedMonth === currentMonth) {
        if (selectedDate <= currentDate) {
          const temp = moment(val).format('MMMM Do YYYY')
          setAllData({ ...allData, dob: { ...allData.dob, isValidated: true, value: temp.toString() } })

        }
        else {
          const temp = moment(val).format('MMMM Do YYYY')
          setAllData({ ...allData, dob: { ...allData.dob, isValidated: false, value: temp.toString() } })

        }
      }
      else {
        const temp = moment(val).format('MMMM Do YYYY')
        setAllData({ ...allData, dob: { ...allData.dob, isValidated: false, value: temp.toString() } })

      }
    }
    else {
      const temp = moment(val).format('MMMM Do YYYY')
      setAllData({ ...allData, dob: { ...allData.dob, isValidated: false, value: temp.toString() } })


    }
  }
  useEffect(() => {
    let temp = true
    for (var key in allData) {
      if (allData.hasOwnProperty(key)) {
        if (allData[key].isValidated === false) {
          temp = false
        }
      }
    }
    setAllValidated(temp)
  }, [allData])

  const CustomInput = React.forwardRef((props, ref) => {
    return (
      <div onClick={props.onClick} ref={ref}>
        <InputBox warningText={allData.dob.errorMessage} isValidated={!allData.dob.isValidated} disable title={allData.dob.title} value={allData.dob.value} onChangeText={changeDob} />
      </div>
    )
  })

  return (
    <div className="mainContainer ">
      <div className='w-25  leftNameContainer '>
        <div className='display-6 mb-4' >NLTS</div>
        <div className='font-weight-light mb-3'  >We've built an ecosystem of print and digital advertising to connect the businesses with the world.</div>
      </div>
      <div className='w-75  rightDataContainer' >
        <div className='display-1 fw-bold mb-4' >NLTS</div>
        <InputBox warningText={allData.name.errorMessage} isValidated={!allData.name.isValidated} title={allData.name.title} value={allData.name.value} onChangeText={changeName} />
        <InputBox warningText={allData.mail.errorMessage} isValidated={!allData.mail.isValidated} title={allData.mail.title} value={allData.mail.value} onChangeText={changeMail} />
        <InputBox warningText={allData.password.errorMessage} isValidated={!allData.password.isValidated} type='password' title={allData.password.title} value={allData.password.value} onChangeText={changePassword} />
        <InputBox warningText={allData.address.errorMessage} isValidated={!allData.address.isValidated} title={allData.address.title} value={allData.address.value} onChangeText={changeAddress} isTextArea />
        <InputBox warningText={allData.zipCode.errorMessage} isValidated={!allData.zipCode.isValidated} title={allData.zipCode.title} value={allData.zipCode.value} onChangeText={changeZip} />
        <DatePicker
          selected={startDate}
          onChange={changeDob}
          customInput={<CustomInput />}
          placeholderText="openDate"
        />


        <button disabled={!allValidated} type="button" className=" mt-2 btn btn-primary">Submit</button>
      </div >
    </div >
  );
}

export default App;
