 https://jiyean99.github.io/react_weather_app/
# 리액트 날씨 웹앱 프로젝트
---
# 📂 주요 기능
- 실시간 날씨 시각화
- 슬라이더 기반 UI
- 인터랙티브 차트 뷰

- Weather API를 통해 도시명에 따른 온도와 날씨 상태 데이터 받아오기
 ```const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`; ```
- 각 데이터의 타입 설정
  도시 이름 / 온도 / 날씨 상태 (e.g., Clear, Rain)

### App 컴포넌트(루트컴포넌트) 구성요소
- Input : 도시명 입력 컴포넌트
- Button : 현재 위치의 날씨를 받아오는 버튼 컴포넌트
- WeatherCard / City / Temperature / Sky : 날씨 정보를 보여주는 카드 형태의 컴포넌트
- RadioGroup : 스타일의 테마를 지정하는 라디오 버튼 컴포넌트

# 📂 의존성 설치
## 차트 & 시각화
- chart.js : 다양한 유형의 차트를 그릴 수 있는 JavaScript 기반 차트 라이브러리입니다.
  ```npm install chart.js```
- react-chartjs-2 : Chart.js를 React 컴포넌트 형태로 사용할 수 있도록 도와주는 wrapper입니다.
  ```npm install react-chartjs-2```
## UI 컴포넌트 및 아이콘
- @radix-ui/react-icons : Radix UI에서 제공하는 React 기반 아이콘 세트입니다.
  ```npm install @radix-ui/react-icons```
- swiper : 터치 슬라이더 구현을 위한 모던 라이브러리입니다.
  ```npm install swiper```
- styled-components :CSS-in-JS 방식으로 컴포넌트 스타일링을 작성할 수 있게 해주는 라이브러리입니다.
  ```npm install styled-components```
  ```npm install --save-dev @types/styled-components```
## 통신
- axios : HTTP 통신을 위한 Promise 기반 클라이언트
  ```npm install axios```
