#!/usr/bin/env bash
set -e
npm run lint
npm test
npm run cov
codecov
