 https://jiyean99.github.io/react_weather_app/
## 리액트 날씨 웹앱 프로젝트

- Weather API를 통해 도시명에 따른 온도와 날씨 상태 데이터 받아오기
 ```const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`; ```
- 각 데이터의 타입 설정
  도시 이름 / 온도 / 날씨 상태 (e.g., Clear, Rain)
- 의존성 설치
  Axios / Styled-components

### App 컴포넌트(루트컴포넌트) 구성요소
- Input : 도시명 입력 컴포넌트
- Button : 현재 위치의 날씨를 받아오는 버튼 컴포넌트
- WeatherCard / City / Temperature / Sky : 날씨 정보를 보여주는 카드 형태의 컴포넌트
- RadioGroup : 스타일의 테마를 지정하는 라디오 버튼 컴포넌트
