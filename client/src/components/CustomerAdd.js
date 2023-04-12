import React from "react";
import axios from 'axios';
import '../App.css';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Modal, TextField } from '@mui/material';
import { withStyles } from '@mui/styles';
import { ClassNames } from "@emotion/react";

//import { response } from "express";

const styles = theme => ({
    hidden: {
        display: 'none'
    }
})

class CustomerAdd extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            files: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false
        }
    }

    handleFromSubmit = (e) => {
        e.preventDefault()
        this.addCustomer()
            .then((response) => {
                console.log(response.data)
                this.props.stateRefresh()
            })
        this.setState({
            files: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: ''
        })
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
        const url = 'http://localhost:5000/api/customers' 
        const formData = new FormData()

        console.log(formData)

        formData.append('image', this.state.files)
        formData.append('name', this.state.userName)
        formData.append('birthday', this.state.birthday)
        formData.append('gender', this.state.gender)
        formData.append('job', this.state.job)
        
        // 'multipart/form-data' 는 전달하고자 하는 데이터에 파일이 있을때  추가 해줘야 하는 요소
        // 'multipart/form-data' 는 모든 문자를 인코딩 하지 않음을 명시함
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
       return axios.post(url, formData, config)
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        })
    }

    handleClickClose = () => {
        this.setState({
            files: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false
        })
    }

    render() {
        const { classes } = this.props
        return(
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    고객 추가하기
                </Button>
                <Dialog open={this.state.open} onClose={this.state.handleClickClose}>
                    <DialogTitle>고객 추가</DialogTitle>
                    <DialogContent>
                        <input className={classes.hidden} type="file" accept="image/*" id="raised-button-file" files={this.state.files} value={this.state.fileName} onChange={this.handleFileChange} />
                        <label htmlFor="raised-button-file">
                            <Button className="modalbtn" variant="contained" color="primary" component="span" name="file">
                                {this.state.fileName == "" ? "프로필 이미지 선택" : this.state.fileName}
                            </Button>    
                        </label><br/>
                        <TextField margin="dense" variant="standard" label="이름" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} /> <br/>
                        <TextField margin="dense" variant="standard" label="생년월일" type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange} /> <br/>
                        <TextField margin="dense" variant="standard" label="성별" type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange} />  <br/>
                        <TextField margin="dense" variant="standard" label="직업" type="text" name="job" value={this.state.job} onChange={this.handleValueChange} />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFromSubmit}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClickClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
            /*
            <form onSubmit={this.handleFromSubmit}>
                <h1>고객 추가</h1>
                프로필 이미지 : <input type="file" name="file" files={this.state.files} value={this.state.fileName} onChange={this.handleFileChange} /> <br/>
                이름 : <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} /> <br/>
                생년월일 : <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange} /> <br/>
                성별 : <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange} />  <br/>
                직업 : <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange} />
                <button className="btn" type="submit">저장</button>
            </form>
            */
        )
    }
}

export default withStyles(styles)(CustomerAdd);