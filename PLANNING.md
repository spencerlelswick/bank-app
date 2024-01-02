# Bank app

## Project Summary:

This project is a bank web application for users to securely view and manage their bank accounts for a fictitious bank.

## Links:

[GitHub-Repository](https://github.com/spencerlelswick/bank-app)

[Trello Board](https://trello.com/b/bpiKR3IY/bank-app)

[Wireframe](https://www.figma.com/file/)

## Primary User Model:

| Property      | Datatype |
| ------------- | -------- |
| \_id          | Objectid |
| acctNum       | String   |
| firstName     | String   |
| lastName      | String   |
| avatar        | String   |
| email         | String   |
| address       | String   |


### Secondary Account Model:

| Property    | Datatype        |
| ----------- | --------------- |
| \_id        | Objectid        |
| acctNum     | String          |
| initDate    | Date            |
| status      | Boolean         |
| owner       | Ref: [User]     |
| acctTx      | Ref: [Transactions] |

## Tertiary Transaction Model:

| Property  | Datatype       |
| --------- | -------------- |
| \_id      | Objectid       |
| username  | String         |
| amount    | String         |
| category  | String         |
| status    | Boolean        |
| user      | Ref: User.\_id |

## ERD Diagram

<!-- ![ERD](https://github.com/spencerlelswick/) -->

## Component Tree

<!-- ![componentTree](https://github.com/spencerlelswick/) -->

## User Stories

### As a user

- I want to be able to login
- I want to be able to view my account balance
- I want to be able to see a list of all of my accounts
- I want to be able to see an itemized list of transactions
- I want to be able to transfer money to another account
- I want to be able to deposit money from an account
- I want to be able to withdraw money from an account


## Icebox

### Features

- Open a credit card line
- Spending on credit card adds reward points
- Redeem credit card rewards
