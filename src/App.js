import React, { Component } from 'react';
import Customer from "./components/Customer"
import './App.css';
import { render } from '@testing-library/react';

const customers = [{
  'id' : 1,
  'image' : 'https://placeimg.com/64/64/1',
  'name' : '서우현',
  'birthday' : '971012',
  'gender' : '남자',
  'job' : '개발자'
},
{
  'id' : 2,
  'image' : 'https://placeimg.com/64/64/2',
  'name' : '김범수',
  'birthday' : '970000',
  'gender' : '남자',
  'job' : 'Node'
},
{
  'id' : 3,
  'image' : 'https://placeimg.com/64/64/3',
  'name' : '김보람',
  'birthday' : '970000',
  'gender' : '남자',
  'job' : '학원생'
}]

class App extends Component {
  render(){
    return (
      <div>
        {
          // map 함수를 이용하여 특정한 배열에 접근하여 배열의 각 원소들을 어떻게 처리할지 정할 수 있음.
          customers.map(i => {
            return(
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
      </div>
    )
  };
}

export default App;
