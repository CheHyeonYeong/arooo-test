import { Post } from "../model/postModel";

let backendHost;

const hostname = window && window.location && window.location.hostname;

if(hostname === "localhost") {
  backendHost = "http://localhost:8080";
}
else{
  backendHost = "https://api.a.com";
}

export const API_BASE_URL = `${backendHost}`;

// 기본 헤더 설정
let headers = new Headers({
  "Content-Type": "application/json",
});

export { headers };

// API 호출을 위한 함수
export function call(api, method, request) {
  // 기본 헤더 설정
  let headers = new Headers({
    "Content-Type": "application/json",
  });

  // API 요청 옵션 설정
  let options = {
    headers: headers,
    url: API_BASE_URL + api,
    method: method,
  };

  if (request) {
    // GET 메소드가 아닌 경우, 요청 본문을 JSON 문자열로 변환하여 추가
    options.body = JSON.stringify(request);
  }

  // fetch를 사용하여 API 호출
  return fetch(options.url, options)
    .then((response) =>
      response.json().then((json) => {
        if(response.status === 400){
          alert("다시 시도하시오")
          return json;
        }
        if (!response.ok) {
          // response.ok가 true이면 정상적인 응답, 아니면 에러 응답
          return Promise.reject(json);
        }
        return json;
      })
    )
    .catch((error) => {
      // 에러 처리
      if (error.status === 403) {
        // 403 에러(권한 없음)인 경우 로그인 페이지로 리디렉션
        window.location.href = "/login";
      }
      return Promise.reject(error);
    });
}

export async function getPosts() {
  try {
    const response = await call('/library/content', 'GET');
    return response.map(post => new Post(post.pid, post.title,post.content, post.likes));
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}

export async function getPost(pid) {
  try {
    const response = await call('/library/content/'+pid, 'GET');
    return new Post(response.pid, response.title, response.content, response.likes);
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}

export async function createPost(postData) {
  try {
    const response = await call('/api/posts', 'POST', postData);
    return new Post(response.pid, response.title, response.content, response.likes);
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}

export async function likesUpdate(post) {
  try {
    const response = await call('/library/content/'+post.pid+'/like', 'POST');
    return new Post(post.pid, post.title, post.content, response.likes);
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}