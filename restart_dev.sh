#!/usr/bin/env bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
"$DIR/stop_dev.sh"
sleep 1
"$DIR/run_dev.sh"
