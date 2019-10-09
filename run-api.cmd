@ECHO OFF
ECHO CRAWL NODE MODULE LIBRARY.
IF EXIST %cd%\demoApi (
  CD demoApi
  IF EXIST %cd%\package.json (
    CALL npm install
    CALL npm run debug
  ) ELSE (
    ECHO package.json FILE NOT FOUND.
  )
)
PAUSE
