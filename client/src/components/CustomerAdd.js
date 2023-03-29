import React from "react";
import axios from 'axios';
//import { response } from "express";

class CustomerAdd extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            files: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: ''
        }
    }

    handleFromSubmit = (e) => {
        e.preventDefault()
        this.addCustomer()
            .then((response) => {
                console.log(response.data)
            })
        this.setState({
            files: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: ''
        })
        window.location.reload()
    }

    // 파일값이 변경 함수
    handleFileChange = (e) => {
        console.log(e.target.files)
        console.log(e.target.value)
        if(e.target.files && e.target.files.length > 0) {
            this.setState({
                files : e.target.files[0],
                fileName : e.target.value
            })
        } else {
            console.log('file 없음')
        }
    }

    handleValueChange = (e) => {
        let nextState = {}
        nextState[e.target.name] = e.target.value
        this.setState(nextState)
    }

    addCustomer() {
        const url = 'http://localhost:5000/api/customer' 
        const formData = new FormData()

        console.log(formData)

        formData.append('image', this.state.files)
        formData.append('name', this.state.userName)
        formData.append('birthday', this.state.birthday)
        formData.append('gender', this.state.gender)
        formData.append('job', this.state.job)
        
        // 'multipart/form-data' 는 전달하고자 하는 데이터에 파일이 있을때 추가 해줘야 하는 요소
        // 'multipart/form-data' 는 모든 문자를 인코딩 하지 않음을 명시함
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
       return axios.post(url, formData, config)
    }

    render() {
        return(
            <form onSubmit={this.handleFromSubmit}>
                <h1>고객 추가</h1>
                프로필 이미지 : <input type="file" name="file" files={this.state.files} value={this.state.fileName} onChange={this.handleFileChange} /> <br/>
                이름 : <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} /> <br/>
                생년월일 : <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange} /> <br/>
                성별 : <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange} />  <br/>
                직업 : <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange} />
                <button type="submit">저장</button>
            </form>
        )
    }
}

export default CustomerAdd;