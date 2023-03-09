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
  }
})


const customers = [{
  'id': 1,
  'image': 'https://placeimg.com/64/64/1',
  'name': '서우현',
  'birthday': '971012',
  'gender': '남자',
  'job': '개발자'
},
{
  'id': 2,
  'image': 'https://placeimg.com/64/64/2',
  'name': '김범수',
  'birthday': '970000',
  'gender': '남자',
  'job': 'Node'
},
{
  'id': 3,
  'image': 'https://placeimg.com/64/64/3',
  'name': '김보람',
  'birthday': '970000',
  'gender': '남자',
  'job': '학원생'
}]

class App extends Component {
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
              customers.map(i => {
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
              })
            }
          </TableBody>
        </Table>
      </Paper>
    )
  };
}

export default withStyles(styles)(App);
