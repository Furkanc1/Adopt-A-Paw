export const vanillaJavaScriptValidation = (emailString) => {
    const validDomains = [`com`, `org`, `gov`, `edu`];
    let errorString = "Please enter a valid email!";
    // includes returns true/false
    let emailHasAtSymbol = emailString.includes(`@`);
    if (emailHasAtSymbol == true) {
        // split returns an array
        let emailWebsite = emailString.split(`@`)[1];
        let emailDomain = emailWebsite.split(`.`)[1];
        let emailHasValidDomain = validDomains.includes(emailDomain);
        // all of these have to be true for the email to be valid
        return emailString != `` && emailHasValidDomain == true ? true : errorString;
    } else {
        errorString = `Email Addresses Need to have the @ Symbol`;
        return errorString;
    }
};

export const getGithubData = async () => {
    let username = `plutocoders`;
    const repoURL = `https://api.github.com/users/${username}/repos`;
    const githubURL = `https://api.github.com/users/${username}`;
    const repositories = JSON.parse(localStorage.getItem(`repositories`)) || [];
    const responseRepos = await fetch(repoURL);
    const response = await fetch(githubURL);

    let projects = [];
  
    if (!response.ok || !responseRepos.ok) {
      console.log(`Fetch Error`);
      console.clear();
    } else {
      const github = await response.json();
      const githubRepos = await responseRepos.json();
      const { name, html_url, bio, blog, avatar_url, login, public_repos, repos_url, starred_url, followers, following } = github;
  
      githubRepos.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).map((repo) => {
        const { name, html_url, created_at, owner, topics, license, updated_at, deployments_url, language, homepage, description } = repo;
        const filteredRepo = { name, owner, url: html_url, topics, date: created_at, license, updated: updated_at, homepage, language, deployment: deployments_url, description };
        repositories.push(filteredRepo);
        // Make sure to return something inside the end of a .map
        return filteredRepo;
      });
  
      let rawGithubData = {
        github,
        githubRepos
      }
  
      const gitUser = { id: `1 Alex 10:40 PM 12-30-2023`, name, url: html_url, bio, projects: repositories.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()), website: blog, avatar: avatar_url, login, repoLink: repos_url, repoNum: public_repos, starred: starred_url, followers, following, lastSignin: new Date().getTime(), rawGithubData };
  
      console.log(`Gihub API Data`, gitUser);
      localStorage.setItem(`projects`, JSON.stringify(gitUser?.projects));
  
      projects = gitUser?.projects;
    };

    return projects;
}

