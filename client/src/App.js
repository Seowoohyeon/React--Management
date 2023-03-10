import React, { Component } from 'react';
import Customer from "./components/Customer"
import './App.css';
import { render } from '@testing-library/react';
import { Paper } from '@mui/material';
import { Table } from '@mui/material';
import { TableHead } from '@mui/material';
import { TableBody } from '@mui/material';
import { TableRow } from '@mui/material';
import { TableCell } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { withStyles } from '@mui/styles';
import { makeStyles } from '@mui/styles';

const styles = theme =>({
  root: {
    width : '100%',
    marginTop: '50px',
    overflowX: "auto"
  },
  table:{
    minWidth:1080
  },
  process: {
    marginTop: '50px'
  }
})

/**
 * React 라이브러리가 처음 컴포넌트 실행 순서
 * 
 * 1) construtor()
 * 2) componentWillMount()
 * 3) render()
 * 4) componentDidMount()
 * 
 * # component의 props || state가 변경 되는 경우 => shouldComponentUpdate() 등이 사용됨
 */

class App extends Component {

  state = {
    customers: "",
    completed: 0
  }

  componentDidMount() {
    this.timer = setInterval(this.process, 20)
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err))
  }

  callApi = async () => {
    const response = await fetch('/api/customers')
    const body = await response.json()
    return body
  }

  process = () => {
    const { completed } = this.state
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 })
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              // map 함수를 이용하여 특정한 배열에 접근하여 배열의 각 원소들을 어떻게 처리할지 정할 수 있음.
              this.state.customers ? this.state.customers.map(i => {
                return (
                  <Customer
                    // map 을 이용하여 하나의 원소의 다수의 정보를 출력할 때는 key=? 를 지정해 줘야 오류가 안남
                    key={i.id}
                    id={i.id}
                    image={i.image}
                    name={i.name}
                    birthday={i.birthday}
                    gender={i.gender}
                    job={i.job}
                  />
                )
              }) :
              <TableRow>
                <TableCell colSpan="6" align='center'>
                  <CircularProgress className={classes.process} variant="determinate" value={this.state.completed}/>
                </TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </Paper>
    )
  };
}

export default withStyles(styles)(App);
