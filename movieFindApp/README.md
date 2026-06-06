# CineFinder

React + Vite 기반 영화 탐색 웹 애플리케이션입니다. 사용자는 인기 영화를 확인하고, 제목으로 검색하고, 장르별로 필터링하며, 관심 영화를 LocalStorage 즐겨찾기에 저장할 수 있습니다.

## 주요 기능

- 인기 영화 목록 조회
- 영화 제목 검색
- 영화 상세 페이지: 포스터, 줄거리, 개봉일, 평점, 장르, 러닝타임
- 즐겨찾기 추가/삭제 및 목록 페이지
- 장르 필터: 액션, 코미디, SF, 애니메이션
- 다크/라이트 모드
- 반응형 UI
- TMDB API 오류 또는 API 키 누락 시 샘플 데이터 fallback

## 기술 스택

- React
- Vite
- React Router
- Axios
- React Icons
- Context API
- LocalStorage

## 폴더 구조

```txt
src
├─ api
│  └─ tmdb.js
├─ components
│  ├─ Header
│  ├─ SearchBar
│  ├─ MovieCard
│  ├─ MovieList
│  ├─ GenreFilter
│  └─ Loading
├─ context
│  └─ ThemeContext.jsx
├─ hooks
│  ├─ useFavorites.js
│  └─ useMovies.js
├─ pages
│  ├─ Home
│  ├─ MovieDetail
│  └─ Favorites
├─ router
│  └─ Router.jsx
└─ utils
```

## API 명세

TMDB API를 사용합니다.

- `GET /movie/popular`: 인기 영화 조회
- `GET /search/movie`: 영화 검색
- `GET /movie/{movie_id}`: 상세 정보 조회
- `GET /movie/{movie_id}/videos`: 트레일러 조회
- `GET /discover/movie`: 장르별 영화 조회

API 키가 없으면 `src/utils/sampleMovies.js`의 샘플 데이터로 실행됩니다.

## 실행 방법

```bash
npm install
npm run dev
```

TMDB API를 사용하려면 프로젝트 루트에 `.env`를 만들고 다음 값을 입력합니다.

```env
VITE_TMDB_API_KEY=본인_TMDB_API_KEY
```

## 트러블 슈팅

- API 키가 없을 때: 샘플 데이터로 자동 전환하여 화면이 비지 않도록 처리했습니다.
- API 요청 실패: `tmdb.js`의 `withFallback`에서 오류를 잡고 fallback 데이터를 반환합니다.
- LocalStorage 중복 저장: `useFavorites`에서 같은 `id`가 이미 있으면 추가하지 않습니다.
- 검색 결과 없음: 빈 목록 메시지를 표시해 사용자에게 현재 상태를 안내합니다.

