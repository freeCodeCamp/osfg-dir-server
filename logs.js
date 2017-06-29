 /* eslint-disable */
/*
  EXAMPLE FILE of the GitHub Hook Messages being received
*/

let headers = {
  'x-forwarded-host': 'fcc-directory.glitch.me',
  'x-glitch-routing': '15806f98-4a43-4d3f-8f92-7387dee49390:1085',
  'x-request-id': '3f107ed830bff2b5',
  connection: 'keep-alive',
  'x-forwarded-for':
    '192.30.252.42,::ffff:10.10.10.71,::ffff:127.0.0.1,10.10.10.22,::ffff:172.17.0.1',
  'x-forwarded-proto': 'https,http,http,http,http',
  'x-forwarded-port': '443,80,80,80,80',
  host: 'fcc-directory.glitch.me',
  'x-amzn-trace-id': 'Root=1-5954df00-307252515f3b9a1a790cdd72',
  'content-length': '8971',
  accept: '*/*',
  'user-agent': 'GitHub-Hookshot/18889e1',
  'x-github-event': 'push',
  'x-github-delivery': 'e0962c20-5cba-11e7-8a37-a5dece259230',
  'content-type': 'application/json',
  'x-hub-signature': 'sha1=fafdfd8269044326dbea5020d9a650b6211fa7ce',
};

