# [아루] WEB 프론트엔드 개발자 (Lv1) 과제 전형

## 프로젝트 구조

1. **Blog (프론트엔드)**
   - MVVM (Model-View-ViewModel) 패턴을 사용하여 구현
   - 주요 컴포넌트:
     - config : api 통신부
     - Model: 데이터와 비즈니스 로직
     - View: 사용자 인터페이스 (`src/view/postList.js`, `src/view/postContentView.js`)
     - ViewModel: View와 Model 사이의 중재 역할

2. **arooBE (백엔드)**
   - MVC (Model-View-Controller) 패턴을 사용하여 간략히 구현
   - 엔드 포인트가 작동하지 않음에 편의상 구현했습니다.

## Blog 프로젝트 상세

### 요구사항 구현율
- **100% 구현 완료**

#### 구현 내용:
1. API 서버에서 콘텐츠 목록 불러오기 및 표시 (`src/view/postList.js`)
   - 목록 아이템: 콘텐츠 타이틀, 좋아요 버튼, 좋아요 수
2. 상세 페이지 이동 기능 (`src/view/postContentView.js`)
   - 상세 페이지: 콘텐츠 타이틀, 본문, 좋아요 버튼, 좋아요 수
3. 좋아요 버튼 기능
   - API를 통한 서버 업데이트
   - 좋아요 수 증가 기능
4. 상세 페이지와 목록 페이지 간 좋아요 수 동기화

### 우대사항 구현도
- **33% 구현**
  - [x] 비즈니스 로직 추상화 처리
  - [ ] 콘텐츠 목록의 무한 스크롤
  - [ ] 비즈니스 로직 테스트

## URL 링크 및 기능

| URL | 기능 설명 |
|-----|----------|
| `http://localhost:3000` | 목록 페이지: 아이템 목록 표시 및 좋아요 기능 |
| `http://localhost:3000/:{id}` | 상세 페이지: 개별 아이템 상세 정보 및 좋아요 기능 |

## 실행 방법

### Frontend
- Blog 폴더 내부에 들어와 아래 명령어 입력 부탁드립니다

```
npm install
npm start
```

### Backend
- MySql 연동 후, run 해주시길 바라겠습니다.

- MySQL 설정
  ```
     create database arooo;
     use arooo;
     create user tree identified by 'tree123';
     GRANT ALL PRIVILEGES ON `arooo`.* TO `tree`@`%`;
  ```


## 기술 스택

- FE : React.js
- BE : MySQL, SpringBoot

## 향후 개선 사항

- 무한 스크롤 기능 구현
- 비즈니스 로직에 대한 단위 테스트 작성
