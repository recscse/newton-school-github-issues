Documentation

Database design -:

Database Name-: githubissues

Tables -:
1. repos -:
    use-:This table is designed for storing the repository name and its author name
    columns-:
        1.repo_name  ---this stores repository name
        2.auth_name  ---this stores author name
2. table created according to the repository name -:
    description-:This table is created after every repository is inserted into repos table according to the repository_name
    use-:This table is to store the information of issues in its respective repository table 
    columns-:
        1.id(primary key)  ---it is auto incremented and it helps in uniquely identifies the issues
        2.title   ---this stores title of the issues
        3.description  ---this stores the description of issues
        4.entry_date   ---this store the date at which issues was created
        5.author_name  ---name of the author who created the issue


Api endpoints-:

1. "/" -:  --get request
    This api is created to check if the server is up and running
2. "/repos/all" -:  --get request
    In this api all repository name and its corresponding author name is fetched from the database and given as output
3. "/repos/find/:repository"-:  --get request
    This api is created for using in search bar so that user can easily search for a particular repository from a pool of repository
    query-:
        1.repository name should be passed in the url instead of ':repository'
    example-:
        if we have to find a repository name which has ul in it then url looks like -:
        "/repos/find/ul"
4. "/repos/post"-: --post request
    This api is used for adding a repository in database.
    After querying-:
        1. checks if same repository present then error if not then proceeds
        2. then store repositoryname and author name in repos table
        3. then create a table with repository name and define its field(id,title,description,entry_date,author_name)
    body-:
        1.repo_name
        2.auth_name 
    example-:
        url-:"/repos/post"
        body-:{
            "repo_name":"car-finder",
            "auth_name":"shubham"
        }
5. "/list-issues/:repo_name"-: --get request
    This api is used to fetch issues related to particular repository name issues will be displayed according to page number. one page has 5 values
    query-:
        1.repository name should be passed in the url instead of ':repository'
        2.And add ?page= in the url
    example-:
        if we have a repository google and want to fetch page number 5
        "/list-issues/google?page=5"
6. "/add-issues/:repo_name"-: --post request
    This api is used to add issues in particular table with specific repository_name
    body-:
        1.title
        2.description
        3.author_name
        4.entry_date
    example-:
        url-:"/add-issues/google"
        body-:{
            "author_name":"shubham",
            "description":"new error",
            "title":"title",
            "entry_date":"2020-08-31"
        }
7. "/issues/delete"-: ---delete request
    This api is used to delete issues with particular id and repository name
    query-:
        1.Add repo_name as parameter in url 
        2.Add id as parameter in url
    example-:
        url-:"/issues/delete?repo_name=google&id=12"
8. "/update-issues"-: ---put request
    This api is used for updating issues with particular id and repository name
    query-:
        1.Add repo_name as parameter in url 
        2.Add id as parameter in url
    body-:
        1.title
        2.description
        3.author_name
        4.entry_date
    example-:
        url-:"/update-issues?repo_name=google&id=12"
        body-:{
            "author_name":"shubham",
            "description":"new error",
            "title":"title",
            "entry_date":"2020-08-31"
        }