let body = {
  ref: 'refs/heads/dev-build-automation',
  before: '2fc7052983c932532345f71e5f17582875f8218d',
  after: '492c88880e9ca820be547ec37e8dad0f762a806e',
  created: false,
  deleted: false,
  forced: false,
  base_ref: null,
  compare:
    'https://github.com/freeCodeCamp/open-source-for-good-directory/compare/2fc7052983c9...492c88880e9c',
  commits: [
    {
      id: '492c88880e9ca820be547ec37e8dad0f762a806e',
      tree_id: 'fa78489e211c0f86f4c31b309b4eec959622682e',
      distinct: true,
      message: 'Testing the WebHooks',
      timestamp: '2017-06-29T06:05:35-05:00',
      url:
        'https://github.com/freeCodeCamp/open-source-for-good-directory/commit/492c88880e9ca820be547ec37e8dad0f762a806e',
      author: [Object],
      committer: [Object],
      added: [],
      removed: [],
      modified: [Array],
    },
  ],
  head_commit: {
    id: '492c88880e9ca820be547ec37e8dad0f762a806e',
    tree_id: 'fa78489e211c0f86f4c31b309b4eec959622682e',
    distinct: true,
    message: 'Testing the WebHooks',
    timestamp: '2017-06-29T06:05:35-05:00',
    url:
      'https://github.com/freeCodeCamp/open-source-for-good-directory/commit/492c88880e9ca820be547ec37e8dad0f762a806e',
    author: {
      name: 'Juan D. Acosta',
      email: 'juandacorias@gmail.com',
      username: 'juandaco',
    },
    committer: {
      name: 'GitHub',
      email: 'noreply@github.com',
      username: 'web-flow',
    },
    added: [],
    removed: [],
    modified: ['README.md'],
  },
  repository: {
    id: 83153318,
    name: 'open-source-for-good-directory',
    full_name: 'freeCodeCamp/open-source-for-good-directory',
    owner: {
      name: 'freeCodeCamp',
      email: '',
      login: 'freeCodeCamp',
      id: 9892522,
      avatar_url: 'https://avatars3.githubusercontent.com/u/9892522?v=3',
      gravatar_id: '',
      url: 'https://api.github.com/users/freeCodeCamp',
      html_url: 'https://github.com/freeCodeCamp',
      followers_url: 'https://api.github.com/users/freeCodeCamp/followers',
      following_url:
        'https://api.github.com/users/freeCodeCamp/following{/other_user}',
      gists_url: 'https://api.github.com/users/freeCodeCamp/gists{/gist_id}',
      starred_url:
        'https://api.github.com/users/freeCodeCamp/starred{/owner}{/repo}',
      subscriptions_url:
        'https://api.github.com/users/freeCodeCamp/subscriptions',
      organizations_url: 'https://api.github.com/users/freeCodeCamp/orgs',
      repos_url: 'https://api.github.com/users/freeCodeCamp/repos',
      events_url: 'https://api.github.com/users/freeCodeCamp/events{/privacy}',
      received_events_url:
        'https://api.github.com/users/freeCodeCamp/received_events',
      type: 'Organization',
      site_admin: false,
    },
    private: false,
    html_url: 'https://github.com/freeCodeCamp/open-source-for-good-directory',
    description:
      "A directory for freeCodeCamp's Open Source for Good apps - solutions for nonprofits",
    fork: false,
    url: 'https://github.com/freeCodeCamp/open-source-for-good-directory',
    forks_url:
      'https://api.github.com/repos/freeCodeCamp/open-source-for-good-directory/forks',
    keys_url:
      'https://api.github.com/repos/freeCodeCamp/open-source-for-good-directory/keys{/key_id}',
    collaborators_url:
      'https://api.github.com/repos/freeCodeCamp/open-source-for-good-directory/collaborators{/collaborator}',
    teams_url:
      'https://api.github.com/repos/freeCodeCamp/open-source-for-good-directory/teams',
    hooks_url:
      'https://api.github.com/repos/freeCodeCamp/open-source-for-good-directory/hooks',
    issue_events_url:
      'https://api.github.com/repos/freeCodeCamp/open-source-for-good-directory/issues/events{/number}',
    events_url:
      'https://api.github.com/repos/freeCodeCamp/open-source-for-good-directory/events',
    assignees_url:
      'https://api.github.com/repos/freeCodeCamp/open-source-for-good-directory/assignees{/user}',
    branches_url:
      'https://api.github.com/repos/freeCodeCamp/open-source-for-good-directory/branches{/branch}',
    tags_url:
      'https://api.github.com/repos/freeCodeCamp/open-source-for-good-directory/tags',
    blobs_url:
      'https://api.github.com/repos/freeCodeCamp/open-source-for-good-directory/git/blobs{/sha}',
    git_tags_url:
      'https://api.github.com/repos/freeCodeCamp/open-source-for-good-directory/git/tags{/sha}',
    git_refs_url:
      'https://api.github.com/repos/freeCodeCamp/open-source-for-good-directory/git/refs{/sha}',
    trees_url:
      'https://api.github.com/repos/freeCodeCamp/open-source-for-good-directory/git/trees{/sha}',
    statuses_url:
      'https://api.github.com/repos/freeCodeCamp/open-source-for-good-directory/statuses/{sha}',
    languages_url:
      'https://api.github.com/repos/freeCodeCamp/open-source-for-good-directory/languages',
    stargazers_url:
      'https://api.github.com/repos/freeCodeCamp/open-source-for-good-directory/stargazers',
    contributors_url:
      'https://api.github.com/repos/freeCodeCamp/open-source-for-good-directory/contributors',
    subscribers_url:
      'https://api.github.com/repos/freeCodeCamp/open-source-for-good-directory/subscribers',
    subscription_url:
      'https://api.github.com/repos/freeCodeCamp/open-source-for-good-directory/subscription',
    commits_url:
      'https://api.github.com/repos/freeCodeCamp/open-source-for-good-directory/commits{/sha}',
    git_commits_url:
      'https://api.github.com/repos/freeCodeCamp/open-source-for-good-directory/git/commits{/sha}',
    comments_url:
      'https://api.github.com/repos/freeCodeCamp/open-source-for-good-directory/comments{/number}',
    issue_comment_url:
      'https://api.github.com/repos/freeCodeCamp/open-source-for-good-directory/issues/comments{/number}',
    contents_url:
      'https://api.github.com/repos/freeCodeCamp/open-source-for-good-directory/contents/{+path}',
    compare_url:
      'https://api.github.com/repos/freeCodeCamp/open-source-for-good-directory/compare/{base}...{head}',
    merges_url:
      'https://api.github.com/repos/freeCodeCamp/open-source-for-good-directory/merges',
    archive_url:
      'https://api.github.com/repos/freeCodeCamp/open-source-for-good-directory/{archive_format}{/ref}',
    downloads_url:
      'https://api.github.com/repos/freeCodeCamp/open-source-for-good-directory/downloads',
    issues_url:
      'https://api.github.com/repos/freeCodeCamp/open-source-for-good-directory/issues{/number}',
    pulls_url:
      'https://api.github.com/repos/freeCodeCamp/open-source-for-good-directory/pulls{/number}',
    milestones_url:
      'https://api.github.com/repos/freeCodeCamp/open-source-for-good-directory/milestones{/number}',
    notifications_url:
      'https://api.github.com/repos/freeCodeCamp/open-source-for-good-directory/notifications{?since,all,participating}',
    labels_url:
      'https://api.github.com/repos/freeCodeCamp/open-source-for-good-directory/labels{/name}',
    releases_url:
      'https://api.github.com/repos/freeCodeCamp/open-source-for-good-directory/releases{/id}',
    deployments_url:
      'https://api.github.com/repos/freeCodeCamp/open-source-for-good-directory/deployments',
    created_at: 1488047642,
    updated_at: '2017-06-27T20:58:39Z',
    pushed_at: 1498734335,
    git_url: 'git://github.com/freeCodeCamp/open-source-for-good-directory.git',
    ssh_url: 'git@github.com:freeCodeCamp/open-source-for-good-directory.git',
    clone_url:
      'https://github.com/freeCodeCamp/open-source-for-good-directory.git',
    svn_url: 'https://github.com/freeCodeCamp/open-source-for-good-directory',
    homepage: null,
    size: 922,
    stargazers_count: 12,
    watchers_count: 12,
    language: 'JavaScript',
    has_issues: true,
    has_projects: true,
    has_downloads: true,
    has_wiki: true,
    has_pages: true,
    forks_count: 3,
    mirror_url: null,
    open_issues_count: 1,
    forks: 3,
    open_issues: 1,
    watchers: 12,
    default_branch: 'master',
    stargazers: 12,
    master_branch: 'master',
    organization: 'freeCodeCamp',
  },
  pusher: { name: 'juandaco', email: 'juandacorias@gmail.com' },
  organization: {
    login: 'freeCodeCamp',
    id: 9892522,
    url: 'https://api.github.com/orgs/freeCodeCamp',
    repos_url: 'https://api.github.com/orgs/freeCodeCamp/repos',
    events_url: 'https://api.github.com/orgs/freeCodeCamp/events',
    hooks_url: 'https://api.github.com/orgs/freeCodeCamp/hooks',
    issues_url: 'https://api.github.com/orgs/freeCodeCamp/issues',
    members_url: 'https://api.github.com/orgs/freeCodeCamp/members{/member}',
    public_members_url:
      'https://api.github.com/orgs/freeCodeCamp/public_members{/member}',
    avatar_url: 'https://avatars3.githubusercontent.com/u/9892522?v=3',
    description:
      "We're an open source community of people who learn to code and help nonprofits",
  },
  sender: {
    login: 'juandaco',
    id: 18541570,
    avatar_url: 'https://avatars0.githubusercontent.com/u/18541570?v=3',
    gravatar_id: '',
    url: 'https://api.github.com/users/juandaco',
    html_url: 'https://github.com/juandaco',
    followers_url: 'https://api.github.com/users/juandaco/followers',
    following_url:
      'https://api.github.com/users/juandaco/following{/other_user}',
    gists_url: 'https://api.github.com/users/juandaco/gists{/gist_id}',
    starred_url: 'https://api.github.com/users/juandaco/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/juandaco/subscriptions',
    organizations_url: 'https://api.github.com/users/juandaco/orgs',
    repos_url: 'https://api.github.com/users/juandaco/repos',
    events_url: 'https://api.github.com/users/juandaco/events{/privacy}',
    received_events_url:
      'https://api.github.com/users/juandaco/received_events',
    type: 'User',
    site_admin: false,
  },
};
