#!/bin/bash
cd /home/kavia/workspace/code-generation/authflow-dashboard-35790-1a9e595a/authflow_dashboard
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

