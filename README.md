# JABC HR Solution

This is a working repository for Team OECM's JABC HR Solution. This README will document major components of this solution. If you are a maintainer of this repository, please remember to keep this document up-to-date with important latest changes.

## Contributing

Features are to be developed in branches off of master, and merged into master with the approval of _at least_ one external reviewer. When you have branched off of master, please remember to pull master often to mitigate the risk of merge conflicts. A basic Git workflow for development of the JABC HR solution is as follows

1. Create a feature branch off of master in the format [initials]/[JIRA issue number]. For example, the associated branch name for a developer named "Paul Carter" who is assigned the ticket JA-12 (write unit tests for database facade) would be `pc/JA-12`.
2. Once you have completed the feature to your satisfaction, please make a pull request with the title [Jira Issue number]: [brief description], and tag all team members for review. For example, the pull request title for the branch `pc/JA-12` would be "JA-12: write unit tests for DBFacade".
3. Do _not_ merge branches into master without the approval of at least one other team member.

## Backend
1. At root directory run yarn build to compile typescripts
2. At root directory run yarn start to start the server
3. The server will be listening on port 8080

## Frontend
1. At frontend directory run yarn build to compile react scripts
2. At root directory run yarn start to start client
3. The client will be on port 3000