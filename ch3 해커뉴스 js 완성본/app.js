/*
hacker news api 사용(사용 신청도 필요 없어 간단)
- 해커 뉴스 사이트: https://hnpwa.com/
- API 문서: https://github.com/tastejs/hacker-news-pwas/blob/master/docs/api.md
*/
const container = document.getElementById('root');
const content = document.createElement('div');
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';

// ajax 부분 : XMLHttpRequest. 학습 위해 fetch()와 비동기 사용 안함.
const ajax = new XMLHttpRequest();

const store = {
  currentPage: 1,
  feeds: []
};



// 글 내용 구성 & 출력 - hashchange 핸들러
window.addEventListener('hashchange', router);
router();


function getData(url) {
  ajax.open('GET', url, false); // 동기 방식: 학습용
  ajax.send();
  
  // 문자열 파싱 부분: 내장 객체 사용해 문자열 배열 형태로 변경
  // newsFeed에 무슨 프로퍼티 있는지는 위 API 문서 링크 참고할 것
  return JSON.parse(ajax.response)
}

// 읽은 글 표시하기 위한 프로퍼티 추가
function makeFeeds(feeds) {
  feeds.forEach(feed => {
    feed.read = false;
  });
  return feeds;
}

// 글 목록 구성 부분
function newsFeed() {
  let newsFeed = null;
  if (store.feeds.length === 0)
    newsFeed = store.feeds = makeFeeds(getData(NEWS_URL));
  else
    newsFeed = store.feeds;
  // !! 문자열 구성시 자주 사용하는 테크닉 중 하나: 배열에 무자열 쌓아놓고 나중에 join('')으로 합쳐서 리턴
  const newsList = [];
  
  let template = `
    <div class="bg-gray-600 min-h-screen">
      <div class="bg-white text-xl">
        <div class="mx-auto px-4">
          <div class="flex justify-between items-center py-6">
            <div class="flex justify-start">
              <h1 class="font-extrabold">Hacker News</h1>
            </div>
            <div class="items-center justify-end">
              <a href="#/page/{{__prev_page__}}" class="text-gray-500">
                Previous
              </a>
              <a href="#/page/{{__next_page__}}" class="text-gray-500 ml-4">
                Next
              </a>
            </div>
          </div> 
        </div>
      </div>
      <div class="p-4 text-2xl text-gray-700">
        {{__news_feed__}}        
      </div>
    </div>
  `;

  for(let i = (store.currentPage-1)*10; i < store.currentPage*10; i++) {
    newsList.push( `
      <div class="p-6 ${newsFeed[i].read ? 'bg-gray-500' : 'bg-white'} mt-6 rounded-lg shadow-md transition-colors duration-500 hover:bg-green-100">
        <div class="flex">
          <div class="flex-auto">
            <a href="#/show/${newsFeed[i].id}">${newsFeed[i].title}</a>  
          </div>
          <div class="text-center text-sm">
            <div class="w-10 text-white bg-green-300 rounded-lg px-0 py-2">${newsFeed[i].comments_count}</div>
          </div>
        </div>
        <div class="flex mt-3">
          <div class="grid grid-cols-3 text-sm text-gray-500">
            <div><i class="fas fa-user mr-1"></i>${newsFeed[i].user}</div>
            <div><i class="fas fa-heart mr-1"></i>${newsFeed[i].points}</div>
            <div><i class="far fa-clock mr-1"></i>${newsFeed[i].time_ago}</div>
          </div>  
        </div>
      </div>
    `);
  }

  template = template.replace('{{__news_feed__}}', newsList.join(''));
  template = template.replace('{{__prev_page__}}', store.currentPage > 1 ? store.currentPage -1 : 1 );
  template = template.replace('{{__next_page__}}', store.currentPage + 1 );

  container.innerHTML = template;
}

// 글 내용 구성 & 출력
function newsDetail() {
  const id = location.hash.substr(7); // # 짤라내고 hash 값 가져오기
  const newsContent = getData(CONTENT_URL.replace('@id', id));
  
  let template = `
    <div class="bg-gray-600 min-h-screen pb-8">
      <div class="bg-white text-xl">
        <div class="mx-auto px-4">
          <div class="flex justify-between items-center py-6">
            <div class="flex justify-start">
              <h1 class="font-extrabold">Hacker News</h1>
            </div>
            <div class="items-center justify-end">
              <a href="#/page/${store.currentPage}" class="text-gray-500">
                <i class="fa fa-times"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="h-full border rounded-xl bg-white m-6 p-4 ">
        <h2>${newsContent.title}</h2>
        <div class="text-gray-400 h-20">
          ${newsContent.content}
        </div>

        {{__comments__}}

      </div>
    </div>
  `;

  // 읽은 글 표시하기 위한 값 true로 변경
  const found = store.feeds.find(obj => obj.id === Number(id));
  if (found != undefined)
    found.read = true;

  function makeComment(comments, called = 0) {
    const commentString = [];

    for (let i = 0; i < comments.length; i++) {
      commentString.push(`
        <div style="padding-left: ${called * 40}px;" class="mt-4">
          <div class="text-gray-400">
            <i class="fa fa-sort-up mr-2"></i>
            <strong>${comments[i].user}</strong> ${comments[i].time_ago}
          </div>
          <p class="text-gray-700">${comments[i].content}</p>
        </div>
      `);

      if (comments[i].comments.length > 0) {
        commentString.push(makeComment(comments[i].comments, called + 1));
      }
    }

    return commentString.join('');
  }

  container.innerHTML = template.replace('{{__comments__}}', makeComment(newsContent.comments));
}

function router() {
  const routePath = location.hash; // hash에 #만 들어있으면 빈문자열 반환

  if (routePath === '') {
    newsFeed();
  } else if (routePath.indexOf('#/page/') >= 0) {
    store.currentPage = Number(routePath.substr(7));
    newsFeed();
  } else {
    newsDetail();
  }
}