export const cachedGitHubProjects = [
    {
        "name": "PortfolioHub",
        "owner": {
            "login": "PlutoCoders",
            "id": 139153742,
            "node_id": "U_kgDOCEtRTg",
            "avatar_url": "https://avatars.githubusercontent.com/u/139153742?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/PlutoCoders",
            "html_url": "https://github.com/PlutoCoders",
            "followers_url": "https://api.github.com/users/PlutoCoders/followers",
            "following_url": "https://api.github.com/users/PlutoCoders/following{/other_user}",
            "gists_url": "https://api.github.com/users/PlutoCoders/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/PlutoCoders/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/PlutoCoders/subscriptions",
            "organizations_url": "https://api.github.com/users/PlutoCoders/orgs",
            "repos_url": "https://api.github.com/users/PlutoCoders/repos",
            "events_url": "https://api.github.com/users/PlutoCoders/events{/privacy}",
            "received_events_url": "https://api.github.com/users/PlutoCoders/received_events",
            "type": "User",
            "site_admin": false
        },
        "url": "https://github.com/PlutoCoders/PortfolioHub",
        "topics": [
            "api",
            "javascript",
            "react"
        ],
        "date": "2023-12-28T00:18:04Z",
        "license": {
            "key": "mit",
            "name": "MIT License",
            "spdx_id": "MIT",
            "url": "https://api.github.com/licenses/mit",
            "node_id": "MDc6TGljZW5zZTEz"
        },
        "updated": "2023-12-31T04:38:34Z",
        "homepage": "",
        "language": "JavaScript",
        "deployment": "https://api.github.com/repos/PlutoCoders/PortfolioHub/deployments",
        "description": "Using React"
    },
    {
        "name": "week18SocialNetworkAPIwow",
        "owner": {
            "login": "PlutoCoders",
            "id": 139153742,
            "node_id": "U_kgDOCEtRTg",
            "avatar_url": "https://avatars.githubusercontent.com/u/139153742?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/PlutoCoders",
            "html_url": "https://github.com/PlutoCoders",
            "followers_url": "https://api.github.com/users/PlutoCoders/followers",
            "following_url": "https://api.github.com/users/PlutoCoders/following{/other_user}",
            "gists_url": "https://api.github.com/users/PlutoCoders/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/PlutoCoders/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/PlutoCoders/subscriptions",
            "organizations_url": "https://api.github.com/users/PlutoCoders/orgs",
            "repos_url": "https://api.github.com/users/PlutoCoders/repos",
            "events_url": "https://api.github.com/users/PlutoCoders/events{/privacy}",
            "received_events_url": "https://api.github.com/users/PlutoCoders/received_events",
            "type": "User",
            "site_admin": false
        },
        "url": "https://github.com/PlutoCoders/week18SocialNetworkAPIwow",
        "topics": [],
        "date": "2023-12-11T22:18:45Z",
        "license": null,
        "updated": "2023-12-11T22:18:45Z",
        "homepage": null,
        "language": null,
        "deployment": "https://api.github.com/repos/PlutoCoders/week18SocialNetworkAPIwow/deployments",
        "description": "NoSQL Challenge: Social Network API (express.js, mongoose, MongoDB, Insomnia)"
    },
    {
        "name": "week10SVGwow",
        "owner": {
            "login": "PlutoCoders",
            "id": 139153742,
            "node_id": "U_kgDOCEtRTg",
            "avatar_url": "https://avatars.githubusercontent.com/u/139153742?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/PlutoCoders",
            "html_url": "https://github.com/PlutoCoders",
            "followers_url": "https://api.github.com/users/PlutoCoders/followers",
            "following_url": "https://api.github.com/users/PlutoCoders/following{/other_user}",
            "gists_url": "https://api.github.com/users/PlutoCoders/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/PlutoCoders/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/PlutoCoders/subscriptions",
            "organizations_url": "https://api.github.com/users/PlutoCoders/orgs",
            "repos_url": "https://api.github.com/users/PlutoCoders/repos",
            "events_url": "https://api.github.com/users/PlutoCoders/events{/privacy}",
            "received_events_url": "https://api.github.com/users/PlutoCoders/received_events",
            "type": "User",
            "site_admin": false
        },
        "url": "https://github.com/PlutoCoders/week10SVGwow",
        "topics": [],
        "date": "2023-12-01T00:32:39Z",
        "license": null,
        "updated": "2023-12-01T01:51:01Z",
        "homepage": null,
        "language": "JavaScript",
        "deployment": "https://api.github.com/repos/PlutoCoders/week10SVGwow/deployments",
        "description": "Object-oriented Programming Challenge: SVG Logo Maker (node.js image generation)"
    },
    {
        "name": "week14MVCwow",
        "owner": {
            "login": "PlutoCoders",
            "id": 139153742,
            "node_id": "U_kgDOCEtRTg",
            "avatar_url": "https://avatars.githubusercontent.com/u/139153742?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/PlutoCoders",
            "html_url": "https://github.com/PlutoCoders",
            "followers_url": "https://api.github.com/users/PlutoCoders/followers",
            "following_url": "https://api.github.com/users/PlutoCoders/following{/other_user}",
            "gists_url": "https://api.github.com/users/PlutoCoders/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/PlutoCoders/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/PlutoCoders/subscriptions",
            "organizations_url": "https://api.github.com/users/PlutoCoders/orgs",
            "repos_url": "https://api.github.com/users/PlutoCoders/repos",
            "events_url": "https://api.github.com/users/PlutoCoders/events{/privacy}",
            "received_events_url": "https://api.github.com/users/PlutoCoders/received_events",
            "type": "User",
            "site_admin": false
        },
        "url": "https://github.com/PlutoCoders/week14MVCwow",
        "topics": [],
        "date": "2023-11-29T00:20:21Z",
        "license": null,
        "updated": "2023-11-29T00:32:06Z",
        "homepage": null,
        "language": "JavaScript",
        "deployment": "https://api.github.com/repos/PlutoCoders/week14MVCwow/deployments",
        "description": "Model-View-Controller (MVC) Challenge: Tech Blog"
    },
    {
        "name": "week13ORMwow",
        "owner": {
            "login": "PlutoCoders",
            "id": 139153742,
            "node_id": "U_kgDOCEtRTg",
            "avatar_url": "https://avatars.githubusercontent.com/u/139153742?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/PlutoCoders",
            "html_url": "https://github.com/PlutoCoders",
            "followers_url": "https://api.github.com/users/PlutoCoders/followers",
            "following_url": "https://api.github.com/users/PlutoCoders/following{/other_user}",
            "gists_url": "https://api.github.com/users/PlutoCoders/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/PlutoCoders/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/PlutoCoders/subscriptions",
            "organizations_url": "https://api.github.com/users/PlutoCoders/orgs",
            "repos_url": "https://api.github.com/users/PlutoCoders/repos",
            "events_url": "https://api.github.com/users/PlutoCoders/events{/privacy}",
            "received_events_url": "https://api.github.com/users/PlutoCoders/received_events",
            "type": "User",
            "site_admin": false
        },
        "url": "https://github.com/PlutoCoders/week13ORMwow",
        "topics": [],
        "date": "2023-11-29T00:05:49Z",
        "license": null,
        "updated": "2023-11-29T00:17:21Z",
        "homepage": null,
        "language": "JavaScript",
        "deployment": "https://api.github.com/repos/PlutoCoders/week13ORMwow/deployments",
        "description": "Object-Relational Mapping (ORM) Challenge: E-commerce Back End"
    },
    {
        "name": "week17RegexWOW",
        "owner": {
            "login": "PlutoCoders",
            "id": 139153742,
            "node_id": "U_kgDOCEtRTg",
            "avatar_url": "https://avatars.githubusercontent.com/u/139153742?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/PlutoCoders",
            "html_url": "https://github.com/PlutoCoders",
            "followers_url": "https://api.github.com/users/PlutoCoders/followers",
            "following_url": "https://api.github.com/users/PlutoCoders/following{/other_user}",
            "gists_url": "https://api.github.com/users/PlutoCoders/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/PlutoCoders/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/PlutoCoders/subscriptions",
            "organizations_url": "https://api.github.com/users/PlutoCoders/orgs",
            "repos_url": "https://api.github.com/users/PlutoCoders/repos",
            "events_url": "https://api.github.com/users/PlutoCoders/events{/privacy}",
            "received_events_url": "https://api.github.com/users/PlutoCoders/received_events",
            "type": "User",
            "site_admin": false
        },
        "url": "https://github.com/PlutoCoders/week17RegexWOW",
        "topics": [],
        "date": "2023-11-28T01:07:29Z",
        "license": null,
        "updated": "2023-11-28T01:07:30Z",
        "homepage": null,
        "language": null,
        "deployment": "https://api.github.com/repos/PlutoCoders/week17RegexWOW/deployments",
        "description": "Explaining how Regex for email works"
    },
    {
        "name": "week12EmployeeTrackerWOW",
        "owner": {
            "login": "PlutoCoders",
            "id": 139153742,
            "node_id": "U_kgDOCEtRTg",
            "avatar_url": "https://avatars.githubusercontent.com/u/139153742?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/PlutoCoders",
            "html_url": "https://github.com/PlutoCoders",
            "followers_url": "https://api.github.com/users/PlutoCoders/followers",
            "following_url": "https://api.github.com/users/PlutoCoders/following{/other_user}",
            "gists_url": "https://api.github.com/users/PlutoCoders/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/PlutoCoders/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/PlutoCoders/subscriptions",
            "organizations_url": "https://api.github.com/users/PlutoCoders/orgs",
            "repos_url": "https://api.github.com/users/PlutoCoders/repos",
            "events_url": "https://api.github.com/users/PlutoCoders/events{/privacy}",
            "received_events_url": "https://api.github.com/users/PlutoCoders/received_events",
            "type": "User",
            "site_admin": false
        },
        "url": "https://github.com/PlutoCoders/week12EmployeeTrackerWOW",
        "topics": [],
        "date": "2023-11-10T00:26:19Z",
        "license": {
            "key": "mit",
            "name": "MIT License",
            "spdx_id": "MIT",
            "url": "https://api.github.com/licenses/mit",
            "node_id": "MDc6TGljZW5zZTEz"
        },
        "updated": "2023-12-30T01:58:28Z",
        "homepage": null,
        "language": "JavaScript",
        "deployment": "https://api.github.com/repos/PlutoCoders/week12EmployeeTrackerWOW/deployments",
        "description": "Employee Tracker Assignment for week 12 bootcamp!"
    },
    {
        "name": "week11noteTakerWOW",
        "owner": {
            "login": "PlutoCoders",
            "id": 139153742,
            "node_id": "U_kgDOCEtRTg",
            "avatar_url": "https://avatars.githubusercontent.com/u/139153742?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/PlutoCoders",
            "html_url": "https://github.com/PlutoCoders",
            "followers_url": "https://api.github.com/users/PlutoCoders/followers",
            "following_url": "https://api.github.com/users/PlutoCoders/following{/other_user}",
            "gists_url": "https://api.github.com/users/PlutoCoders/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/PlutoCoders/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/PlutoCoders/subscriptions",
            "organizations_url": "https://api.github.com/users/PlutoCoders/orgs",
            "repos_url": "https://api.github.com/users/PlutoCoders/repos",
            "events_url": "https://api.github.com/users/PlutoCoders/events{/privacy}",
            "received_events_url": "https://api.github.com/users/PlutoCoders/received_events",
            "type": "User",
            "site_admin": false
        },
        "url": "https://github.com/PlutoCoders/week11noteTakerWOW",
        "topics": [],
        "date": "2023-11-08T23:57:41Z",
        "license": {
            "key": "mit",
            "name": "MIT License",
            "spdx_id": "MIT",
            "url": "https://api.github.com/licenses/mit",
            "node_id": "MDc6TGljZW5zZTEz"
        },
        "updated": "2023-12-16T08:59:17Z",
        "homepage": null,
        "language": "JavaScript",
        "deployment": "https://api.github.com/repos/PlutoCoders/week11noteTakerWOW/deployments",
        "description": "Challenge assignment: Note Taker (Create notes!)"
    },
    {
        "name": "EventCreator",
        "owner": {
            "login": "PlutoCoders",
            "id": 139153742,
            "node_id": "U_kgDOCEtRTg",
            "avatar_url": "https://avatars.githubusercontent.com/u/139153742?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/PlutoCoders",
            "html_url": "https://github.com/PlutoCoders",
            "followers_url": "https://api.github.com/users/PlutoCoders/followers",
            "following_url": "https://api.github.com/users/PlutoCoders/following{/other_user}",
            "gists_url": "https://api.github.com/users/PlutoCoders/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/PlutoCoders/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/PlutoCoders/subscriptions",
            "organizations_url": "https://api.github.com/users/PlutoCoders/orgs",
            "repos_url": "https://api.github.com/users/PlutoCoders/repos",
            "events_url": "https://api.github.com/users/PlutoCoders/events{/privacy}",
            "received_events_url": "https://api.github.com/users/PlutoCoders/received_events",
            "type": "User",
            "site_admin": false
        },
        "url": "https://github.com/PlutoCoders/EventCreator",
        "topics": [],
        "date": "2023-10-26T23:52:23Z",
        "license": {
            "key": "mit",
            "name": "MIT License",
            "spdx_id": "MIT",
            "url": "https://api.github.com/licenses/mit",
            "node_id": "MDc6TGljZW5zZTEz"
        },
        "updated": "2023-10-27T01:24:58Z",
        "homepage": null,
        "language": "JavaScript",
        "deployment": "https://api.github.com/repos/PlutoCoders/EventCreator/deployments",
        "description": "A bootcamp group project for group 1, where a user can create and remove events, that others can see."
    },
    {
        "name": "week9ReadMeGenAmazing",
        "owner": {
            "login": "PlutoCoders",
            "id": 139153742,
            "node_id": "U_kgDOCEtRTg",
            "avatar_url": "https://avatars.githubusercontent.com/u/139153742?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/PlutoCoders",
            "html_url": "https://github.com/PlutoCoders",
            "followers_url": "https://api.github.com/users/PlutoCoders/followers",
            "following_url": "https://api.github.com/users/PlutoCoders/following{/other_user}",
            "gists_url": "https://api.github.com/users/PlutoCoders/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/PlutoCoders/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/PlutoCoders/subscriptions",
            "organizations_url": "https://api.github.com/users/PlutoCoders/orgs",
            "repos_url": "https://api.github.com/users/PlutoCoders/repos",
            "events_url": "https://api.github.com/users/PlutoCoders/events{/privacy}",
            "received_events_url": "https://api.github.com/users/PlutoCoders/received_events",
            "type": "User",
            "site_admin": false
        },
        "url": "https://github.com/PlutoCoders/week9ReadMeGenAmazing",
        "topics": [],
        "date": "2023-10-23T20:42:34Z",
        "license": {
            "key": "mit",
            "name": "MIT License",
            "spdx_id": "MIT",
            "url": "https://api.github.com/licenses/mit",
            "node_id": "MDc6TGljZW5zZTEz"
        },
        "updated": "2023-10-23T21:29:46Z",
        "homepage": null,
        "language": "JavaScript",
        "deployment": "https://api.github.com/repos/PlutoCoders/week9ReadMeGenAmazing/deployments",
        "description": "week9ReadMeGenAmazing"
    },
    {
        "name": "week6WeatherwowWOWapp",
        "owner": {
            "login": "PlutoCoders",
            "id": 139153742,
            "node_id": "U_kgDOCEtRTg",
            "avatar_url": "https://avatars.githubusercontent.com/u/139153742?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/PlutoCoders",
            "html_url": "https://github.com/PlutoCoders",
            "followers_url": "https://api.github.com/users/PlutoCoders/followers",
            "following_url": "https://api.github.com/users/PlutoCoders/following{/other_user}",
            "gists_url": "https://api.github.com/users/PlutoCoders/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/PlutoCoders/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/PlutoCoders/subscriptions",
            "organizations_url": "https://api.github.com/users/PlutoCoders/orgs",
            "repos_url": "https://api.github.com/users/PlutoCoders/repos",
            "events_url": "https://api.github.com/users/PlutoCoders/events{/privacy}",
            "received_events_url": "https://api.github.com/users/PlutoCoders/received_events",
            "type": "User",
            "site_admin": false
        },
        "url": "https://github.com/PlutoCoders/week6WeatherwowWOWapp",
        "topics": [],
        "date": "2023-10-09T21:16:57Z",
        "license": {
            "key": "mit",
            "name": "MIT License",
            "spdx_id": "MIT",
            "url": "https://api.github.com/licenses/mit",
            "node_id": "MDc6TGljZW5zZTEz"
        },
        "updated": "2023-10-25T01:57:55Z",
        "homepage": null,
        "language": "JavaScript",
        "deployment": "https://api.github.com/repos/PlutoCoders/week6WeatherwowWOWapp/deployments",
        "description": "Weather App for week 6 bootcamp assignment"
    },
    {
        "name": "calenderWeek5Wow",
        "owner": {
            "login": "PlutoCoders",
            "id": 139153742,
            "node_id": "U_kgDOCEtRTg",
            "avatar_url": "https://avatars.githubusercontent.com/u/139153742?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/PlutoCoders",
            "html_url": "https://github.com/PlutoCoders",
            "followers_url": "https://api.github.com/users/PlutoCoders/followers",
            "following_url": "https://api.github.com/users/PlutoCoders/following{/other_user}",
            "gists_url": "https://api.github.com/users/PlutoCoders/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/PlutoCoders/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/PlutoCoders/subscriptions",
            "organizations_url": "https://api.github.com/users/PlutoCoders/orgs",
            "repos_url": "https://api.github.com/users/PlutoCoders/repos",
            "events_url": "https://api.github.com/users/PlutoCoders/events{/privacy}",
            "received_events_url": "https://api.github.com/users/PlutoCoders/received_events",
            "type": "User",
            "site_admin": false
        },
        "url": "https://github.com/PlutoCoders/calenderWeek5Wow",
        "topics": [],
        "date": "2023-08-22T18:18:25Z",
        "license": null,
        "updated": "2023-08-22T19:29:22Z",
        "homepage": null,
        "language": "HTML",
        "deployment": "https://api.github.com/repos/PlutoCoders/calenderWeek5Wow/deployments",
        "description": "Assignment for week 5"
    },
    {
        "name": "week4QuizTime",
        "owner": {
            "login": "PlutoCoders",
            "id": 139153742,
            "node_id": "U_kgDOCEtRTg",
            "avatar_url": "https://avatars.githubusercontent.com/u/139153742?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/PlutoCoders",
            "html_url": "https://github.com/PlutoCoders",
            "followers_url": "https://api.github.com/users/PlutoCoders/followers",
            "following_url": "https://api.github.com/users/PlutoCoders/following{/other_user}",
            "gists_url": "https://api.github.com/users/PlutoCoders/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/PlutoCoders/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/PlutoCoders/subscriptions",
            "organizations_url": "https://api.github.com/users/PlutoCoders/orgs",
            "repos_url": "https://api.github.com/users/PlutoCoders/repos",
            "events_url": "https://api.github.com/users/PlutoCoders/events{/privacy}",
            "received_events_url": "https://api.github.com/users/PlutoCoders/received_events",
            "type": "User",
            "site_admin": false
        },
        "url": "https://github.com/PlutoCoders/week4QuizTime",
        "topics": [],
        "date": "2023-08-19T18:24:11Z",
        "license": null,
        "updated": "2023-09-28T01:59:09Z",
        "homepage": "https://plutocoders.github.io/week4QuizTime/",
        "language": "JavaScript",
        "deployment": "https://api.github.com/repos/PlutoCoders/week4QuizTime/deployments",
        "description": "Coding Quiz"
    },
    {
        "name": "passwordGen3",
        "owner": {
            "login": "PlutoCoders",
            "id": 139153742,
            "node_id": "U_kgDOCEtRTg",
            "avatar_url": "https://avatars.githubusercontent.com/u/139153742?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/PlutoCoders",
            "html_url": "https://github.com/PlutoCoders",
            "followers_url": "https://api.github.com/users/PlutoCoders/followers",
            "following_url": "https://api.github.com/users/PlutoCoders/following{/other_user}",
            "gists_url": "https://api.github.com/users/PlutoCoders/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/PlutoCoders/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/PlutoCoders/subscriptions",
            "organizations_url": "https://api.github.com/users/PlutoCoders/orgs",
            "repos_url": "https://api.github.com/users/PlutoCoders/repos",
            "events_url": "https://api.github.com/users/PlutoCoders/events{/privacy}",
            "received_events_url": "https://api.github.com/users/PlutoCoders/received_events",
            "type": "User",
            "site_admin": false
        },
        "url": "https://github.com/PlutoCoders/passwordGen3",
        "topics": [],
        "date": "2023-08-10T23:50:14Z",
        "license": null,
        "updated": "2023-08-11T03:47:05Z",
        "homepage": null,
        "language": "JavaScript",
        "deployment": "https://api.github.com/repos/PlutoCoders/passwordGen3/deployments",
        "description": "Random Password Generator (Week 3 assignment)"
    },
    {
        "name": "assignment2Portfolio",
        "owner": {
            "login": "PlutoCoders",
            "id": 139153742,
            "node_id": "U_kgDOCEtRTg",
            "avatar_url": "https://avatars.githubusercontent.com/u/139153742?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/PlutoCoders",
            "html_url": "https://github.com/PlutoCoders",
            "followers_url": "https://api.github.com/users/PlutoCoders/followers",
            "following_url": "https://api.github.com/users/PlutoCoders/following{/other_user}",
            "gists_url": "https://api.github.com/users/PlutoCoders/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/PlutoCoders/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/PlutoCoders/subscriptions",
            "organizations_url": "https://api.github.com/users/PlutoCoders/orgs",
            "repos_url": "https://api.github.com/users/PlutoCoders/repos",
            "events_url": "https://api.github.com/users/PlutoCoders/events{/privacy}",
            "received_events_url": "https://api.github.com/users/PlutoCoders/received_events",
            "type": "User",
            "site_admin": false
        },
        "url": "https://github.com/PlutoCoders/assignment2Portfolio",
        "topics": [],
        "date": "2023-08-03T22:50:57Z",
        "license": null,
        "updated": "2023-08-04T03:51:35Z",
        "homepage": null,
        "language": "CSS",
        "deployment": "https://api.github.com/repos/PlutoCoders/assignment2Portfolio/deployments",
        "description": null
    },
    {
        "name": "assignment1wow",
        "owner": {
            "login": "PlutoCoders",
            "id": 139153742,
            "node_id": "U_kgDOCEtRTg",
            "avatar_url": "https://avatars.githubusercontent.com/u/139153742?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/PlutoCoders",
            "html_url": "https://github.com/PlutoCoders",
            "followers_url": "https://api.github.com/users/PlutoCoders/followers",
            "following_url": "https://api.github.com/users/PlutoCoders/following{/other_user}",
            "gists_url": "https://api.github.com/users/PlutoCoders/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/PlutoCoders/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/PlutoCoders/subscriptions",
            "organizations_url": "https://api.github.com/users/PlutoCoders/orgs",
            "repos_url": "https://api.github.com/users/PlutoCoders/repos",
            "events_url": "https://api.github.com/users/PlutoCoders/events{/privacy}",
            "received_events_url": "https://api.github.com/users/PlutoCoders/received_events",
            "type": "User",
            "site_admin": false
        },
        "url": "https://github.com/PlutoCoders/assignment1wow",
        "topics": [],
        "date": "2023-07-28T01:48:16Z",
        "license": {
            "key": "mit",
            "name": "MIT License",
            "spdx_id": "MIT",
            "url": "https://api.github.com/licenses/mit",
            "node_id": "MDc6TGljZW5zZTEz"
        },
        "updated": "2023-07-28T02:16:46Z",
        "homepage": null,
        "language": "HTML",
        "deployment": "https://api.github.com/repos/PlutoCoders/assignment1wow/deployments",
        "description": "This is my first assignment!"
    },
    {
        "name": "weepingworkone",
        "owner": {
            "login": "PlutoCoders",
            "id": 139153742,
            "node_id": "U_kgDOCEtRTg",
            "avatar_url": "https://avatars.githubusercontent.com/u/139153742?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/PlutoCoders",
            "html_url": "https://github.com/PlutoCoders",
            "followers_url": "https://api.github.com/users/PlutoCoders/followers",
            "following_url": "https://api.github.com/users/PlutoCoders/following{/other_user}",
            "gists_url": "https://api.github.com/users/PlutoCoders/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/PlutoCoders/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/PlutoCoders/subscriptions",
            "organizations_url": "https://api.github.com/users/PlutoCoders/orgs",
            "repos_url": "https://api.github.com/users/PlutoCoders/repos",
            "events_url": "https://api.github.com/users/PlutoCoders/events{/privacy}",
            "received_events_url": "https://api.github.com/users/PlutoCoders/received_events",
            "type": "User",
            "site_admin": false
        },
        "url": "https://github.com/PlutoCoders/weepingworkone",
        "topics": [],
        "date": "2023-07-24T20:53:10Z",
        "license": null,
        "updated": "2023-07-24T20:53:31Z",
        "homepage": null,
        "language": "HTML",
        "deployment": "https://api.github.com/repos/PlutoCoders/weepingworkone/deployments",
        "description": null
    },
    {
        "name": "campfiles",
        "owner": {
            "login": "PlutoCoders",
            "id": 139153742,
            "node_id": "U_kgDOCEtRTg",
            "avatar_url": "https://avatars.githubusercontent.com/u/139153742?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/PlutoCoders",
            "html_url": "https://github.com/PlutoCoders",
            "followers_url": "https://api.github.com/users/PlutoCoders/followers",
            "following_url": "https://api.github.com/users/PlutoCoders/following{/other_user}",
            "gists_url": "https://api.github.com/users/PlutoCoders/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/PlutoCoders/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/PlutoCoders/subscriptions",
            "organizations_url": "https://api.github.com/users/PlutoCoders/orgs",
            "repos_url": "https://api.github.com/users/PlutoCoders/repos",
            "events_url": "https://api.github.com/users/PlutoCoders/events{/privacy}",
            "received_events_url": "https://api.github.com/users/PlutoCoders/received_events",
            "type": "User",
            "site_admin": false
        },
        "url": "https://github.com/PlutoCoders/campfiles",
        "topics": [],
        "date": "2023-07-20T22:54:40Z",
        "license": null,
        "updated": "2023-07-20T22:54:40Z",
        "homepage": null,
        "language": null,
        "deployment": "https://api.github.com/repos/PlutoCoders/campfiles/deployments",
        "description": "Master File Repository for Coding Bootcamp"
    },
    {
        "name": "prework-study-guide",
        "owner": {
            "login": "PlutoCoders",
            "id": 139153742,
            "node_id": "U_kgDOCEtRTg",
            "avatar_url": "https://avatars.githubusercontent.com/u/139153742?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/PlutoCoders",
            "html_url": "https://github.com/PlutoCoders",
            "followers_url": "https://api.github.com/users/PlutoCoders/followers",
            "following_url": "https://api.github.com/users/PlutoCoders/following{/other_user}",
            "gists_url": "https://api.github.com/users/PlutoCoders/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/PlutoCoders/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/PlutoCoders/subscriptions",
            "organizations_url": "https://api.github.com/users/PlutoCoders/orgs",
            "repos_url": "https://api.github.com/users/PlutoCoders/repos",
            "events_url": "https://api.github.com/users/PlutoCoders/events{/privacy}",
            "received_events_url": "https://api.github.com/users/PlutoCoders/received_events",
            "type": "User",
            "site_admin": false
        },
        "url": "https://github.com/PlutoCoders/prework-study-guide",
        "topics": [],
        "date": "2023-07-12T13:34:05Z",
        "license": {
            "key": "mit",
            "name": "MIT License",
            "spdx_id": "MIT",
            "url": "https://api.github.com/licenses/mit",
            "node_id": "MDc6TGljZW5zZTEz"
        },
        "updated": "2023-07-14T05:10:00Z",
        "homepage": null,
        "language": "HTML",
        "deployment": "https://api.github.com/repos/PlutoCoders/prework-study-guide/deployments",
        "description": "Study Guide for my Coding Course"
    },
    {
        "name": "PlutoCoders",
        "owner": {
            "login": "PlutoCoders",
            "id": 139153742,
            "node_id": "U_kgDOCEtRTg",
            "avatar_url": "https://avatars.githubusercontent.com/u/139153742?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/PlutoCoders",
            "html_url": "https://github.com/PlutoCoders",
            "followers_url": "https://api.github.com/users/PlutoCoders/followers",
            "following_url": "https://api.github.com/users/PlutoCoders/following{/other_user}",
            "gists_url": "https://api.github.com/users/PlutoCoders/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/PlutoCoders/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/PlutoCoders/subscriptions",
            "organizations_url": "https://api.github.com/users/PlutoCoders/orgs",
            "repos_url": "https://api.github.com/users/PlutoCoders/repos",
            "events_url": "https://api.github.com/users/PlutoCoders/events{/privacy}",
            "received_events_url": "https://api.github.com/users/PlutoCoders/received_events",
            "type": "User",
            "site_admin": false
        },
        "url": "https://github.com/PlutoCoders/PlutoCoders",
        "topics": [
            "config",
            "github-config"
        ],
        "date": "2023-07-10T15:57:39Z",
        "license": null,
        "updated": "2023-07-10T15:57:39Z",
        "homepage": "https://github.com/PlutoCoders",
        "language": null,
        "deployment": "https://api.github.com/repos/PlutoCoders/PlutoCoders/deployments",
        "description": "Config files for my GitHub profile."
    }
];

