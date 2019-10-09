@ECHO OFF
ECHO RUNNING DEMO SOURCE.
IF EXIST %cd%/demo (
  IF EXIST %cd%/package.json (
    CALL npm install
    CALL ng serve demo --open
  ) ELSE (
    ECHO package.json FILE NOT FOUND.
  )
) ELSE (
  ECHO SOURCE DEMO IS NOT EXISTED.
)
PAUSE
