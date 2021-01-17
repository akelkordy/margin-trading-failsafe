# Margin Trading Fail-Safe Accounting Smart Contract
  **Made at SBHacks 2021** | *Ahmed Elkordy, Agilan Ampigaipathar, Alan Chang*

  This smart contract written in Clarity for the Stacks blockchain helps facilitate a margin-trading account
  with built-in checking for available balance above a margin limit before authorizing new spending.

  Key Terms:
  - Margin trading: a practice usually involving opening an account with a lender to gain more spending power for securities
  - Margin: A percentage set on a margin trading account, applied to the initial deposit to determine the balance that
    the account must maintain in order to not be closed by the lender.
  - Margin limit: The monetary balance that must be maintained on the account such that the assets are still in the
    control of the person who opened the account. This is automatically mandated through the use of this smart contract
  
# Functions
## `get-balance`
  Returns the current balance in the trading account.

## `set-margin (margin int)`
  Sets the margin percentage (using a numerator / 100) and 
  margin limit (automatic, based on initial balance and margin) for a trading account.

## `incoming-transaction (amount int) receiver principal`
  Parses information about a transaction involving spending from the account, and
  - authorizes it if the transaction will not set the trading account's balance below the margin limit
  - rejects it if the transaction will reduce the balance below the limit (err-balance-too-low)

## `incoming-deposit (amount int)`
  Gets an incoming deposit amount and adds it to the account balance

## `incoming-withdrawal (amount uint)`
  Gets an incoming withdraw amount and subtracts it from the account balance