export const customFeaturedProjects = [
    {
        url: `https://eventcreatorproject2-ccc7e1fe4142.herokuapp.com/`,
        name: `EventCreator`,
        description: `Create your own events and view other events`,
        image: `/eventcreator.png`,
        topics: [`javaScript`, `SQL`]
    },
    {
        url: `https://github.com/PlutoCoders/PortfolioHub`,
        name: `Portfolio Hub`,
        description: `A personal portfolio website!`,
        image: `/portfoliohub.png`,
        topics: [`React`,'javaScript'],
    },
    {
        url: `https://brandonerivera.github.io/frontendprobject-1/`,
        name: `Marvel Favorites`,
        description: `Search for posters from marvel comics and movies, add some to your favorites!`,
        image: `/marvelposters.png`,
        topics: [`html`,`css`,`javaScript`,`express`],

    },
];

// Switch out what the variable is equal to.
// As long as it is equal to an array of project objects.
// This will change what we are displaying. (from customProjects or the cachedGitHubProjects).
// Use the spread operator to add all the project objects into the displayed array of projects. Otherwise you will have nested arrays that will break your display.
// Spread operator says: go inside this variable, and give me all the content. If its an array, you get all the array values, if its an object, you get all the key/value pairs
export const projectsUsedAcrossApplication = [...customFeaturedProjects, ...cachedGitHubProjects];