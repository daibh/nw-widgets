@ECHO OFF
ECHO RUN API AND PROJECT DEMO.
IF EXIST %cd%/run-api.cmd (
  START run-api.cmd
) ELSE (
  ECHO SOURCE API IS NOT EXISTED.
)
IF EXIST %cd%/run-demo.cmd (
  run-demo.cmd
) ELSE (
  ECHO SOURCE DEMO IS NOT EXISTED.
)
PAUSE
