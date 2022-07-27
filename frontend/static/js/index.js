import Dashboard from "./views/Dashboard.js";
import Prac01 from "./views/Prac01.js";
import Prac02 from "./views/Prac02.js";

console.log("JS is loaded");

const navigateTo = url => {
    history.pushState(null, null, url); // state: 페이지 전환시 넘겨줄 데이터가 없으면 null, title: 변경할 브라우저의 title, url 변경할 url
    router();
}


const router =  async(s) => {
    const routes = [
        { path: "/", view: Dashboard},
        { path: "/prac01", view: Prac01},
        { path: "/prac02", view: Prac02},
    ];

    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        };
    });


    let match = potentialMatches.find(potentialMatches => potentialMatches.isMatch); // true false 인지 가져오는 것 (결과 확인)

    if (!match) {
        match = {
            route: routes[0],
            isMatch: true
    };
}

const view = new match.route.view();

document.querySelector("#app").innerHTML = await view.getHtml();

    };

window.addEventListener("popstate", router); // 뒤로 가기 실행될 때도 페이지가 랜더링될 수 있도록

// 콘텐츠가 로드 될 때 마다 확인
document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    })
    router();
});
